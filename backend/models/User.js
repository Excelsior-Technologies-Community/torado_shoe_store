import pool from "../config/db.js";
import bcrypt from "bcryptjs";

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || 'customer';
    this.phone = data.phone;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(userData) {
    const { name, email, password, phone, role = 'customer' } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, role]
    );
    
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return users.length ? new User(users[0]) : null;
  }

  static async findByEmail(email) {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return users.length ? new User(users[0]) : null;
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async getAddresses() {
    const [addresses] = await pool.query(
      "SELECT * FROM addresses WHERE user_id = ?", 
      [this.id]
    );
    return addresses;
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

export default User;