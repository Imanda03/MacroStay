import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Reserve.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Reserve = () => {
  const [userid, setUserid] = useState("");
  const [reserveid, setReserveid] = useState("");
  const { data, loading, error } = useFetch(
    `http://localhost:8081/api/reserve`
  );
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Box sx={{}}>
          <TableContainer component={Paper} sx={{ minHeight: "50vh" }}>
            <h3>Reservation details</h3>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">S.N</TableCell>
                  <TableCell align="center">UserName</TableCell>
                  <TableCell align="center">Hotel</TableCell>
                  <TableCell align="center">Room.No</TableCell>
                  <TableCell align="center">Days</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {item.userName}
                    </TableCell>
                    <TableCell align="center">{item.hotelName}</TableCell>
                    <TableCell align="center">{item.roomNumber}</TableCell>
                    <TableCell align="center">{item.days} days</TableCell>
                    <TableCell align="center">Rs.{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ padding: "10px", marginLeft: "82%" }}>
            <Link to="cancel">
              <Button variant="contained" color="primary">
                Check The Cancellation
              </Button>
            </Link>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Reserve;
