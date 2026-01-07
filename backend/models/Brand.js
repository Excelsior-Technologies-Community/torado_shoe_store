import pool from "../config/db.js";

class Brand {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description;
    this.logo_url = data.logo_url;
    this.is_active = data.is_active;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(brandData) {
    const { name, slug, description, logo_url, is_active = 1 } = brandData;
    
    const [result] = await pool.query(
      "INSERT INTO brands (name, slug, description, logo_url, is_active) VALUES (?, ?, ?, ?, ?)",
      [name, slug, description, logo_url, is_active]
    );
    
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [brands] = await pool.query("SELECT * FROM brands WHERE id = ?", [id]);
    return brands.length ? new Brand(brands[0]) : null;
  }

  static async findBySlug(slug) {
    const [brands] = await pool.query("SELECT * FROM brands WHERE slug = ?", [slug]);
    return brands.length ? new Brand(brands[0]) : null;
  }

  static async findAll(activeOnly = true) {
    const where = activeOnly ? "WHERE is_active = 1" : "";
    const [brands] = await pool.query(
      `SELECT * FROM brands ${where} ORDER BY name ASC`
    );
    return brands.map(b => new Brand(b));
  }

  async getProducts(filters = {}) {
    const Product = (await import('./Product.js')).default;
    return Product.findAll({ ...filters, brand: this.slug });
  }

  async getProductCount() {
    const [result] = await pool.query(
      "SELECT COUNT(*) as count FROM products WHERE brand_id = ? AND status = 'active'",
      [this.id]
    );
    return result[0].count;
  }

  async update(updateData) {
    const { name, slug, description, logo_url, is_active } = updateData;
    
    await pool.query(
      "UPDATE brands SET name = ?, slug = ?, description = ?, logo_url = ?, is_active = ? WHERE id = ?",
      [name, slug, description, logo_url, is_active, this.id]
    );
    
    return this.constructor.findById(this.id);
  }

  async delete() {
    // Check if brand has products
    const [products] = await pool.query(
      "SELECT COUNT(*) as count FROM products WHERE brand_id = ?",
      [this.id]
    );
    
    if (products[0].count > 0) {
      throw new Error("Cannot delete brand with products");
    }

    await pool.query("DELETE FROM brands WHERE id = ?", [this.id]);
  }
}

export default Brand;