import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Widget = ({ type }) => {
  const navigate = useNavigate();
  const [totalHotel, setTotalHotel] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [totalReserve, setTotalReserve] = useState("");
  const [allRoomNumbers, setAllRoomNumbers] = useState([]);
  const hotelData = async () => {
    const data = await axios.get("http://localhost:8081/api/hotels");
    setTotalHotel(data.data.length);
  };
  const userData = async () => {
    const data = await axios.get("http://localhost:8081/api/users");
    setTotalUsers(data.data.length);
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
  let StaticData;

  const diff = 20;

  useEffect(() => {
    hotelData();
    userData();
    roomData();
    reserverData();
  });

  const handleLink = (sth) => {
    if (sth == "See all users") {
      navigate("/users");
    } else if (sth == "View all hotels") {
      navigate("/hotels");
    } else if (sth == "View all rooms") {
      navigate("/rooms");
    } else {
      navigate("/reserveDetails");
    }
  };

  switch (type) {
    case "user":
      StaticData = {
        title: "TOTAL USERS",
        isMoney: false,
        link: "See all users",
        amount: totalUsers,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      StaticData = {
        title: "TOTAL HOTELS",
        isMoney: false,
        link: "View all hotels",
        amount: totalHotel,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "room":
      StaticData = {
        title: "TOTAL ROOMS",
        isMoney: true,
        link: "View all rooms",
        amount: allRoomNumbers,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "reserved":
      StaticData = {
        title: "RESERVED ROOMS",
        isMoney: true,
        link: "View details of reserved rooms",
        amount: totalReserve,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "availableRoom":
      StaticData = {
        title: "AVAILABLE ROOMS",
        isMoney: true,
        link: "",
        amount: allRoomNumbers - totalReserve,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{StaticData.title}</span>
        <span className="counter">
          {
            (StaticData.title = "TOTAL USERS"
              ? StaticData.amount
              : (StaticData.title = "TOTAL HOTELS"
                  ? StaticData.amount
                  : (StaticData.title = "TOTAL ROOMS")
                  ? StaticData.amount
                  : (StaticData.title = "RESERVED ROOMS")
                  ? StaticData.amount
                  : (StaticData.title = "AVAILABLE ROOMS")
                  ? StaticData.amount
                  : StaticData.amount))
          }
        </span>
        <span className="link" onClick={() => handleLink(StaticData.link)}>
          {StaticData.link}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* {diff} % */}
        </div>
        {StaticData.icon}
      </div>
    </div>
  );
};

export default Widget;
