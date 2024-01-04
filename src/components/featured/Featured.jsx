import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect } from "react";
import axios, { all } from "axios";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

const Featured = () => {
  // http://localhost:8081/api/reserve
  const [totalSale, setTotalSale] = useState(0);
  const [totalReserve, setTotalReserve] = useState("");
  const [allRoomNumbers, setAllRoomNumbers] = useState([]);

  const hotelData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/reserve");
      const data = response.data;

      const cheapestPrices = data.map((hotel) => hotel.price);
      const totalSum = cheapestPrices.reduce((sum, price) => sum + price, 0);
      setTotalSale(totalSum);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };
  const roomData = async () => {
    const data = await axios.get("http://localhost:8081/api/rooms");
    const roomData = data.data;
    const totalRooms = roomData.reduce(
      (totalRooms, room) => totalRooms + room.roomNumbers.length,
      0
    );
    setAllRoomNumbers(totalRooms);
  };

  const reserverData = async () => {
    const data = await axios.get("http://localhost:8081/api/reserve");
    const reservData = data.data;
    const totalRoomReserve = reservData.reduce(
      (total, reserve) => total + reserve.roomNumber.length,
      0
    );
    setTotalReserve(totalRoomReserve);
  };

  useEffect(() => {
    reserverData();
    roomData();
    hotelData();
  }, []);

  const perce = ((totalReserve / allRoomNumbers) * 100).toFixed(2);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={perce}
            text={perce + "%"}
            strokeWidth={7}
          />
        </div>
        <p className="title">Total Money Made </p>
        <p className="amount">Rs. {totalSale}</p>
        {/* <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p> */}
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
