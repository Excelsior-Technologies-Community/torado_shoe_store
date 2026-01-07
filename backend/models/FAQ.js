import pool from "../config/db.js";

class FAQ {
  constructor(data) {
    this.id = data.id;
    this.category_id = data.category_id;
    this.question = data.question;
    this.answer = data.answer;
    this.is_active = data.is_active;
    this.sort_order = data.sort_order;
    this.created_at = data.created_at;
  }

  static async create(faqData) {
    const { category_id, question, answer, is_active = 1, sort_order = 0 } = faqData;
    
    const [result] = await pool.query(
      "INSERT INTO faqs (category_id, question, answer, is_active, sort_order) VALUES (?, ?, ?, ?, ?)",
      [category_id, question, answer, is_active, sort_order]
    );
    
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [faqs] = await pool.query(
      `SELECT f.*, fc.name as category_name 
       FROM faqs f 
       LEFT JOIN faq_categories fc ON f.category_id = fc.id 
       WHERE f.id = ?`,
      [id]
    );
    return faqs.length ? new FAQ(faqs[0]) : null;
  }

  static async findByCategory(categoryId, activeOnly = true) {
    const where = activeOnly ? "AND f.is_active = 1" : "";
    const [faqs] = await pool.query(
      `SELECT f.*, fc.name as category_name 
       FROM faqs f 
       LEFT JOIN faq_categories fc ON f.category_id = fc.id 
       WHERE f.category_id = ? ${where}
       ORDER BY f.sort_order ASC, f.created_at ASC`,
      [categoryId]
    );
    return faqs.map(f => new FAQ(f));
  }

  static async findAll(activeOnly = true) {
    const where = activeOnly ? "WHERE f.is_active = 1" : "";
    const [faqs] = await pool.query(
      `SELECT f.*, fc.name as category_name 
       FROM faqs f 
       LEFT JOIN faq_categories fc ON f.category_id = fc.id 
       ${where}
       ORDER BY fc.sort_order ASC, f.sort_order ASC`,
      []
    );
    return faqs.map(f => new FAQ(f));
  }
}

export default FAQ;