// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/Welcome";
import ForgotPassword from "./components/ForgotPassword";
import AccountTypeSelection from "./Pages/Account";
import NearbyProperties from "./Pages/NearbyProperties";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ResetPassword from "./components/ResetPassword";
import Contact from "./Pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/near" element={<NearbyProperties />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<AccountTypeSelection />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;