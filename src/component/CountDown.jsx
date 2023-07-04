import React, { useState, useEffect } from "react";
import "./CountDown.css";

const CountDown = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const startCountdown = () => {
    const totalSeconds =
      days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    setSeconds(totalSeconds);
    setTimerActive(true);
  };

  const stopCountdown = () => {
    setTimerActive(false);
    setMinutes(0);
    setHours(0);
    setDays(0);
    setSeconds(0);
  };

  useEffect(() => {
    let countdown;

    if (seconds > 0 && timerActive) {
      countdown = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setTimerActive(false);
    }

    return () => clearTimeout(countdown);
  }, [seconds, timerActive]);

  useEffect(() => {
    if (timerActive) {
      const secondDays = Math.floor(seconds / (24 * 60 * 60));
      const secondHours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
      const secondMinutes = Math.floor((seconds % (60 * 60)) / 60);

      setDays(secondDays);
      setHours(secondHours);
      setMinutes(secondMinutes);
    }
  }, [timerActive, seconds]);

  return (
    <div className="countdown-container">
      <div>
        <label>Дни:</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </div>
      <div>
        <label>Часы:</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </div>
      <div>
        <label>Минуты:</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>
      <div>
        <label>Секунды:</label>
        <input
          type="number"
          value={seconds % 60}
          onChange={(e) => setSeconds(e.target.value % 60)}
        />
      </div>

      {!timerActive ? (
        <button className="start-button" onClick={startCountdown}>
          Старт
        </button>
      ) : (
        <button className="stop-button" onClick={stopCountdown}>
          Стоп
        </button>
      )}

      <div className="timer">
        {days}:{hours}:{minutes}:{seconds % 60}
      </div>
    </div>
  );
};

export default CountDown;
