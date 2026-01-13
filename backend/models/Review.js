import pool from "../config/db.js";

class Review {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.product_id = data.product_id;
    this.rating = data.rating;
    this.comment = data.comment;
    this.status = data.status;
    this.created_at = data.created_at;
  }

  static async create(reviewData) {
    const { user_id, product_id, rating, comment } = reviewData;
    
    const [result] = await pool.query(
      "INSERT INTO reviews (user_id, product_id, rating, comment, status) VALUES (?, ?, ?, ?, 'pending')",
      [user_id, product_id, rating, comment]
    );
    
    return this.findById(result.insertId);
  }

  static async findAll(filters = {}) {
    let query = `SELECT r.*, u.name as user_name, p.name as product_name 
                 FROM reviews r 
                 JOIN users u ON r.user_id = u.id 
                 JOIN products p ON r.product_id = p.id`;
    let params = [];
    let conditions = [];

    if (filters.status) {
      conditions.push("r.status = ?");
      params.push(filters.status);
    }
    if (filters.product_id) {
      conditions.push("r.product_id = ?");
      params.push(filters.product_id);
    }
    if (filters.user_id) {
      conditions.push("r.user_id = ?");
      params.push(filters.user_id);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY r.created_at DESC";

    const [reviews] = await pool.query(query, params);
    return reviews.map(r => new Review(r));
  }

  static async findById(id) {
    const [reviews] = await pool.query(
      `SELECT r.*, u.name as user_name, p.name as product_name 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       JOIN products p ON r.product_id = p.id 
       WHERE r.id = ?`,
      [id]
    );
    return reviews.length ? new Review(reviews[0]) : null;
  }

  static async findByProduct(productId, status = null) {
    let query = `SELECT r.*, u.name as user_name 
                 FROM reviews r 
                 JOIN users u ON r.user_id = u.id 
                 WHERE r.product_id = ?`;
    let params = [productId];

    if (status) {
      query += " AND r.status = ?";
      params.push(status);
    }

    query += " ORDER BY r.created_at DESC";

    const [reviews] = await pool.query(query, params);
    return reviews.map(r => new Review(r));
  }

  static async update(id, updateData) {
    const fields = [];
    const values = [];

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updateData[key]);
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    await pool.query(
      `UPDATE reviews SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM reviews WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  async updateStatus(status) {
    await pool.query("UPDATE reviews SET status = ? WHERE id = ?", [status, this.id]);
    this.status = status;
  }
}

export default Review;