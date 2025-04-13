import { useEffect, useState } from "react";
import "./style.scss";

interface ScoreTypes {
  pause: boolean;
  score: number;
  reducePoints: (points: number) => void;
  gameOver: boolean;
}

function Score({ pause, score, gameOver }: ScoreTypes) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!pause && !gameOver && score - timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft + 1), 4000);
      return () => clearTimeout(timer);
    }
  }, [gameOver, pause, score, timeLeft]);

  return <div className="timer">Score: {score - timeLeft}</div>;
}

export default Score;
