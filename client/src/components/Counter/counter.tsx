import React, { useState } from 'react';
import plusIcon from "../../assets/Icons/iconPlus.png"
import minusIcon from "../../assets/Icons/iconMinus.png"


const ClickCounter: React.FC<{
  initialCount: number;
  onUpdate: (newCount: number) => void;
}> = ({ initialCount, onUpdate }) => {
  const [count, setCount] = useState<number>(initialCount);

  const handleButtonClick = (operation: "increment" | "decrement") => {
    if (operation === "increment") {
        const newCount = count + 1;
        setCount(newCount);
        onUpdate(newCount);
    } else if (operation === "decrement" && count > 0) {
        const newCount = count - 1;
        setCount(newCount);
        onUpdate(newCount);
    }
};

    return (
        <div className="Counters">
        <button
            className="adminButton"
            onClick={() => handleButtonClick("decrement")}
        >
            <img src={minusIcon}  />
        </button>
        <span>{count}</span>
        <button
            className="adminButton"
            onClick={() => handleButtonClick("increment")}
        >
            <img src={plusIcon} />
        </button>
        </div>
);
};

export default ClickCounter;
