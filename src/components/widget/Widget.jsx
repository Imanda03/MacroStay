import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  const [totalHotel, setTotalHotel] = useState("");
  const hotelData = async () => {
    const data = await axios.get("http://localhost:8081/api/hotels");
    setTotalHotel(data.data.length);
    console.log(totalHotel);
  };
  let StaticData;

  const diff = 20;

  useEffect(() => {
    hotelData();
  });

  switch (type) {
    case "user":
      StaticData = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        amount: 5,
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
        title: "HOTELS",
        isMoney: false,
        link: "View all hotels",
        amount: 6,
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
    case "earning":
      StaticData = {
        title: "ROOMS",
        isMoney: true,
        link: "View net rooms",
        amount: 7,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    // case "balance":
    //   data = {
    //     title: "BALANCE",
    //     isMoney: true,
    //     link: "See details",
    //     icon: (
    //       <AccountBalanceWalletOutlinedIcon
    //         className="icon"
    //         style={{
    //           backgroundColor: "rgba(128, 0, 128, 0.2)",
    //           color: "purple",
    //         }}
    //       />
    //     ),
    //   };
    //   break;
    default:
      break;
  }
  return (
    // <div className="widget">
    //   <div className="left">
    //     <span className="title">{data.title}</span>
    //     <span className="counter">
    //       {
    //         (data.title = "USERS"
    //           ? user
    //           : (data.title = "HOTELS" ? hotel : rooms))
    //       }
    //     </span>
    //     <span className="link">{data.link}</span>
    //   </div>
    //   <div className="right">
    //     <div className="percentage positive">
    //       <KeyboardArrowUpIcon />
    //       {diff} %
    //     </div>
    //     {data.icon}
    //   </div>
    // </div>
    <div className="widget">
      <div className="left">
        <span className="title">{StaticData.title}</span>
        <span className="counter">
          {
            (StaticData.title = "USERS"
              ? totalHotel
              : (StaticData.title = "HOTELS"
                  ? StaticData.amount
                  : StaticData.amount))
          }
        </span>
        <span className="link">{StaticData.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {StaticData.icon}
      </div>
    </div>
  );
};

export default Widget;
