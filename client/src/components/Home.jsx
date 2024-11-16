import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Checkbox,
  TableFooter,
  IconButton,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const fetchContacts = async (page, limit) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/contacts/?page=${page}&limit=${limit}`
      );
      setContacts(res.data.data.contacts);
      setCurrentPage(Number(res.data.data.currentPage));
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (orderBy === "firstName") {
      return order === "asc"
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    } else if (orderBy === "lastName") {
      return order === "asc"
        ? a.lastName.localeCompare(b.lastName)
        : b.lastName.localeCompare(a.lastName);
    } else if (orderBy === "email") {
      return order === "asc"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (orderBy === "phoneNumber") {
      return order === "asc"
        ? a.phoneNumber.localeCompare(b.phoneNumber)
        : b.phoneNumber.localeCompare(a.phoneNumber);
    }
    return 0;
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = contacts.map((contact) => contact._id);
      setSelectedContacts(newSelecteds);
      return;
    }
    setSelectedContacts([]);
  };

  const handleSelectClick = (event, id) => {
    const selectedIndex = selectedContacts.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedContacts, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedContacts.slice(1));
    } else if (selectedIndex === selectedContacts.length - 1) {
      newSelected = newSelected.concat(selectedContacts.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selectedContacts.slice(0, selectedIndex),
        selectedContacts.slice(selectedIndex + 1)
      );
    }
    setSelectedContacts(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 pt-2 flex flex-col justify-center items-center min-h-screen gap-10">
      <div className="mb-4">
        <img
          src="https://erino.io/wp-content/uploads/2024/07/Final-Logo.svg"
          alt="logo"
          className="w-32 h-auto"
        />
      </div>
      <div className=" flex justify-center items-center w-[80%] flex-col">
        <h1 className="text-3xl font-semibold mb-4">Contacts</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedContacts.length > 0 &&
                      selectedContacts.length < contacts.length
                    }
                    checked={selectedContacts.length === contacts.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "firstName"}
                    direction={orderBy === "firstName" ? order : "asc"}
                    onClick={() => handleRequestSort("firstName")}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "lastName"}
                    direction={orderBy === "lastName" ? order : "asc"}
                    onClick={() => handleRequestSort("lastName")}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderBy === "email" ? order : "asc"}
                    onClick={() => handleRequestSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "phoneNumber"}
                    direction={orderBy === "phoneNumber" ? order : "asc"}
                    onClick={() => handleRequestSort("phoneNumber")}
                  >
                    Phone Number
                  </TableSortLabel>
                </TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedContacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedContacts.indexOf(contact._id) !== -1}
                      onClick={(event) => handleSelectClick(event, contact._id)}
                    />
                  </TableCell>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={7}
                  count={contacts.length}
                  rowsPerPage={rowsPerPage}
                  page={currentPage - 1}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPageOptions={[5, 10, 25]} // Added 5 rows per page option
                  ActionsComponent={(props) => (
                    <div className="ml-4 flex justify-end items-center w-auto">
                      <div className="flex items-center">
                        <span className="w-28">Rows per page</span>
                      </div>
                      <div className="flex">
                        <IconButton
                          onClick={() => handlePageChange(props, 0)}
                          disabled={currentPage === 1}
                        >
                          <FirstPage />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handlePageChange(props, currentPage - 2)
                          }
                          disabled={currentPage === 1}
                        >
                          <KeyboardArrowLeft />
                        </IconButton>
                        <IconButton
                          onClick={() => handlePageChange(props, currentPage)}
                          disabled={currentPage === totalPages}
                        >
                          <KeyboardArrowRight />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handlePageChange(props, totalPages - 1)
                          }
                          disabled={currentPage === totalPages}
                        >
                          <LastPage />
                        </IconButton>
                      </div>
                    </div>
                  )}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
