import PlayField from "@entities/playField";
import "./style.scss";
import Score from "@entities/score";
import Layout from "@entities/layout";
import { useCallback, useEffect, useId, useState } from "react";
import Button from "@shared/components/button";
import Smile from "@entities/smile";

function Miner() {
  const fieldId = useId();
  const [difficult, setDifficult] = useState(10);
  const [currentScore, setCurrentScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [resetField, setResetField] = useState(fieldId);
  const [isWin, setWin] = useState(false);

  const changeScore = useCallback(
    (points: number) => {
      const summPoints = currentScore + points;
      setCurrentScore(summPoints);
    },
    [currentScore],
  );

  const handleGameOver = () => {
    setIsOver(true);
  };

  const resetGame = () => {
    setResetField(resetField + 1);
    setDifficult(difficult);
    setIsPaused(false);
    setIsOver(false);
    setCurrentScore(0);
    setWin(false);
  };

  useEffect(() => {
    if (currentScore >= difficult ** 2 - difficult) {
      setIsOver(true);
      setWin(true);
    }
  }, [difficult, currentScore]);

  return (
    <Layout>
      {isOver ? (
        <Button text="reset" callback={() => resetGame()} />
      ) : (
        <Button
          text={isPaused ? "resume" : "pause"}
          callback={() => setIsPaused(!isPaused)}
        />
      )}
      <Smile pause={isPaused} dead={isOver} win={isWin} />
      <Score
        key={resetField + 1}
        gameOver={isOver}
        pause={isPaused}
        score={currentScore}
        reducePoints={changeScore}
      />
      <PlayField
        key={resetField}
        size={difficult}
        minesCount={difficult}
        pause={isPaused}
        addPoints={changeScore}
        gameOver={isOver}
        handleGameOver={handleGameOver}
      />
    </Layout>
  );
}

export default Miner;
