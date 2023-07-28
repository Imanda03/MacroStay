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
import { useContext } from "react";

const UserReserve = () => {
  const { user } = useContext(AuthContext);
  const id = user._id;
  const { data, error, loading } = useFetch(
    `http://localhost:8081/api/users/reserve/${id}`
  );
  console.log(data);
  return (
    <Box width={"200%"}>
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
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{item.hotelName}</TableCell>
                  <TableCell align="center">{item.roomNumber}</TableCell>
                  <TableCell align="center">{item.days} days</TableCell>
                  <TableCell align="center">Rs.{item.price}</TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
          <button className="button">Cancle Reservation</button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserReserve;
