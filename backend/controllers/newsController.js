import pool from "../config/db.js";

import { sendMail } from "../config/mailer.js";

export const subscribeNewsLetter = async (req, res) => {
  const { email } = req.body;

  try {
    await pool.query("INSERT INTO newsletter_subscribers (email) VALUES (?)", [
      email,
    ]);

    // Try to send email (optional)
    try {
      await sendMail({
        to: email,
        subject: "Newsletter Subscription",
        html: `<h3>Thanks for subscribing!</h3><p>You'll hear from us soon.</p>`,
      });
    } catch (emailError) {
      console.log("Email sending failed:", emailError.message);
    }

    res.status(201).json({
      message: "Newsletter subscription successful",
    });
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already subscribed" });
    }
    res.status(500).json({ message: "Subscription failed" });
  }
};

