import { sendMail } from "../config/mailer";
import pool from "../config/db.js";

export const sendnewsletter = async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT email FROM newsletter_subscribers`
    );

    await Promise.all(
      users.map(user =>
        sendMail({
          to: user.email,
          subject: "Latest Updates",
          html: "<p>Go visit Our Website</p>",
        })
      )
    );

    res.status(200).json({ message: "Newsletter sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send newsletter" });
  }
};
