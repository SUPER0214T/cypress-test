import React, { useState } from "react";
import masterSlice from "../../redux/masterSlice";
import { store } from "../../redux/store";

function Counter() {
  const [count, setCount] = useState(0);

  const handleDecreaseClick = () => {
    if (count === 0) {
      return;
    }
    setCount((prev) => prev - 1);
  };

  const handleIncreaseClick = () => {
    const limit = store.getState().master.counterLimit;
    if (limit !== 0 && count >= limit) {
      return;
    }

    setCount((prev) => prev + 1);
  };

  return (
    <div className="counter">
      <DecreaseBtn onClick={handleDecreaseClick} />
      <div className="count">{count}</div>
      <IncreaseBtn onClick={handleIncreaseClick} />
    </div>
  );
}

export default Counter;

// Counter 구성 요소들
const DecreaseBtn = ({ onClick }: { onClick: any }) => {
  return (
    <button className="count-btn decrease-btn" onClick={onClick}>
      -
    </button>
  );
};

const IncreaseBtn = ({ onClick }: { onClick: any }) => {
  return (
    <button className="count-btn increase-btn" onClick={onClick}>
      +
    </button>
  );
};
