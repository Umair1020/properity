// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VerifyEmail from "./Pages/VerifyEmail";
import HomePage from "./Pages/Home";
import AccountTypeSelection from "./Pages/Account";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccountTypeSelection />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/home" element={<HomePage />} />
        
      </Routes>
    </Router>
  );
}

export default App;