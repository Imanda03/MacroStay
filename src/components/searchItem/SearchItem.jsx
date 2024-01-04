import { Link } from "react-router-dom";
import "./searchItem.css";
import React from "react";

const SearchItem = ({ item }) => {
  console.log(item);

  //heapSort

  const heapsort = (arr, key) => {
    let n = arr.length;

    //Build heap rearrange array
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, key);
    }

    for (let i = n - 1; i > 0; i--) {
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      heapify(arr, i, 0, key);
    }

    return arr;
  };

  const heapify = (arr, n, i, key) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 1;

    if (l < n && arr[l][key] > arr[largest][key]) {
      largest = l;
    }

    if (largest != i) {
      let swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;

      //recursively heapify the affected sub-tree
      heapify(arr, n, largest, key);
    }
  };

  const price = heapsort(item, "cheapestPrice");

  return (
    <div className="searchItem">
      <img src={price.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{price.name}</h1>
        <span className="siDistance">{price.distance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{price.desc}</span>
        <span className="siFeatures">Entire studio • 1 bathroom • 21m²</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {price.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{price.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">Rs.{price.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${price._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
