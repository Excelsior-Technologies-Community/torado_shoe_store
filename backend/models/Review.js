import pool from "../config/db.js";

class Review {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.product_id = data.product_id;
    this.rating = data.rating;
    this.comment = data.comment;
    this.is_approved = data.is_approved;
    this.created_at = data.created_at;
  }

  static async create(reviewData) {
    const { user_id, product_id, rating, comment } = reviewData;
    
    const [result] = await pool.query(
      "INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)",
      [user_id, product_id, rating, comment]
    );
    
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [reviews] = await pool.query(
      `SELECT r.*, u.name as user_name 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.id = ?`,
      [id]
    );
    return reviews.length ? new Review(reviews[0]) : null;
  }

  static async findByProduct(productId, approvedOnly = true) {
    const where = approvedOnly ? "AND r.is_approved = 1" : "";
    const [reviews] = await pool.query(
      `SELECT r.*, u.name as user_name 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.product_id = ? ${where}
       ORDER BY r.created_at DESC`,
      [productId]
    );
    return reviews.map(r => new Review(r));
  }

  async approve() {
    await pool.query("UPDATE reviews SET is_approved = 1 WHERE id = ?", [this.id]);
    this.is_approved = 1;
  }
}

export default Review;