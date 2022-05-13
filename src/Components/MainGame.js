import React, { useState } from "react";
import Board from "./Board";

const MainGame = ({gamePauser, gamePlaying}) => {
  

  const handlePause = ()=>{
  	gamePauser();
  }
  return (
    <div className="mainGame">
      <div className="pauseButton" onClick={handlePause} >
      	||
      </div>
      <Board />
    </div>
  );
};

export default MainGame;
