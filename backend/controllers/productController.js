import pool from "../config/db.js";

export const getFilterOptions = async (req, res) => {
  try {
    // Get categories
    const [categories] = await pool.query(
      "SELECT id, name, slug FROM categories ORDER BY name"
    );

    // Get brands
    const [brands] = await pool.query(
      "SELECT id, name, slug FROM brands ORDER BY name"
    );

    // Get available sizes
    const [sizes] = await pool.query(
      "SELECT DISTINCT size FROM product_variants WHERE size IS NOT NULL ORDER BY size"
    );

    // Get available colors
    const [colors] = await pool.query(
      "SELECT DISTINCT color FROM product_variants WHERE color IS NOT NULL ORDER BY color"
    );

    // Get tags
    const [tags] = await pool.query(
      "SELECT id, name, slug FROM tags ORDER BY name"
    );

    res.status(200).json({
      categories,
      brands,
      sizes: sizes.map(s => s.size),
      colors: colors.map(c => c.color),
      tags
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    size,
    color,
    inStock,
    page = 1,
    limit = 12,
    sort = "new",
    search,
    status = "active"
  } = req.query;

  let where = "WHERE p.status = ? ";
  let params = [status];

  // Search filter
  if (search) {
    where += "AND (p.name LIKE ? OR p.description LIKE ?) ";
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category) {
    where += "AND c.slug = ? ";
    params.push(category);
  }

  if (brand) {
    where += "AND b.slug = ? ";
    params.push(brand);
  }

  if (minPrice && maxPrice) {
    where += "AND p.price BETWEEN ? AND ? ";
    params.push(minPrice, maxPrice);
  } else if (minPrice) {
    where += "AND p.price >= ? ";
    params.push(minPrice);
  } else if (maxPrice) {
    where += "AND p.price <= ? ";
    params.push(maxPrice);
  }

  if (size) {
    where += "AND v.size = ? ";
    params.push(size);
  }

  if (color) {
    where += "AND v.color = ? ";
    params.push(color);
  }

  if (inStock === 'true') {
    where += "AND v.stock > 0 ";
  }

  let orderBy = "p.created_at DESC";

  if (sort === "low_price") {
    orderBy = "p.price ASC";
  } else if (sort === "high_price") {
    orderBy = "p.price DESC";
  } else if (sort === "name") {
    orderBy = "p.name ASC";
  }

  try {
    const [products] = await pool.query(
      `SELECT DISTINCT p.*, c.name as category_name, b.name as brand_name
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN brands b ON p.brand_id = b.id
       LEFT JOIN product_variants v ON p.id = v.product_id
       ${where}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)]
    );

    // Get images for each product
    for (let product of products) {
      const [images] = await pool.query(
        "SELECT image_url, is_primary FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC",
        [product.id]
      );
      product.images = images;
      product.primaryImage = images.find(img => img.is_primary) || images[0] || null;
    }

    // Get total count for pagination
    const [countResult] = await pool.query(
      `SELECT COUNT(DISTINCT p.id) as total
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN brands b ON p.brand_id = b.id
       LEFT JOIN product_variants v ON p.id = v.product_id
       ${where}`,
      params
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({ 
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts: total,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const addProduct = async (req, res) => {
  // Debug: Log what we're receiving
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  // Clean up the data - remove extra quotes and spaces from keys
  const cleanBody = {};
  for (let [key, value] of Object.entries(req.body)) {
    const cleanKey = key.trim();
    const cleanValue =
      typeof value === "string" && value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)
        : value;
    cleanBody[cleanKey] = cleanValue;
  }

  const {
    name,
    description,
    category_id,
    brand_id,
    price,
    status,
    variants,
    tags,
  } = cleanBody;

  // Check if required fields are present
  if (!name) {
    return res.status(400).json({ error: "Product name is required" });
  }

  // Process uploaded images
  const images =
    req.files?.map((file, index) => ({
      url: file.path.replace(/\\/g, "/"),
      is_primary: index === 0 ? 1 : 0,
    })) || [];

  // Parse JSON strings if they exist
  const parsedVariants = variants ? JSON.parse(variants) : [];
  const parsedTags = tags ? JSON.parse(tags) : [];

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      "INSERT INTO products (name, description, category_id, brand_id, price, status) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, category_id, brand_id, price, status || "active"]
    );

    const productId = result.insertId;

    // 2. Images
    for (let img of images) {
      await conn.query(
        `INSERT INTO product_images (product_id, image_url, is_primary)
         VALUES (?, ?, ?)`,
        [productId, img.url, img.is_primary]
      );
    }

    // 3. Variants
    for (let v of parsedVariants) {
      await conn.query(
        `INSERT INTO product_variants (product_id, size, color, stock)
         VALUES (?, ?, ?, ?)`,
        [productId, v.size, v.color, v.stock]
      );
    }

    // 4. Tags
    for (let tagId of parsedTags) {
      await conn.query(
        `INSERT INTO product_tags (product_id, tag_id)
         VALUES (?, ?)`,
        [productId, tagId]
      );
    }

    await conn.commit();

    res.status(201).json({ message: "Product added successfully", productId });
  } catch (error) {
    await conn.rollback();
    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  
  // Clean up the data
  const cleanBody = {};
  for (let [key, value] of Object.entries(req.body)) {
    const cleanKey = key.trim();
    const cleanValue =
      typeof value === "string" && value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)
        : value;
    cleanBody[cleanKey] = cleanValue;
  }

  const {
    name,
    description,
    category_id,
    brand_id,
    price,
    status,
    variants,
    tags,
  } = cleanBody;

  // Check required fields
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  // Validate status
  if (status && !['active', 'inactive'].includes(status)) {
    return res.status(400).json({ error: "Status must be 'active' or 'inactive'" });
  }

  // Process uploaded images
  const images =
    req.files?.map((file, index) => ({
      url: file.path.replace(/\\/g, "/"),
      is_primary: index === 0 ? 1 : 0,
    })) || [];

  const parsedVariants = variants ? JSON.parse(variants) : [];
  const parsedTags = tags ? JSON.parse(tags) : [];

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Check if product exists
    const [existing] = await conn.query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update product
    await conn.query(
      "UPDATE products SET name = ?, description = ?, category_id = ?, brand_id = ?, price = ?, status = ? WHERE id = ?",
      [name, description, category_id, brand_id, price, status || "active", id]
    );

    // Update images if new ones provided
    if (images.length > 0) {
      await conn.query("DELETE FROM product_images WHERE product_id = ?", [id]);
      for (let img of images) {
        await conn.query(
          "INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)",
          [id, img.url, img.is_primary]
        );
      }
    }

    // Update variants
    if (parsedVariants.length > 0) {
      await conn.query("DELETE FROM product_variants WHERE product_id = ?", [id]);
      for (let v of parsedVariants) {
        await conn.query(
          "INSERT INTO product_variants (product_id, size, color, stock) VALUES (?, ?, ?, ?)",
          [id, v.size, v.color, v.stock]
        );
      }
    }

    // Update tags
    if (parsedTags.length > 0) {
      await conn.query("DELETE FROM product_tags WHERE product_id = ?", [id]);
      for (let tagId of parsedTags) {
        await conn.query(
          "INSERT INTO product_tags (product_id, tag_id) VALUES (?, ?)",
          [id, tagId]
        );
      }
    }

    await conn.commit();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    await conn.rollback();
    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Check if product exists
    const [existing] = await conn.query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete related data (foreign key constraints will handle this automatically with CASCADE)
    await conn.query("DELETE FROM products WHERE id = ?", [id]);

    await conn.commit();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    await conn.rollback();
    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get product with category and brand info
    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug,
              b.name as brand_name, b.slug as brand_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN brands b ON p.brand_id = b.id
       WHERE p.id = ?`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = products[0];

    // Get product images
    const [images] = await pool.query(
      "SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC",
      [id]
    );

    // Get product variants
    const [variants] = await pool.query(
      "SELECT * FROM product_variants WHERE product_id = ?",
      [id]
    );

    // Get product tags
    const [tags] = await pool.query(
      `SELECT t.* FROM tags t
       JOIN product_tags pt ON t.id = pt.tag_id
       WHERE pt.product_id = ?`,
      [id]
    );

    res.status(200).json({
      ...product,
      images,
      variants,
      tags
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
