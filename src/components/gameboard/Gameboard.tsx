"use client"
import { useState } from "react";
import cross from "../../assets/icons/cross.png";
import circle from "../../assets/icons/circle.png";

const row = 3;
const boxes = 3;

const Gameboard = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    const data = ["","","","","","","","",""];
    
    const toggleIcon = (e,num) => {
        if(lock){
            return 0;
        }
        if(count%2===0){
            e.target.innerHTML = `<img src='${cross}'>`
            data[num]=X;
            setCount(++count);
        }
        else{
            e.target.innerHTML = `<img src='${circle}'>`
            data[num]=O;
            setCount(++count);
        }

    }

  return (
    <div className="container ">
        <h1>Board</h1>
      <div className="board bg-blue-400 w-full h-[500px] gap-1 flex flex-col ">
        {Array.from({ length: row }).map((_, i) => (
          <div key={i} className={`row${i +1} flex gap-x-1 flex-1`}>
            {Array.from({ length: boxes }).map((_, j) => (
              <div key={j} className={"boxes bg-red-400 flex-1"} onClick={(e) => {toggleIcon(e,j)}}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gameboard;
