import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sign from "./pages/Sign";
import SignUp from "./pages/SignUp";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword1";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<Sign />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Forgot" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
