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
  const { page = 1, limit = 5 } = req.query;
  const pageNumber = parseInt(page, 10);
  const pageLimit = parseInt(limit, 10);

  if (pageNumber < 1 || pageLimit < 1) {
    throw new ApiError(400, "Page and limit must be positive integers");
  }

  const contacts = await Contact.find()
    .skip((pageNumber - 1) * pageLimit)
    .limit(pageLimit);
  const totalContacts = await Contact.countDocuments();

  res.status(200).json(
    new ApiResponse(200, "Contacts retrieved successfully", {
      contacts,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalContacts / pageLimit),
      totalContacts,
    })
  );
});

// Update a specific contact
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

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

  const deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {
    throw new ApiError(404, "Contact not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Contact deleted successfully", deletedContact));
});

export { registerContact, getAllContacts, updateContact, deleteContact };
