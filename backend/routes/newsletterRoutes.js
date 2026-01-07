import express from "express";
import { subscribeNewsLetter } from "../controllers/newsController.js";

const router = express.Router();

router.post("/subscribe", subscribeNewsLetter);

export default router;
