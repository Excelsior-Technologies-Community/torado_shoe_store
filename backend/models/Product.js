import pool from "../config/db.js";

class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.category_id = data.category_id;
    this.brand_id = data.brand_id;
    this.price = data.price;
    this.status = data.status || 'active';
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(productData) {
    const { name, description, category_id, brand_id, price, status = 'active' } = productData;
    
    const [result] = await pool.query(
      "INSERT INTO products (name, description, category_id, brand_id, price, status) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, category_id, brand_id, price, status]
    );
    
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug,
              b.name as brand_name, b.slug as brand_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN brands b ON p.brand_id = b.id
       WHERE p.id = ?`,
      [id]
    );
    
    if (!products.length) return null;
    
    const product = new Product(products[0]);
    product.category_name = products[0].category_name;
    product.brand_name = products[0].brand_name;
    
    return product;
  }

  static async findAll(filters = {}) {
    let where = "WHERE p.status = ? ";
    let params = [filters.status || 'active'];

    if (filters.search) {
      where += "AND (p.name LIKE ? OR p.description LIKE ?) ";
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.category) {
      where += "AND c.slug = ? ";
      params.push(filters.category);
    }

    if (filters.brand) {
      where += "AND b.slug = ? ";
      params.push(filters.brand);
    }

    if (filters.minPrice && filters.maxPrice) {
      where += "AND p.price BETWEEN ? AND ? ";
      params.push(filters.minPrice, filters.maxPrice);
    }

    const orderBy = this.getOrderBy(filters.sort);
    const limit = parseInt(filters.limit) || 12;
    const offset = (parseInt(filters.page) - 1) * limit || 0;

    const [products] = await pool.query(
      `SELECT DISTINCT p.*, c.name as category_name, b.name as brand_name
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN brands b ON p.brand_id = b.id
       LEFT JOIN product_variants v ON p.id = v.product_id
       ${where}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return products.map(p => new Product(p));
  }

  static getOrderBy(sort) {
    switch (sort) {
      case "low_price": return "p.price ASC";
      case "high_price": return "p.price DESC";
      case "name": return "p.name ASC";
      default: return "p.created_at DESC";
    }
  }

  async getImages() {
    const [images] = await pool.query(
      "SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC",
      [this.id]
    );
    return images;
  }

  async getVariants() {
    const [variants] = await pool.query(
      "SELECT * FROM product_variants WHERE product_id = ?",
      [this.id]
    );
    return variants;
  }

  async getTags() {
    const [tags] = await pool.query(
      `SELECT t.* FROM tags t
       JOIN product_tags pt ON t.id = pt.tag_id
       WHERE pt.product_id = ?`,
      [this.id]
    );
    return tags;
  }

  async addImages(images) {
    for (let img of images) {
      await pool.query(
        "INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)",
        [this.id, img.url, img.is_primary]
      );
    }
  }

  async addVariants(variants) {
    for (let variant of variants) {
      await pool.query(
        "INSERT INTO product_variants (product_id, size, color, stock) VALUES (?, ?, ?, ?)",
        [this.id, variant.size, variant.color, variant.stock]
      );
    }
  }

  async update(updateData) {
    const { name, description, category_id, brand_id, price, status } = updateData;
    
    await pool.query(
      "UPDATE products SET name = ?, description = ?, category_id = ?, brand_id = ?, price = ?, status = ? WHERE id = ?",
      [name, description, category_id, brand_id, price, status, this.id]
    );
    
    return this.constructor.findById(this.id);
  }

  async delete() {
    await pool.query("DELETE FROM products WHERE id = ?", [this.id]);
  }
}

export default Product;