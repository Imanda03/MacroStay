import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "./register.css";
// import { register } from "../../Context/Api";

const Register = () => {
  const navigate = useNavigate();
  // console.log(isTeacher);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [pToggle, setpToggle] = useState(false);

  const isAdmin = true;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };
  const handleHideAndShow = () => {
    setpToggle(!pToggle);
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
    }
    return "";
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ ...errors, email: emailError, password: passwordError });
    if (emailError === "" && passwordError === "") {
      const response = await axios.post(
        "http://localhost:8081/api/auth/register",
        { username, email, country, city, phone, password, isAdmin }
      );
      if (response.data.status === 200) {
        message.success("Register Success");
        navigate("/login");
      }
      // console.log(username, email, country, city, phone, password);
    } else {
      alert("Please enter correct details");
    }
  };
  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={500}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={2}
          padding={2}
          borderRadius={5}
          backgroundColor="#f5f3f0"
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
              backgroundColor: "#edd8d8",
            },
          }}
        >
          <Typography variant="h2" padding={1} textAlign="center">
            Register
          </Typography>
          <TextField
            name="username"
            margin="normal"
            type="text"
            variant="standard"
            label="Full Name"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            helperText={
              username.length > 5 ? "" : "Name should be greater than 5"
            }
          />
          <TextField
            name="email"
            margin="normal"
            type="email"
            variant="standard"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={validateEmail(email)}
          />
          <TextField
            name="country"
            margin="normal"
            type="text"
            variant="standard"
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            helperText={country.length > 4 ? "" : "Enter valid country"}
          />
          <TextField
            name="city"
            margin="normal"
            type="text"
            variant="standard"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            helperText={city.length > 4 ? "" : "Enter valid country"}
          />
          <TextField
            name="phone"
            margin="normal"
            type="number"
            variant="standard"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            name="password"
            margin="normal"
            type={pToggle ? "text" : "password"}
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleHideAndShow}
                  sx={{ cursor: "pointer" }}
                >
                  {!pToggle ? (
                    <VisibilityIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              color: "red",
              padding: " 0 60px",
            }}
          >
            <small color="red">{validatePassword(password)}</small>
          </Box>
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            // onClick={handleClick}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <br />
          <small>Already have an Accout?</small>
          <Button>Login</Button>
        </Box>
      </form>
    </div>
  );
};

export default Register;
