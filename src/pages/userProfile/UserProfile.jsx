import React, { useEffect, useContext } from "react";
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
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@material-ui/core";
import "./UserProfile.css";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import UserReserve from "./UserReserve";

// const users = JSON.parse(localStorage.getItem("user"));
// const id = users._id || null;

const UserProfile = (props) => {
  const { user } = useContext(AuthContext);
  const id = user._id;
  console.log(id);
  const { data, loading, error } = useFetch(
    `http://localhost:8081/api/users/${id}`
  );
  const [open, setOpen] = React.useState(false);
  const [updateData, setUpdateData] = React.useState({
    username: data.username,
    phone: data.phone,
    email: data.email,
    country: data.country,
    city: data.city,
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
          sx={{ display: "flex", flexDirection: "row", gap: "40px" }}
        >
          <Box className="userProfile" width={"35%"}>
            <Paper
              evaluation={44}
              sx={{
                width: "100%",
                height: "70vh",
                background: "rgb(217, 221, 225)",
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
                    height: "20vh",
                    width: "30%",
                    marginTop: "80px",
                    fontSize: "50px",
                  }}
                >
                  {/* {data.username} */}
                </Avatar>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Typography variant="h4" marginTop={"20px"}>
                  {data.username}
                </Typography>
                <Typography variant="h5">
                  {data.city}, {data.country}
                </Typography>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box height={"40vh"} width={"150%"} marginTop={"10px"}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody bgcolor="#d6d2d2">
                    <TableRow>
                      <TableCell component="th" scope="row" align="">
                        Full Name
                      </TableCell>
                      <TableCell align="">{data.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="">
                        Email
                      </TableCell>
                      <TableCell align="">{data.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="">
                        Phone Number
                      </TableCell>
                      <TableCell align="">{data.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="">
                        Address
                      </TableCell>
                      <TableCell align="">
                        {data.city}, {data.country}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <button className="button" onClick={handleClickOpen}>
                Edit Profile
              </button>
            </Box>
            <UserReserve />
          </Box>
        </Box>
      </Box>
      <Box className="dialogBox">
        <Dialog open={open} aria-labelledby="draggable-dialog-title" fullWidth>
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Edit Profile
          </DialogTitle>
          <small className="small">Change that are only needed</small>
          <Box
            padding={"50px"}
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              variant="outlined"
              name="username"
              placeholder={data.username}
              onChange={(e) => handleChnage(e)}
              color="warning"
            />
            <TextField
              variant="outlined"
              name="email"
              placeholder={data.email}
              onChange={(e) => handleChnage(e)}
            />
            <TextField
              variant="outlined"
              name="phone"
              placeholder={data.phone}
              onChange={(e) => handleChnage(e)}
            />
            <TextField
              variant="outlined"
              name="city"
              placeholder={data.city}
              onChange={(e) => handleChnage(e)}
            />
            <TextField
              variant="outlined"
              name="country"
              placeholder={data.country}
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
