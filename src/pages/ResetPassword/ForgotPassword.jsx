import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const handleClick = async () => {
    try {
      console.log(email);
      const res = await axios.post(
        "http://localhost:8081/api/auth/forgot-password",
        { email: email }
      );
      message.success("Check Your Mail");
    } catch (error) {
      message.error("User Not Found!");
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
          Forgot Password
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
            variant="filled"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Send Mail
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
