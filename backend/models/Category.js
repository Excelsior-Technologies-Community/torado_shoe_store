import pool from "../config/db.js";

class Category {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description;
    this.parent_id = data.parent_id;
    this.image_url = data.image_url;
    this.is_active = data.is_active;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(categoryData) {
    const { name, slug, description, parent_id, image_url, is_active = 1 } = categoryData;
    
    const [result] = await pool.query(
      "INSERT INTO categories (name, slug, description, parent_id, image_url, is_active) VALUES (?, ?, ?, ?, ?, ?)",
      [name, slug, description, parent_id, image_url, is_active]
    );
    
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [categories] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
    return categories.length ? new Category(categories[0]) : null;
  }

  static async findBySlug(slug) {
    const [categories] = await pool.query("SELECT * FROM categories WHERE slug = ?", [slug]);
    return categories.length ? new Category(categories[0]) : null;
  }

  static async findAll(activeOnly = true) {
    const where = activeOnly ? "WHERE is_active = 1" : "";
    const [categories] = await pool.query(
      `SELECT * FROM categories ${where} ORDER BY name ASC`
    );
    return categories.map(c => new Category(c));
  }

  static async getHierarchy() {
    const [categories] = await pool.query(
      "SELECT * FROM categories WHERE is_active = 1 ORDER BY parent_id, name"
    );
    
    const categoryMap = {};
    const rootCategories = [];

    // Create category objects and map
    categories.forEach(cat => {
      const category = new Category(cat);
      category.children = [];
      categoryMap[cat.id] = category;
    });

    // Build hierarchy
    categories.forEach(cat => {
      if (cat.parent_id) {
        if (categoryMap[cat.parent_id]) {
          categoryMap[cat.parent_id].children.push(categoryMap[cat.id]);
        }
      } else {
        rootCategories.push(categoryMap[cat.id]);
      }
    });

    return rootCategories;
  }

  async getChildren() {
    const [children] = await pool.query(
      "SELECT * FROM categories WHERE parent_id = ? AND is_active = 1 ORDER BY name",
      [this.id]
    );
    return children.map(c => new Category(c));
  }

  async getParent() {
    if (!this.parent_id) return null;
    return Category.findById(this.parent_id);
  }

  async getProducts(filters = {}) {
    const Product = (await import('./Product.js')).default;
    return Product.findAll({ ...filters, category: this.slug });
  }

  async update(updateData) {
    const { name, slug, description, parent_id, image_url, is_active } = updateData;
    
    await pool.query(
      "UPDATE categories SET name = ?, slug = ?, description = ?, parent_id = ?, image_url = ?, is_active = ? WHERE id = ?",
      [name, slug, description, parent_id, image_url, is_active, this.id]
    );
    
    return this.constructor.findById(this.id);
  }

  async delete() {
    // Check if category has children
    const children = await this.getChildren();
    if (children.length > 0) {
      throw new Error("Cannot delete category with subcategories");
    }

    // Check if category has products
    const [products] = await pool.query(
      "SELECT COUNT(*) as count FROM products WHERE category_id = ?",
      [this.id]
    );
    
    if (products[0].count > 0) {
      throw new Error("Cannot delete category with products");
    }

    await pool.query("DELETE FROM categories WHERE id = ?", [this.id]);
  }
}

export default Category;