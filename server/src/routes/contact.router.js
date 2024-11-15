import { Router } from "express";
import { registerContact } from "../controllers/contact.controller.js";

const router = Router();

router.route("/register").get(registerContact);

export default router;
