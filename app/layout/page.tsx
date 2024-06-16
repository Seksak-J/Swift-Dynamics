"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import {
  faCaretLeft,
  faCaretUp,
  faCaretDown,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquare,
  faCircle,
  faCircleHalfStroke,
  faDiamond,
  faBookmark,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";

export default function Layout() {
  const icons = [
    faSquare,
    faCircle,
    faCircleHalfStroke,
    faDiamond,
    faBookmark,
    faCertificate,
  ];
  const [boxes, setBoxes] = useState(icons);
  const [topRowAlignment, setTopRowAlignment] = useState("justify-start");
  const [bottomRowAlignment, setBottomRowAlignment] = useState("justify-end");

  const shuffle = (array: any[]) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const handleLeft = () => {
    const newBoxes = [...boxes.slice(1), boxes[0]];
    setBoxes(newBoxes);
  };

  const handleRight = () => {
    const newBoxes = [
      boxes[boxes.length - 1],
      ...boxes.slice(0, boxes.length - 1),
    ];
    setBoxes(newBoxes);
  };

  const handleUpDown = () => {
    setTopRowAlignment((prev) =>
      prev === "justify-start" ? "justify-end" : "justify-start"
    );
    setBottomRowAlignment((prev) =>
      prev === "justify-end" ? "justify-start" : "justify-end"
    );
  };

  const handleBoxClick = () => {
    const shuffledBoxes = shuffle([...boxes]);
    setBoxes(shuffledBoxes);
  };
  return (
    <div className="h-screen bg-gradient-to-r from-[#6eda78] to-[#ffa200] w-full">
      <div className="flex justify-between">
        <div className="p-[8px] text-4xl">
          <h1>Layout & Style</h1>
        </div>
        <div>
          <select id="lan" name="language">
            <option value="en">en</option>
            <option value="th">th</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center space-x-[16px] mt-[16px] items-center">
        <button onClick={() => handleLeft()}>
          <div className="w-[300px] h-[150px] bg-white rounded-[16px] flex items-center justify-center text-gray-500 text-9xl hover:bg-[#ffa200]">
            <FontAwesomeIcon icon={faCaretRight} />
          </div>
          <div className="absolute bg-green-500 rounded-full px-[8px] py-[4px] w-[150px] translate-x-16 text-white transform translate-y-[-16px]">
            Move shape
          </div>
        </button>
        <button onClick={() => handleUpDown()}>
          <div className="w-[600px] h-[150px] bg-white rounded-[16px] flex items-center px-[100px] justify-between text-gray-500 text-9xl hover:bg-[#ffa200]">
            <FontAwesomeIcon icon={faCaretUp} />
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="absolute bg-green-500 rounded-full px-[8px] py-[4px] w-[150px] right-[47.5%] text-white transform translate-y-[-16px]">
            Move position
          </div>
        </button>
        <button onClick={() => handleRight()}>
          <div className="w-[300px] h-[150px] bg-white rounded-[16px] flex items-center justify-center text-gray-500 text-9xl hover:bg-[#ffa200]">
            <FontAwesomeIcon icon={faCaretLeft} />
          </div>
          <div className="absolute bg-green-500 rounded-full px-[8px] py-[4px] w-[150px] translate-x-16 text-white transform translate-y-[-16px]">
            Move shape
          </div>
        </button>
      </div>
      <div className="border-b border-black w-[1232px] mx-auto my-[48px]" />

      <div className="mx-auto max-w-[1280px]">
        <div className={`space-y-4`}>
          <div className={`flex ${topRowAlignment} space-x-4`}>
            {boxes.slice(0, 3).map((data, index) => (
              <button key={index} onClick={() => handleBoxClick()}>
                <div className="w-[300px] h-[150px] bg-white rounded-[16px] flex items-center justify-center text-gray-500 text-8xl hover:bg-[#ffa200] hover:text-white">
                  <FontAwesomeIcon icon={data} />
                </div>
              </button>
            ))}
          </div>
          <div className={`flex ${bottomRowAlignment} space-x-4`}>
            {boxes.slice(3, 6).map((data, index) => (
              <button key={index} onClick={() => handleBoxClick()}>
                <div className="w-[300px] h-[150px] bg-white rounded-[16px] flex items-center justify-center text-gray-500 text-8xl hover:bg-[#ffa200] hover:text-white">
                  <FontAwesomeIcon icon={data} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
