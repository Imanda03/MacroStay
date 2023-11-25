import React, { useState } from "react";
import { Box, Container, Input } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const handleClick = async (e) => {
    const res = await axios
      .post("http://localhost:8081/api/auth/forgot-password", email)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Box>
        <input
          type="text"
          lable="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <button onClick={handleClick}>Send</button>
    </Container>
  );
};

export default ForgotPassword;
