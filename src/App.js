import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/Welcome";
import ForgotPassword from "./components/ForgotPassword";
import AccountTypeSelection from "./Pages/Account";
import NearbyProperties from "./Pages/NearbyProperties";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ResetPassword from "./components/ResetPassword";
import PurchaseCredits from "./Pages/PurchaseCredits";
import PurchaseConfirmation from "./Pages/PurchaseConfirmation";
import AccountPage from "./Pages/AccountPage";
import Contact from "./Pages/Contact";
import PrivateRoute from "./components/PrivateRoute"; // Import Private Route

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<AccountTypeSelection />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Contact />} />

        {/* 🔒 Protected Routes */}
        <Route path="/near" element={<PrivateRoute element={<NearbyProperties />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/buy-credits" element={<PrivateRoute element={<PurchaseCredits />} />} />
        <Route path="/purchase-confirmation" element={<PrivateRoute element={<PurchaseConfirmation />} />} />
        <Route path="/account-details" element={<PrivateRoute element={<AccountPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
