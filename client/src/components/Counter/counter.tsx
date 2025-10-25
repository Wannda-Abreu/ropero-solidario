import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";


const ClickCounter: React.FC<{
  initialCount: number;
  onUpdate: (newCount: number) => void;
}> = ({ initialCount, onUpdate }) => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

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
            type="button"
            className="counterButton"
            onClick={() => handleButtonClick("decrement")}
            aria-label="Disminuir cantidad"
        >
            <FontAwesomeIcon icon={faMinus}  />
        </button>
        <span>{count}</span> 
        <button
            type="button"
            className="counterButton"
            onClick={() => handleButtonClick("increment")}
            aria-label="Aumentar cantidad"
        >
         <FontAwesomeIcon icon={faPlus} />
        </button>
        </div>
);
};

export default ClickCounter;

