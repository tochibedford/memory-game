import React, { useEffect } from "react";
import { useRef, useState } from "react";

const Card = ({
  id,
  rotation,
  image,
  flipped,
  clickSound,
  swooshSound,
  correctSound,
  boardState,
  setBoardState,
  cardCloserFuncs,
  setCardCloserFuncs,
  cardCorrectFuncs,
  setCardCorrectFuncs
}) => {
  const cardRef = useRef(null);
  const rotateState = useRef(rotation);
  const [rotateYState, setRotateYState] = useState(180);
  const cardImage = useRef(image);
  const [cardOpacity, setCardOpacity] = useState(1);
  const [cardVisibility, setCardVisibility] = useState(1);
  const [emojiOpacity, setEmojiOpacity] = useState(0);
  const boardStateRef = useRef(boardState);

  const styles = {
    opacity: cardOpacity ? 1 : 0,
    visibility: cardVisibility ? "visible" : "hidden",
    transform: `rotateZ(${rotateState.current}deg) rotateY(${rotateYState}deg)`
  };

  const emojiStyle = {
    opacity: emojiOpacity
  };

  const closerFunc = () => {
    setTimeout(() => {
      setRotateYState((prevRot) => {
        return Math.abs(prevRot - 180);
      });
      swooshSound.play();
      setTimeout(() => {
        setEmojiOpacity(Math.abs(0));
        flipped.current = 0;
      }, 250);
    }, 1000);
  };

  const cardCorrectFunc = () => {
    setTimeout(() => {
      setCardOpacity((prevState) => {
        return prevState ? 0 : 1;
      });
      correctSound.play();
      setTimeout(() => {
        setCardVisibility((prevState) => {
          return prevState ? 0 : 1;
        });
      }, 1000);
    }, 1000);
  };

  const cardChecking = (a, b) => {
    return true && boardStateRef.current[a] === boardStateRef.current[b];
  };

  useEffect(() => {
    setCardCloserFuncs((prevState) => {
      return [...prevState, closerFunc];
    });
    setCardCorrectFuncs((prevState) => {
      return [...prevState, cardCorrectFunc];
    });
  }, []); 

  const handleClick = () => {
    if (rotateYState/180){

      if (flipped.current < 2) {
        clickSound.play();
        setRotateYState((prevRot) => {
          return Math.abs(prevRot - 180);
        });
        flipped.current += 1;
        setTimeout(() => {
          setEmojiOpacity(Math.abs(rotateYState / 180));
        }, 250);
        setBoardState((prevState) => {
          let newBoardState = {
            ...prevState,
            [id + 1]: cardRef.current.textContent
          };
          boardStateRef.current = newBoardState;
          return newBoardState;
        });
        if (flipped.current >= 2) {
          let boardStateKeys = Object.keys(boardStateRef.current);
          if (cardChecking(...boardStateKeys)) {
            boardStateKeys.forEach((key) => {
              cardCorrectFuncs[key - 1]();
              cardCloserFuncs[key - 1]();
            });
          } else {
            boardStateKeys.forEach((key) => {
              cardCloserFuncs[key - 1]();
            });
          }

          setBoardState((prevState) => {
            let newBoardState = {};
            boardStateRef.current = newBoardState;
            return newBoardState;
          });
        }
      }
    }
  };


  return (
    <div
      id={id}
      className="card"
      style={styles}
      onClick={handleClick}
      ref={cardRef}
    >
      <div className="emojiContainer" style={emojiStyle}>
        {cardImage.current}
      </div>
    </div>
  );
};

export default Card;
