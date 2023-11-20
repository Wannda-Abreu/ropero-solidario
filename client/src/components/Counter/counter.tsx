import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";


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
            className="counterButton"
            onClick={() => handleButtonClick("decrement")}
        >
            <FontAwesomeIcon icon={faMinus}  />
        </button>
        <span>{count}</span> 
        <button
            className="counterButton"
            onClick={() => handleButtonClick("increment")}
        >
         <FontAwesomeIcon icon={faPlus} />
        </button>
        </div>
);
};

export default ClickCounter;
