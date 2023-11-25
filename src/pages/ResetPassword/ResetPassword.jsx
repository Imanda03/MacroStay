import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const userId = useParams();
  const [password, setPassword] = useState();
  const handleClick = async (e) => {
    try {
      console.log(userId.id);
      const res = await axios.post(
        `http://localhost:8081/api/auth/reset-password/${userId.id}`,
        { password: password }
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <h4 style={{ marginLeft: "20px", marginTop: "20PX", cursor: "pointer" }}>
        <Link to={"/"}>Back to homePage</Link>
      </h4>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "93vh",
        }}
      >
        <Typography component="h1" variant="h5">
          Change your Password
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            mt: 5,
            width: "90%",
            height: "20vh",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextField
            label="Your new password"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
