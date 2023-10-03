import { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("/userProfile");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { user } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(false);
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none " }}>
          <span className="logo">MacroStay</span>
        </Link>
        {user ? (
          <div className="manageDiv">
            <div>
              <Button
                variant="contained"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                fullWidth
                sx={{ color: "#ffffff" }}
              >
                {user.username.slice(0, user.username.indexOf(" "))}
              </Button>
              <Menu
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
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
