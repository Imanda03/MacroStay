import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";

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
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="widget">
            <Widget type="user" />
          </div>
          <div className="widget">
            <Widget type="order" />
          </div>
          <div className="widget">
            <Widget type="room" />
          </div>
          <div className="widget">
            <Widget type="reserved" />
          </div>
          <div className="widget">
            <Widget type="availableRoom" />
          </div>

          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
