import { useState, useContext } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Login = () => {
  const [credentials, setCardentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    try {
      const res = await axios.post(
        "http://localhost:8081/api/auth/login",
        credentials
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.details,
      });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  // const forgetPassword = async (e) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8081/api/auth/forgot-password",
  //       credentials
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="navHome">
      <h4 style={{ marginLeft: "20px", marginTop: "20PX", cursor: "pointer" }}>
        <Link to={"/"}>Back to homePage</Link>
      </h4>
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} className="lButton" onClick={handleClick}>
            Login
          </button>
          <div className="manageFor">
            <Button variant="text" className="">
              <Link to="/forgot-password">Forgot Password?</Link>
            </Button>
            <Button
              disabled={loading}
              className="lButton"
              onClick={handleRegister}
              variant="text"
            >
              Create Account
            </Button>
          </div>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
