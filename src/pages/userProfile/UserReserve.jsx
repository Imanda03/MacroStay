import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Box,
  Typography,
} from "@material-ui/core";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const UserReserve = () => {
  const { user } = useContext(AuthContext);
  const id = user._id;
  const { data, error, loading } = useFetch(
    `http://localhost:8081/api/users/reserve/${id}`
  );
  const userName = data.userName;
  const days = data.days;
  const hotelName = data.hotelName;
  const reserveid = data._id || null;
  const roomid = data?.roomNumber;
  const handleDelete = async () => {
    const userid = user._id;
    await axios
      .post(`http://localhost:8081/api/cancel`, {
        userName,
        days,
        hotelName,
      })
      .then(async () => {
        await axios
          .delete(
            `http://localhost:8081/api/reserve/${reserveid}/${userid}/${roomid}`
          )
          .then(() => {
            message.success("Cancellation has been completed. Please refresh!");
          });
        window.location.reload();
      });
  };
  // useEffect(() => {
  //   data;
  // }, [handleDelete]);
  return (
    <Box width={"60vw"}>
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
