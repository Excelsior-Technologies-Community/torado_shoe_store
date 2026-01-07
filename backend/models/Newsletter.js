import pool from "../config/db.js";

class Newsletter {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.is_active = data.is_active;
    this.subscribed_at = data.subscribed_at;
    this.unsubscribed_at = data.unsubscribed_at;
  }

  static async subscribe(email) {
    const [result] = await pool.query(
      "INSERT INTO newsletters (email) VALUES (?) ON DUPLICATE KEY UPDATE is_active = 1, unsubscribed_at = NULL",
      [email]
    );
    return this.findByEmail(email);
  }

  static async findByEmail(email) {
    const [newsletters] = await pool.query("SELECT * FROM newsletters WHERE email = ?", [email]);
    return newsletters.length ? new Newsletter(newsletters[0]) : null;
  }

  static async getActive() {
    const [newsletters] = await pool.query("SELECT * FROM newsletters WHERE is_active = 1");
    return newsletters.map(n => new Newsletter(n));
  }

  async unsubscribe() {
    await pool.query(
      "UPDATE newsletters SET is_active = 0, unsubscribed_at = NOW() WHERE id = ?",
      [this.id]
    );
    this.is_active = 0;
  }
}

export default Newsletter;