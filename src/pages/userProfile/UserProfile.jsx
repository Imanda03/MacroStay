import React, { useEffect, useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import "./UserProfile.css";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import UserReserve from "./UserReserve";

const UserProfile = (props) => {
  const { user } = useContext(AuthContext);
  const id = user._id;
  const { data, loading, error } = useFetch(
    `http://localhost:8081/api/users/${id}`
  );
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    username: data?.username,
    phone: data?.phone,
    email: data?.email,
    country: data?.country,
    city: data?.city,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChnage = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.put(`http://localhost:8081/api/users/${id}`, updateData);
    handleClose();
    window.location.reload();
  };

  return (
    <Box>
      <Navbar />
      <Box className="mainDiv">
        <Box
          height={"80vh"}
          padding={"20px"}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
          }}
        >
          <Box className="userProfile" width={"35%"}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                background: "#f0f0f0",
                borderRadius: "15px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#800000",
                    height: "10vh",
                    width: "10vh",
                    fontSize: "2rem",
                    marginTop: "20px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {user.username.slice(0, 1)}
                </Avatar>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "20px",
                  marginBottom: "30vh",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {data?.username}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#555" }}>
                  {data?.city}, {data?.country}
                </Typography>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box
              height={"40vh"}
              width={"60vw"}
              marginTop={"10px"}
              sx={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Full Name</strong>
                      </TableCell>
                      <TableCell align="">{data?.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Email</strong>
                      </TableCell>
                      <TableCell align="">{data?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Phone Number</strong>
                      </TableCell>
                      <TableCell align="">{data?.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Address</strong>
                      </TableCell>
                      <TableCell align="">
                        {data?.city}, {data?.country}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                sx={{ marginTop: "20px" }}
              >
                Edit Profile
              </Button>
            </Box>
            <UserReserve />
          </Box>
        </Box>
      </Box>
      <Box className="dialogBox">
        <Dialog open={open} fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <small className="small">Change that are only needed</small>
          <Box
            padding={"20px"}
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              variant="outlined"
              name="username"
              placeholder={data?.username}
              onChange={(e) => handleChnage(e)}
            />
            <TextField
              variant="outlined"
              name="email"
              placeholder={data?.email}
              onChange={(e) => handleChnage(e)}
            />
            <TextField
              variant="outlined"
              name="phone"
              placeholder={data?.phone}
              onChange={(e) => handleChnage(e)}
            />
            <TextField
              variant="outlined"
              name="city"
              placeholder={data?.city}
              onChange={(e) => handleChnage(e)}
            />
            <TextField
              variant="outlined"
              name="country"
              placeholder={data?.country}
              onChange={(e) => handleChnage(e)}
            />
          </Box>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UserProfile;
