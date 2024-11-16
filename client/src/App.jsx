import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/investor" element={<Investor />} /> */}
          {/* <Route path="/farmer" element={<Farmers />} /> */}
          {/* <Route path="/indian" element={<Indian />} /> */}
          {/* <Route path="/imported" element={<Imported />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/aboutus" element={<AboutUs />} /> */}
          {/* <Route path="/terms" element={<TermsAndConditions />} /> */}
          {/* Catch-all route for 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
