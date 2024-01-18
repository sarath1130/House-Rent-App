import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Sign from "./pages/Sign";
import SignUp from "./pages/SignUp";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import ForgotPassword1 from "./pages/ForgotPassword1";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ForgotPassword1" element={<ForgotPassword1 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
