import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core";

 
function createData(userName, hotel, room, days, price){
  return {userName, hotel, room, days, price};
}

const rows =[
  createData("Anish", "kathmandu Hotel", "201", 5, 2000) ,
 createData("Mandish", "Pokhara Hotel", "301", 5, 2000) ,
  createData("Isha", "Chitwan Hotel", "401", 5, 5000) 
]

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" >Name</TableCell>
                <TableCell align="center">Hotel</TableCell>
                <TableCell align="center">Room.No</TableCell>
                <TableCell align="center">Days</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) =>(
                <TableRow key={row.number}>
                  <TableCell component="th" scope="row" align="center">
                    {row.userName}
                  </TableCell>
                  <TableCell align="center">{row.hotel}</TableCell>
                  <TableCell align="center">{row.room}</TableCell>
                  <TableCell align="center">{row.days} days</TableCell>
                  <TableCell align="center">Rs.{row.price}</TableCell>
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
