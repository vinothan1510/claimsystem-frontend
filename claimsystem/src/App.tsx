import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ AUTH PAGES

import Login from "./pages/auth/Login";

// ✅ DASHBOARDS



// ✅ PROTECTED ROUTE
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./pages/users/Dashboard";
import Register from "./pages/auth/register";
import ClaimOfficerDashboard from "./pages/officer/claimOfficerDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/" element={<Login />} />

        {/* USER DASHBOARD */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* CLAIM OFFICER DASHBOARD */}
        <Route
          path="/officer/claims"
          element={
            <ProtectedRoute allowedRoles={["CLAIM_OFFICER"]}>
              <ClaimOfficerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;