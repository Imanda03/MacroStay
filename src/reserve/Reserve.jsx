import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.css";
import { useFetch } from "../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import StripeCheckout from "react-stripe-checkout";

const Reserve = ({ hotelName, price, setOpen, hotelId }) => {
  const { user } = useContext(AuthContext);
  const users = JSON.parse(localStorage.getItem("user"));
  console.log(users);
  const [forPrice, setForPrice] = useState();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:8081/api/hotels/room/${hotelId}`
  );

  // const handleTest = () => {
  //   const days = dates[0].endDate.getDate() - dates[0].startDate.getDate();

  //   const reserveData = {
  //     userName: users.username,
  //     days: days,
  //     price: forPrice * days,
  //     hotelName: hotelName,
  //     userid: users._id,
  //     roomNumber: selectedRooms,
  //   };
  //   console.log(reserveData);
  // };

  const REACT_APP_KEY =
    "pk_test_51Ntuu9F8i2EULDmhhCnM3EeW7Y9HzllrMvSX2Khq5mhLbDYwrta2guVtFWwbQsiZLZ1uNDfDjrJMpwHdh53lHGKb00mUZKURQp";

  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  //check the room is available or not
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(user.email);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      try {
        const days = dates[0].endDate.getDate() - dates[0].startDate.getDate();
        const userid = users._id;
        const reserveData = {
          userName: users.username,
          days: days,
          price: forPrice * days,
          hotelName: hotelName,
          roomNumber: selectedRooms,
          userid: userid,
          email: user.email,
        };

        await axios.post(
          `http://localhost:8081/api/reserve/${userid}`,
          reserveData
        );
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(
              `http://localhost:8081/api/rooms/availability/${roomId}`,
              {
                dates: alldates,
              }
            );
            return res.data;
          })
        );
        setOpen(false);
        navigate("/");
      } catch (error) {}
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span className="span">Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Rs.{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onClick={() => {
                      setForPrice(item.price) &&
                        // setRoomNumbers(roomNumber.number);
                        // setRoomNumbers([...roomNumbers, roomNumber.number]);
                        console.log(roomNumber.number);
                    }}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <StripeCheckout
          shippingAddress
          stripeKey={REACT_APP_KEY}
          token={handleClick}
          name="Book room"
          amount={forPrice * 100}
          onClick={handleClick}
          currency="npr"
        >
          <button className="rButton">Reserve Now!</button>
        </StripeCheckout>
      </div>
      {/* <button onClick={handleTest}>Test</button> */}
    </div>
  );
};

export default Reserve;
