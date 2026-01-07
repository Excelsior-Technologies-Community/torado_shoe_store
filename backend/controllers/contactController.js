import { sendMail } from "../config/mailer.js";
import pool from "../config/db.js";

export const sendContactMail = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Save to database first
    await pool.query(
      "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone, message]
    );

    // Try to send email (optional)
    try {
      await sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: `Contact form submission from ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (emailError) {
      console.log("Email sending failed:", emailError.message);
    }

    res.status(200).json({ message: "Contact message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save contact message" });
  }
};
