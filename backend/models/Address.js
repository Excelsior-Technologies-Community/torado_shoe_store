import pool from "../config/db.js";

class Address {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.type = data.type;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.company = data.company;
    this.address_line_1 = data.address_line_1;
    this.address_line_2 = data.address_line_2;
    this.city = data.city;
    this.state = data.state;
    this.postal_code = data.postal_code;
    this.country = data.country;
    this.phone = data.phone;
    this.is_default = data.is_default;
    this.created_at = data.created_at;
  }

  static async create(addressData) {
    const {
      user_id, type, first_name, last_name, company,
      address_line_1, address_line_2, city, state,
      postal_code, country, phone, is_default = 0
    } = addressData;

    // If this is set as default, unset other defaults
    if (is_default) {
      await pool.query(
        "UPDATE addresses SET is_default = 0 WHERE user_id = ? AND type = ?",
        [user_id, type]
      );
    }

    const [result] = await pool.query(
      `INSERT INTO addresses (user_id, type, first_name, last_name, company,
       address_line_1, address_line_2, city, state, postal_code, country, phone, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, type, first_name, last_name, company, address_line_1, 
       address_line_2, city, state, postal_code, country, phone, is_default]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [addresses] = await pool.query("SELECT * FROM addresses WHERE id = ?", [id]);
    return addresses.length ? new Address(addresses[0]) : null;
  }

  static async findByUser(userId, type = null) {
    let where = "WHERE user_id = ?";
    let params = [userId];

    if (type) {
      where += " AND type = ?";
      params.push(type);
    }

    const [addresses] = await pool.query(
      `SELECT * FROM addresses ${where} ORDER BY is_default DESC, created_at DESC`,
      params
    );
    return addresses.map(a => new Address(a));
  }

  async setAsDefault() {
    // Unset other defaults for this user and type
    await pool.query(
      "UPDATE addresses SET is_default = 0 WHERE user_id = ? AND type = ?",
      [this.user_id, this.type]
    );

    // Set this as default
    await pool.query("UPDATE addresses SET is_default = 1 WHERE id = ?", [this.id]);
    this.is_default = 1;
  }

  getFullName() {
    return `${this.first_name} ${this.last_name}`.trim();
  }

  getFormattedAddress() {
    const parts = [
      this.address_line_1,
      this.address_line_2,
      `${this.city}, ${this.state} ${this.postal_code}`,
      this.country
    ].filter(Boolean);
    
    return parts.join('\n');
  }
}

export default Address;