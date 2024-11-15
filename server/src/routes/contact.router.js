import { Router } from "express";
import {
  getAllContacts,
  registerContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = Router();

// Define routes for contacts
router
  .route("/contacts")
  .get(getAllContacts) // Retrieve all contacts
  .post(registerContact); // Add a new contact

router
  .route("/contacts/:id")
  .put(updateContact) // Update a specific contact
  .delete(deleteContact); // Delete a specific contact

export default router;
