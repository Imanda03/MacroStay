import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "./Register.css";
// import { register } from "../../Context/Api";

const Register = () => {
  const navigate = useNavigate();
  // console.log(isTeacher);
  const [userData, setUserData] = React.useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: null,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevValue) => {
      return {
        ...prevValue,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleClick = async () => {
    const response = await axios.post(
      "http://localhost:8081/api/auth/register",
      userData
    );
    if (response.data.status === 200) {
      message.success("Register Success");
      navigate("/login");
    } else {
      message.error("Check your deatils");
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
          marginTop={10}
          padding={5}
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
          <Typography variant="h2" padding={2} textAlign="center">
            Register
          </Typography>
          <TextField
            name="username"
            margin="normal"
            type="text"
            variant="standard"
            label="Full Name"
            onChange={(e) => handleChange(e)}
            value={userData.name}
          />
          <TextField
            name="email"
            margin="normal"
            type="email"
            variant="standard"
            label="Email"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="country"
            margin="normal"
            type="text"
            variant="standard"
            label="Country"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="city"
            margin="normal"
            type="text"
            variant="standard"
            label="City"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="phone"
            margin="normal"
            type="number"
            variant="standard"
            label="Phone Number"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="password"
            margin="normal"
            type="password"
            variant="standard"
            label="Password"
            onChange={(e) => handleChange(e)}
          />
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            onClick={handleClick}
          >
            Register
          </Button>
          <Link to="/login">
            <Button sx={{ marginTop: 3, borderRadius: 3 }}>
              Move to Login
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Register;
