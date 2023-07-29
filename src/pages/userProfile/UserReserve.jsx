import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Box,
  Typography,
} from "@material-ui/core";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const UserReserve = () => {
  const { user } = useContext(AuthContext);
  const id = user._id;
  const { data, error, loading } = useFetch(
    `http://localhost:8081/api/users/reserve/${id}`
  );

  const reserveid = data._id || null;
  console.log(reserveid);
  console.log(id);
  const handleDelete = async () => {
    const userid = user._id;
    await axios.delete(
      `http://localhost:8081/api/reserve/${reserveid}/${userid}`
    );
  };
  useEffect(() => {}, [data]);
  return (
    <Box width={"150%"}>
      <Box>
        <Typography variant="h5" fontWeight={"500"} className="ReserverText">
          Your Reservation
        </Typography>
      </Box>
      <Box>
        <Box marginTop={"10px"}>
          <TableContainer>
            <Table aria-label="simple table" bgcolor="#d6d2d2">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Hotel</TableCell>
                  <TableCell align="center">Room.No</TableCell>
                  <TableCell align="center">Days</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </TableHead>

              <TableRow key={data._id}>
                <TableCell align="center">{data.hotelName}</TableCell>
                <TableCell align="center">{data.roomNumber}</TableCell>
                <TableCell align="center">{data.days} days</TableCell>
                <TableCell align="center">Rs.{data.price}</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <button className="button" onClick={handleDelete}>
            Cancle Reservation
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserReserve;
