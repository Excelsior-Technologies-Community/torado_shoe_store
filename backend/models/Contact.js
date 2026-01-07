import pool from "../config/db.js";

class Contact {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.subject = data.subject;
    this.message = data.message;
    this.is_read = data.is_read;
    this.created_at = data.created_at;
  }

  static async create(contactData) {
    const { name, email, subject, message } = contactData;
    
    const [result] = await pool.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message]
    );
    
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [contacts] = await pool.query("SELECT * FROM contact_messages WHERE id = ?", [id]);
    return contacts.length ? new Contact(contacts[0]) : null;
  }

  static async findAll(filters = {}) {
    let where = "WHERE 1=1 ";
    let params = [];

    if (filters.is_read !== undefined) {
      where += "AND is_read = ? ";
      params.push(filters.is_read);
    }

    const [contacts] = await pool.query(
      `SELECT * FROM contact_messages ${where} ORDER BY created_at DESC`,
      params
    );
    return contacts.map(c => new Contact(c));
  }

  async markAsRead() {
    await pool.query("UPDATE contact_messages SET is_read = 1 WHERE id = ?", [this.id]);
    this.is_read = 1;
  }
}

export default Contact;