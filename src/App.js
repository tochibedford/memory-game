import { useState } from "react";
import Menu from "./Components/Menu";
import MainGame from "./Components/MainGame";

export default function App() {
  const [gamePlaying, setGamePlaying] = useState(1)
  const [gamePauser, setGamePauser] = useState(()=>{})
  return (
    <div className="app">
      <MainGame
        gamePauser = {gamePauser}
        gamePlaying = {gamePlaying}
      />
      <Menu
        setGamePauser = {setGamePauser}
        gamePlaying = {gamePlaying} 
      />
    </div>
  );
}
