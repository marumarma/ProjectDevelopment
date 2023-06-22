
import React, { useState } from "react";
import bell from "../bell.mp3"

export const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
    const [paused, setPaused] = React.useState(true);
    const [over, setOver] = React.useState(false);
    const [howTime, setHowTime] = useState(25)
    const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);
    const firstTimeH = 0
    const firstTimeM = m
    const firstTimeS = s

    function soundClick() {
        var audio = new Audio(bell); // Создаём новый элемент Audio
         // Указываем путь к звуку "клика"
        audio.play(); // Автоматически запускаем
      }
  
    const tick = () => {
      if (paused || over) return;
  
      if (h === 0 && m === 0 && s === 0 && howTime == 25) {
        setTime([0, 5, 0]);
        setHowTime(5)
        soundClick()
      }
        else if (h === 0 && m === 0 && s === 0 && howTime == 5) {
            setTime([0, 25, 0]);
            setHowTime(25)
            soundClick()
      } else if (m === 0 && s === 0) {
        setTime([h - 1, 59, 59]);
      } else if (s == 0) {
        setTime([h, m - 1, 59]);
      } else {
        setTime([h, m, s - 1]);
      }
    };
  
    const reset = () => {
      setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
      setPaused(false);
      setOver(false);
    };
  
    React.useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });
  
    return (
      <div>
        <p>{`${h.toString().padStart(2, '0')}:${m
          .toString()
          .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
        <div>{over ? "Time's up!" : ''}</div>
        <button onClick={() => setPaused(!paused)}>
          {paused ? 'Start' : 'Pause'}
        </button>
        <button onClick={() => reset()}>Restart</button>
      </div>
    );
  };