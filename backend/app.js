import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import contactroute from "./routes/contactroute.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", contactroute);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/testimonials", testimonialRoutes);

export default app;
