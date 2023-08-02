import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";
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

const Home = () => {
  const [userid, setUserid] = useState("");
  const [reserveid, setReserveid] = useState("");
  const { data, loading, error } = useFetch(
    `http://localhost:8081/api/reserve`
  );
  const handleClick = async () => {
    try {
      await axios.delete(
        `http://localhost:8081/api/reserve/${reserveid}/${userid}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log("user : " + userid);
  console.log("reserve : " + reserveid);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">UserName</TableCell>
                <TableCell align="center">Hotel</TableCell>
                <TableCell align="center">Room.No</TableCell>
                <TableCell align="center">Days</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row" align="center">
                    {item.userName}
                  </TableCell>
                  <TableCell align="center">{item.hotelName}</TableCell>
                  <TableCell align="center">{item.roomNumber}</TableCell>
                  <TableCell align="center">{item.days} days</TableCell>
                  <TableCell align="center">Rs.{item.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={
                        ((() => () => setUserid(item.userid),
                        () => setReserveid(item._id)),
                        () => handleClick())
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
