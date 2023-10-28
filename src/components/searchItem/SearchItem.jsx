import { Link } from "react-router-dom";
import "./searchItem.css";
import React, { useState, useEffect } from "react";

const SearchItem = ({ item }) => {
  const initialData = [
    { name: "Item A", price: 50 },
    { name: "Item B", price: 30 },
    { name: "Item C", price: 80 },
    // Add more items as needed
  ];

  const [data, setData] = useState(initialData);

  const heapify = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left].price > arr[largest].price) {
      largest = left;
    }

    if (right < n && arr[right].price > arr[largest].price) {
      largest = right;
    }

    if (largest !== i) {
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      heapify(arr, n, largest);
    }
  };

  useEffect(() => {
    const n = data.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(data, n, i);
    }

    for (let i = n - 1; i >= 0; i--) {
      const temp = data[0];
      data[0] = data[i];
      data[i] = temp;

      heapify(data, i, 0);
    }

    setData([...data]); // Trigger a re-render
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{item.desc}</span>
        <span className="siFeatures">Entire studio • 1 bathroom • 21m²</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">Rs.{item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
