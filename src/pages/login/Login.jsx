import { useState, useContext } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        payload: res.data,
      });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
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
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
