import pool from "../config/db.js";

class Blog {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.slug = data.slug;
    this.content = data.content;
    this.excerpt = data.excerpt;
    this.author_id = data.author_id;
    this.featured_image = data.featured_image;
    this.status = data.status || 'draft';
    this.published_at = data.published_at;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(blogData) {
    const {
      title,
      slug,
      content,
      excerpt,
      author_id,
      featured_image,
      status = 'draft'
    } = blogData;

    const published_at = status === 'published' ? new Date() : null;

    const [result] = await pool.query(
      `INSERT INTO blogs (title, slug, content, excerpt, author_id, featured_image, status, published_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, content, excerpt, author_id, featured_image, status, published_at]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [blogs] = await pool.query(
      `SELECT b.*, u.name as author_name
       FROM blogs b
       LEFT JOIN users u ON b.author_id = u.id
       WHERE b.id = ?`,
      [id]
    );
    
    if (!blogs.length) return null;
    
    const blog = new Blog(blogs[0]);
    blog.author_name = blogs[0].author_name;
    return blog;
  }

  static async findBySlug(slug) {
    const [blogs] = await pool.query(
      `SELECT b.*, u.name as author_name
       FROM blogs b
       LEFT JOIN users u ON b.author_id = u.id
       WHERE b.slug = ?`,
      [slug]
    );
    
    if (!blogs.length) return null;
    
    const blog = new Blog(blogs[0]);
    blog.author_name = blogs[0].author_name;
    return blog;
  }

  static async findAll(filters = {}) {
    let where = "WHERE 1=1 ";
    let params = [];

    if (filters.status) {
      where += "AND b.status = ? ";
      params.push(filters.status);
    }

    if (filters.author_id) {
      where += "AND b.author_id = ? ";
      params.push(filters.author_id);
    }

    if (filters.search) {
      where += "AND (b.title LIKE ? OR b.content LIKE ?) ";
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    const orderBy = filters.sort === 'title' ? 'b.title ASC' : 'b.created_at DESC';
    const limit = parseInt(filters.limit) || 10;
    const offset = (parseInt(filters.page) - 1) * limit || 0;

    const [blogs] = await pool.query(
      `SELECT b.*, u.name as author_name
       FROM blogs b
       LEFT JOIN users u ON b.author_id = u.id
       ${where}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return blogs.map(b => {
      const blog = new Blog(b);
      blog.author_name = b.author_name;
      return blog;
    });
  }

  static async getPublished(filters = {}) {
    return this.findAll({ ...filters, status: 'published' });
  }

  async getImages() {
    const [images] = await pool.query(
      "SELECT * FROM blog_images WHERE blog_id = ? ORDER BY sort_order ASC",
      [this.id]
    );
    return images;
  }

  async getComments(approved = true) {
    let where = "WHERE blog_id = ?";
    let params = [this.id];

    if (approved) {
      where += " AND is_approved = 1";
    }

    const [comments] = await pool.query(
      `SELECT * FROM blog_comments ${where} ORDER BY created_at DESC`,
      params
    );
    return comments;
  }

  async addImages(images) {
    for (let img of images) {
      await pool.query(
        "INSERT INTO blog_images (blog_id, image_url, caption, sort_order) VALUES (?, ?, ?, ?)",
        [this.id, img.url, img.caption, img.sort_order || 0]
      );
    }
  }

  async publish() {
    await pool.query(
      "UPDATE blogs SET status = 'published', published_at = NOW() WHERE id = ?",
      [this.id]
    );
    this.status = 'published';
    this.published_at = new Date();
  }

  async unpublish() {
    await pool.query(
      "UPDATE blogs SET status = 'draft', published_at = NULL WHERE id = ?",
      [this.id]
    );
    this.status = 'draft';
    this.published_at = null;
  }

  async update(updateData) {
    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      status
    } = updateData;

    const published_at = status === 'published' && this.status !== 'published' ? new Date() : this.published_at;

    await pool.query(
      `UPDATE blogs SET title = ?, slug = ?, content = ?, excerpt = ?, 
       featured_image = ?, status = ?, published_at = ? WHERE id = ?`,
      [title, slug, content, excerpt, featured_image, status, published_at, this.id]
    );

    return this.constructor.findById(this.id);
  }

  async delete() {
    await pool.query("DELETE FROM blogs WHERE id = ?", [this.id]);
  }

  static getValidStatuses() {
    return ['draft', 'published', 'archived'];
  }
}

export default Blog;