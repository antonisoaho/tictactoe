"use client";
import { use, useState, useEffect } from "react";
import cross from "../../../public/assets/icons/cross.png";
import circle from "../../../public/assets/icons/circle.png";

const row = 3;
const boxes = 3;

const Gameboard = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);

  const toggleIcon = (index) => {
    if (lock || data[index]) return;

    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = count % 2 === 0 ? "X" : "O";
      return newData;
    });
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    console.log("BOARDDATA", data);
  }, [data]);

  return (
    <div className="container ">
      <h1>Board</h1>
      <div className="board bg-blue-400 w-full h-[500px] gap-1 flex flex-col ">
        {Array.from({ length: row }).map((_, i) => (
          <div key={i} className={`row${i + 1} flex gap-x-1 flex-1`}>
            {Array.from({ length: boxes }).map((_, j) => {
              const index = i * boxes + j;
              return (
                <div
                  key={index}
                  className={
                    "boxes bg-red-400 flex-1 flex items-center justify-center"
                  }
                  onClick={() => toggleIcon(index)}
                >
                  {data[index] === "X" && <img src={cross.src} alt="cross" className="w-3/4 h-3/3" />}
                  {data[index] === "O" && <img src={circle.src} alt="circle" className="w-3/4 h-3/3"  />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gameboard;
