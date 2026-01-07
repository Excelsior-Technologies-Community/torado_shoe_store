import pool from "../config/db.js";

class Order {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.order_number = data.order_number;
    this.status = data.status || 'pending';
    this.total_amount = data.total_amount;
    this.shipping_address_id = data.shipping_address_id;
    this.billing_address_id = data.billing_address_id;
    this.payment_status = data.payment_status || 'pending';
    this.payment_method = data.payment_method;
    this.notes = data.notes;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(orderData) {
    const {
      user_id,
      order_number,
      total_amount,
      shipping_address_id,
      billing_address_id,
      payment_method,
      notes
    } = orderData;

    const [result] = await pool.query(
      `INSERT INTO orders (user_id, order_number, total_amount, shipping_address_id, 
       billing_address_id, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, order_number, total_amount, shipping_address_id, billing_address_id, payment_method, notes]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [orders] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    return orders.length ? new Order(orders[0]) : null;
  }

  static async findByOrderNumber(orderNumber) {
    const [orders] = await pool.query("SELECT * FROM orders WHERE order_number = ?", [orderNumber]);
    return orders.length ? new Order(orders[0]) : null;
  }

  static async findByUserId(userId, filters = {}) {
    let where = "WHERE user_id = ?";
    let params = [userId];

    if (filters.status) {
      where += " AND status = ?";
      params.push(filters.status);
    }

    const limit = parseInt(filters.limit) || 10;
    const offset = (parseInt(filters.page) - 1) * limit || 0;

    const [orders] = await pool.query(
      `SELECT * FROM orders ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return orders.map(o => new Order(o));
  }

  static async generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  }

  async getItems() {
    const [items] = await pool.query(
      `SELECT oi.*, p.name as product_name, pv.size, pv.color
       FROM order_items oi
       JOIN product_variants pv ON oi.variant_id = pv.id
       JOIN products p ON pv.product_id = p.id
       WHERE oi.order_id = ?`,
      [this.id]
    );
    return items;
  }

  async addItems(items) {
    for (let item of items) {
      await pool.query(
        "INSERT INTO order_items (order_id, variant_id, quantity, price) VALUES (?, ?, ?, ?)",
        [this.id, item.variant_id, item.quantity, item.price]
      );
    }
  }

  async getUser() {
    const User = (await import('./User.js')).default;
    return User.findById(this.user_id);
  }

  async getShippingAddress() {
    const [addresses] = await pool.query(
      "SELECT * FROM addresses WHERE id = ?",
      [this.shipping_address_id]
    );
    return addresses.length ? addresses[0] : null;
  }

  async getBillingAddress() {
    const [addresses] = await pool.query(
      "SELECT * FROM addresses WHERE id = ?",
      [this.billing_address_id]
    );
    return addresses.length ? addresses[0] : null;
  }

  async getPayments() {
    const [payments] = await pool.query(
      "SELECT * FROM payments WHERE order_id = ? ORDER BY created_at DESC",
      [this.id]
    );
    return payments;
  }

  async updateStatus(status) {
    await pool.query(
      "UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?",
      [status, this.id]
    );
    this.status = status;
  }

  async updatePaymentStatus(paymentStatus) {
    await pool.query(
      "UPDATE orders SET payment_status = ?, updated_at = NOW() WHERE id = ?",
      [paymentStatus, this.id]
    );
    this.payment_status = paymentStatus;
  }

  static getValidStatuses() {
    return ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
  }

  static getValidPaymentStatuses() {
    return ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'];
  }

  async calculateTotal() {
    const items = await this.getItems();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  toJSON() {
    return {
      ...this,
      total_amount: parseFloat(this.total_amount)
    };
  }
}

export default Order;