import { useContext, useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none " }}>
          <span className="logo">MacroStay</span>
        </Link>
        {user ? (
          <div>
            {" "}
            {user.username}
            <button
              onClick={handleLogout}
              style={{ marginLeft: "20px", cursor: "pointer" }}
            >
              Logout
            </button>{" "}
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">
              <Link
                to="/register"
                style={{ color: "inherit", textDecoration: "none " }}
              >
                Register
              </Link>
            </button>

            <button className="navButton">
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none " }}
              >
                Login
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
