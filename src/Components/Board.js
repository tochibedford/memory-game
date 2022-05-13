import React from "react";
import { useState, useRef } from "react";
import Card from "./Card";
import clickSound from "../sounds/click.ogg";
import swooshSound from "../sounds/swoosh.ogg";
import correctSound from "../sounds/sparkle.ogg";

const emojiFunc = require("../UtilityJS/emoji.js");
const Board = () => {
  
  // Sound Effects Stuff
  const clickSo = new Audio(clickSound);
  const swooshSo = new Audio(swooshSound);
  const correctSo = new Audio(correctSound);
  clickSo.volume = 0.6;
  swooshSo.volume = 0.4;
  correctSo.volume = 0.4;
  clickSo.addEventListener("timeupdate", (event) => {
    if (clickSo.currentTime >= 0.2) {
      clickSo.pause();
      clickSo.currentTime = 0;
    }
  });

  // Main Board Logic
  const flipped = useRef(0);
  const cards = [];
  let images = [];
  const [boardState, setBoardState] = useState({});
  const [cardCloserFuncs, setCardCloserFuncs] = useState([]);
  const [cardCorrectFuncs, setCardCorrectFuncs] = useState([]);
  const cardAmount = 20;
  for (let i = 0; i < cardAmount / 2; i++) {
    images.push(emojiFunc());
  }
  images = [...images, ...images];

  images = images.sort((a, b) => 0.5 - Math.random());
  images.forEach((img, index) => {
    let rotation = (Math.random() * 2 - 1) * 10;
    cards.push(
      <Card
        id={index}
        key={index}
        rotation={rotation}
        image={img}
        flipped={flipped}
        clickSound={clickSo}
        swooshSound={swooshSo}
        correctSound={correctSo}
        boardState={boardState}
        setBoardState={setBoardState}
        cardCloserFuncs={cardCloserFuncs}
        setCardCloserFuncs={setCardCloserFuncs}
        cardCorrectFuncs={cardCorrectFuncs}
        setCardCorrectFuncs={setCardCorrectFuncs}
      />
    );
  });

  return <div className="board">{cards}</div>;
};

export default Board;
