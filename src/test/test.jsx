import React, { useState, useEffect } from "react";

const Test = () => {
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
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
