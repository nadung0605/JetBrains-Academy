import React, { useState, useEffect } from "react";

export default function Timer(props) {
  const [seconds, setSeconds] = useState(0);
  const { gameStatus } = props;

  // If game is running then change time
  // Else reset time
  useEffect(() => {
    if (gameStatus === "running") {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (gameStatus === "waiting") {
      setSeconds(0);
    }
  }, [gameStatus]);

  let minute = Math.floor(seconds / 60);
  let second = seconds - minute * 60;
  let time = `${minute}:` + (second < 10 ? `0${second}` : `${second}`);

  return <div className="clock">{time}</div>;
}
