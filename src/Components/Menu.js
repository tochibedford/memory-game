import React, { useState, useEffect } from "react";
import music from "../sounds/gameMusic-106bpm.ogg";
import musicBP from "../sounds/gameMusicBP-106bpm.ogg";
import musicLP from "../sounds/gameMusicLP-106bpm.ogg";

export default function Menu({setGamePauser, gamePlaying}) {
  const [gameMusicPlaying, setGameMusicPlaying] = useState(0)
  const [menuOpacity, setMenuOpacity] = useState(1);
  const [menuVisibility, setMenuVisibility] = useState("visible");

  // game music
  let gameMusics = new Audio(music);
  let gameMusicsBP = new Audio(musicBP);
  let gameMusicsLP = new Audio(musicLP);

  const [gameMusic, setGameMusic] = useState(gameMusics)
  const [gameMusicBP, setGameMusicBP] = useState(gameMusicsBP)
  const [gameMusicLP, setGameMusicLP] = useState(gameMusicsLP)

  gameMusic.loop = true;
  gameMusicBP.loop = true;
  gameMusicLP.loop = true;

  

  const bpm = 106;
  let secondsPerBeat = 60 / bpm;
  let beatDrop = secondsPerBeat * 24;
  let loopPoint = secondsPerBeat * 100;

  // update all versions of game music
  // gameMusic.addEventListener("timeupdate", (event) => {
  //   gameMusicBP.currentTime = gameMusic.currentTime;
  //   gameMusicLP.currentTime = gameMusic.currentTime
  // });

  const musicFade = (music, fadeTime, direction=0)=>{
    let c = music.volume; 
    let slope = (direction-music.volume)/(fadeTime-0) //(y2-y1)/(x2-x1)
    // direction is y2
    
    let currentFadeTime = 0;
    // fadeTime should be in milliseconds
    let fadeInterval = setInterval(()=>{
      if (currentFadeTime<=fadeTime){
        // using y=mx+c (linear fade) & using (y2-y1)/(x2-x1) to get slope
        // where y is volume & x is time in milliseconds
        let newVolume = Math.min(1, Math.max(0, (slope*(currentFadeTime) + c )))// y=mx+c
        music.volume = newVolume.toFixed(2)
        currentFadeTime += 100
      }else{
        clearInterval(fadeInterval);
      }
    }, 100)
  }


  const styles = {
    opacity: menuOpacity,
    visibility: menuVisibility
  }

  const closeMenu = ()=>{
    gameMusicBP.currentTime = gameMusic.currentTime;
    gameMusicLP.currentTime = gameMusic.currentTime
    setMenuOpacity(()=>{
      setTimeout(()=>{
        setMenuVisibility(()=>{
          return "hidden";
        })
        musicFade(gameMusicLP, 1000, 0);
        musicFade(gameMusic, 1000, 0.5);
      }, 500)
      return 0
    })
  }

  const openMenu = () => {
    setMenuOpacity(()=>{
      gameMusicBP.currentTime = gameMusic.currentTime;
      gameMusicLP.currentTime = gameMusic.currentTime
      setTimeout(()=>{
        setMenuVisibility(()=>{
          return "visible";
        })

        musicFade(gameMusicLP, 1000, 0.1);
        musicFade(gameMusic, 1000, 0);
      }, 500)
      return 1
    })
  }

  const handleClick = ()=>{
    if(!gameMusicPlaying){
      gameMusic.play();
      gameMusicBP.play();
      gameMusicLP.play();
    }
    
    closeMenu() 
  }

  useEffect(()=>{
    gameMusic.volume = 0.8;
    gameMusicBP.volume = 0;
    gameMusicLP.volume = 0;
    setGamePauser(()=>{
      return openMenu
    })
  }, [])
  
  

  return (
    <div className="menu" style = {styles}>
      <div className="start" onClick = {handleClick} >PLAY</div>
    </div>
  );
}
