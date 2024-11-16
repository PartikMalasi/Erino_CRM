import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  TableSortLabel,
  TableFooter,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, Save, Delete, Add } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

// Define the contact validation schema with Zod
const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "Max length is 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Max length is 50 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number can't exceed 15 characters")
    .regex(/^\d+$/, "Phone number must contain only digits"), // Regex to allow only numeric characters

  company: z
    .string()
    .min(1, "Company is required")
    .max(100, "Max length is 100 characters"),
  jobTitle: z
    .string()
    .min(1, "Job title is required")
    .max(100, "Max length is 100 characters"),
});

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [editingId, setEditingId] = useState(null);
  const [editContact, setEditContact] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/contacts/?page=${
          currentPage + 1
        }&limit=${rowsPerPage}`
      );
      setContacts(res.data.data.contacts);
      setTotalPages(res.data.data.totalPages);
      handleSort(orderBy); // Sort after fetching the contacts
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, rowsPerPage]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setContacts((prevContacts) =>
      [...prevContacts].sort((a, b) => {
        if (
          property === "firstName" ||
          property === "lastName" ||
          property === "company" ||
          property === "jobTitle"
        ) {
          return order === "asc"
            ? a[property].localeCompare(b[property])
            : b[property].localeCompare(a[property]);
        } else if (property === "email" || property === "phoneNumber") {
          return order === "asc"
            ? a[property].localeCompare(b[property])
            : b[property].localeCompare(a[property]);
        }
        return 0;
      })
    );
  };

  const handleEdit = (id, contact) => {
    setEditingId(id);
    setEditContact(contact);
  };

  const handleSave = async (id) => {
    try {
      // Validate edited contact using Zod
      contactSchema.parse(editContact);
      await axios.put(
        `http://localhost:8000/api/v1/contacts/${id}`,
        editContact
      );
      setEditingId(null);
      fetchContacts();
      handleSort("firstName");
      toast.success("Contact updated successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show Zod validation errors
        error.errors.forEach((e) => toast.error(e.message));
      } else {
        console.log(error);

        toast.error(error.response.data.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/contacts/${id}`);
      fetchContacts();
      handleSort("firstName");
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditContact({ ...editContact, [name]: value });
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  // Handle new contact modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Handle new contact form changes
  const handleNewContactChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Add new contact to the database
  const handleAddContact = async () => {
    try {
      // Validate new contact using Zod
      contactSchema.parse(newContact);
      await axios.post("http://localhost:8000/api/v1/contacts", newContact);
      setNewContact({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: "",
        jobTitle: "",
      });
      handleCloseModal();
      fetchContacts(); // Fetch contacts after adding the new one
      toast.success("Contact added successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show Zod validation errors
        error.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error("Failed to add contact.");
      }
    }
  };

  return (
    <div className="p-4 pt-2 flex flex-col justify-center items-center min-h-screen bg-[#F6F6F9]">
      <div className="mb-4">
        <img
          src="https://erino.io/wp-content/uploads/2024/07/Final-Logo.svg"
          alt="logo"
          className="w-32 h-auto"
        />
      </div>
      <div className="flex justify-center items-center w-[90%] flex-col gap-[20px]">
        <h1 className="text-3xl font-semibold mt-4">Contacts List</h1>
        <div className="w-full overflow-x-auto border border-gray-300 rounded-lg shadow-md">
          <TableContainer component={Paper}>
            <Table className="table-auto w-full text-sm text-left border-collapse">
              <TableHead className="bg-gray-100 border-b">
                <TableRow>
                  {[
                    { label: "First Name", key: "firstName" },
                    { label: "Last Name", key: "lastName" },
                    { label: "Email", key: "email" },
                    { label: "Phone Number", key: "phoneNumber" },
                    { label: "Company", key: "company" },
                    { label: "Job Title", key: "jobTitle" },
                  ].map((col) => (
                    <TableCell key={col.key}>
                      <TableSortLabel
                        active={orderBy === col.key}
                        direction={orderBy === col.key ? order : "asc"}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact._id} className="border-b">
                    <TableCell>
                      {editingId === contact._id ? (
                        <TextField
                          name="firstName"
                          value={editContact.firstName || ""}
                          onChange={handleInputChange}
                          size="small"
                          className="w-full"
                        />
                      ) : (
                        contact.firstName
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === contact._id ? (
                        <TextField
                          name="lastName"
                          value={editContact.lastName || ""}
                          onChange={handleInputChange}
                          size="small"
                          className="w-full"
                        />
                      ) : (
                        contact.lastName
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === contact._id ? (
                        <TextField
                          name="email"
                          value={editContact.email || ""}
                          onChange={handleInputChange}
                          size="small"
                          className="w-full"
                        />
                      ) : (
                        contact.email
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === contact._id ? (
                        <TextField
                          name="phoneNumber"
                          value={editContact.phoneNumber || ""}
                          onChange={handleInputChange}
                          size="small"
                          className="w-full"
                        />
                      ) : (
                        contact.phoneNumber
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === contact._id ? (
                        <TextField
                          name="company"
                          value={editContact.company || ""}
                          onChange={handleInputChange}
                          size="small"
                          className="w-full"
                        />
                      ) : (
                        contact.company
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === contact._id ? (
                        <TextField
                          name="jobTitle"
                          value={editContact.jobTitle || ""}
                          onChange={handleInputChange}
                          size="small"
                          className="w-full"
                        />
                      ) : (
                        contact.jobTitle
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === contact._id ? (
                        <IconButton onClick={() => handleSave(contact._id)}>
                          <Save />
                        </IconButton>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => handleEdit(contact._id, contact)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(contact._id)}>
                            <Delete />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={totalPages * rowsPerPage}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogContent>
            <TextField
              label="First Name"
              name="firstName"
              value={newContact.firstName}
              onChange={handleNewContactChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={newContact.lastName}
              onChange={handleNewContactChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={newContact.email}
              onChange={handleNewContactChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={newContact.phoneNumber}
              onChange={handleNewContactChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Company"
              name="company"
              value={newContact.company}
              onChange={handleNewContactChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Job Title"
              name="jobTitle"
              value={newContact.jobTitle}
              onChange={handleNewContactChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleAddContact}>Save</Button>
          </DialogActions>
        </Dialog>

        <Button
          className="mt-[100px]"
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
        >
          Add New Contact
        </Button>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Home;
