import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Brand always visible */}
      <Link className="navbar-brand fw-bold" to="/">
        Insurance Portal
      </Link>

      {/* Show menu ONLY after login */}
      {token && (
        <>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto">
              {role === "USER" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/policies">
                      Policies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/myclaims">
                      My Claims
                    </Link>
                  </li>
                </>
              )}

              {role === "CLAIM_OFFICER" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/officer/claims">
                    Claims Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/* Logout button */}
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;