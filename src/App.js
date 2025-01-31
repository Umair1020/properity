// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AccountTypeSelection from "./Pages/Account";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccountTypeSelection />} />

        
      </Routes>
    </Router>
  );
}

export default App;