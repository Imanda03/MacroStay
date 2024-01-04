import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Box,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
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
    try {
      await axios.post(`http://localhost:8081/api/cancel`, {
        userName,
        days,
        hotelName,
      });

      await axios.delete(
        `http://localhost:8081/api/reserve/${reserveid}/${userid}/${roomid}`
      );

      message.success("Cancellation has been completed. Please refresh!");
      window.location.reload();
    } catch (error) {
      console.error("Error during cancellation:", error);
      message.error("An error occurred during cancellation.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h5" fontWeight={"500"} className="ReserverText">
        Your Reservation
      </Typography>
      <Box marginTop={"20px"}>
        <TableContainer>
          <Table aria-label="simple table" bgcolor="#d6d2d2">
            <TableHead>
              <TableRow>
                <TableCell align="center">Hotel</TableCell>
                <TableCell align="center">Room No</TableCell>
                <TableCell align="center">Days</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableRow key={data._id}>
              <TableCell align="center">{data.hotelName}</TableCell>
              <TableCell align="center">{data.roomNumber}</TableCell>
              <TableCell align="center">{data.days} days</TableCell>
              <TableCell align="center">Rs.{data.price}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleDelete}
                >
                  Cancel Reservation
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default UserReserve;
