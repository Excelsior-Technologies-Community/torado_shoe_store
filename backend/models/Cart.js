import pool from "../config/db.js";

class Cart {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async findOrCreateByUserId(userId) {
    // Try to find existing cart
    const [carts] = await pool.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    
    if (carts.length > 0) {
      return new Cart(carts[0]);
    }

    // Create new cart if none exists
    const [result] = await pool.query(
      "INSERT INTO carts (user_id) VALUES (?)",
      [userId]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [carts] = await pool.query("SELECT * FROM carts WHERE id = ?", [id]);
    return carts.length ? new Cart(carts[0]) : null;
  }

  async getItems() {
    const [items] = await pool.query(
      `SELECT ci.*, p.name as product_name, p.price as product_price,
              pv.size, pv.color, pv.stock,
              pi.image_url
       FROM cart_items ci
       JOIN product_variants pv ON ci.variant_id = pv.id
       JOIN products p ON pv.product_id = p.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
       WHERE ci.cart_id = ?`,
      [this.id]
    );
    return items;
  }

  async addItem(variantId, quantity = 1) {
    // Check if item already exists in cart
    const [existing] = await pool.query(
      "SELECT * FROM cart_items WHERE cart_id = ? AND variant_id = ?",
      [this.id, variantId]
    );

    if (existing.length > 0) {
      // Update quantity if item exists
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + ?, updated_at = NOW() WHERE cart_id = ? AND variant_id = ?",
        [quantity, this.id, variantId]
      );
    } else {
      // Add new item
      await pool.query(
        "INSERT INTO cart_items (cart_id, variant_id, quantity) VALUES (?, ?, ?)",
        [this.id, variantId, quantity]
      );
    }

    return this.getItems();
  }

  async updateItemQuantity(variantId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(variantId);
    }

    await pool.query(
      "UPDATE cart_items SET quantity = ?, updated_at = NOW() WHERE cart_id = ? AND variant_id = ?",
      [quantity, this.id, variantId]
    );

    return this.getItems();
  }

  async removeItem(variantId) {
    await pool.query(
      "DELETE FROM cart_items WHERE cart_id = ? AND variant_id = ?",
      [this.id, variantId]
    );

    return this.getItems();
  }

  async clear() {
    await pool.query("DELETE FROM cart_items WHERE cart_id = ?", [this.id]);
  }

  async getItemCount() {
    const [result] = await pool.query(
      "SELECT SUM(quantity) as total FROM cart_items WHERE cart_id = ?",
      [this.id]
    );
    return result[0].total || 0;
  }

  async getTotal() {
    const [result] = await pool.query(
      `SELECT SUM(ci.quantity * p.price) as total
       FROM cart_items ci
       JOIN product_variants pv ON ci.variant_id = pv.id
       JOIN products p ON pv.product_id = p.id
       WHERE ci.cart_id = ?`,
      [this.id]
    );
    return parseFloat(result[0].total) || 0;
  }

  async validateStock() {
    const items = await this.getItems();
    const outOfStock = [];

    for (let item of items) {
      if (item.quantity > item.stock) {
        outOfStock.push({
          variant_id: item.variant_id,
          product_name: item.product_name,
          size: item.size,
          color: item.color,
          requested: item.quantity,
          available: item.stock
        });
      }
    }

    return outOfStock;
  }

  async convertToOrder(orderData) {
    const items = await this.getItems();
    
    if (items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Validate stock
    const outOfStock = await this.validateStock();
    if (outOfStock.length > 0) {
      throw new Error("Some items are out of stock");
    }

    const Order = (await import('./Order.js')).default;
    
    // Calculate total
    const total = await this.getTotal();
    
    // Create order
    const order = await Order.create({
      ...orderData,
      user_id: this.user_id,
      order_number: await Order.generateOrderNumber(),
      total_amount: total
    });

    // Add order items
    const orderItems = items.map(item => ({
      variant_id: item.variant_id,
      quantity: item.quantity,
      price: item.product_price
    }));

    await order.addItems(orderItems);

    // Update stock
    for (let item of items) {
      await pool.query(
        "UPDATE product_variants SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.variant_id]
      );
    }

    // Clear cart
    await this.clear();

    return order;
  }
}

export default Cart;