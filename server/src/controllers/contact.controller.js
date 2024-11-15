import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Contact } from "../models/contact.modal.js";

// Create a new contact
const registerContact = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;

  // Check for missing fields
  if (!firstName || !lastName || !email || !phoneNumber) {
    throw new ApiError(400, "Missing required fields");
  }

  // Check if the email already exists
  const existingContact = await Contact.findOne({ email });
  if (existingContact) {
    throw new ApiError(409, "Email already exists");
  }

  // Create and save the new contact
  const contact = await Contact.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    company,
    jobTitle,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Contact registered successfully", contact));
});

// Get all contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find(); // Fetch all contacts
  res
    .status(200)
    .json(new ApiResponse(200, "Contacts fetched successfully", contacts));
});

// Update a specific contact
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Find and update the contact
  const updatedContact = await Contact.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!updatedContact) {
    throw new ApiError(404, "Contact not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Contact updated successfully", updatedContact));
});

// Delete a specific contact
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find and delete the contact
  const deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {
    throw new ApiError(404, "Contact not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Contact deleted successfully", deletedContact));
});

export { registerContact, getAllContacts, updateContact, deleteContact };
