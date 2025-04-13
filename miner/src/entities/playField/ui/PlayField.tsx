import { useId, useState } from "react";
import "./style.scss";
import { Cell, generateMatrix } from "@shared/utils/generateMatrix";

interface PlayFieldTypes {
  addPoints: (points: number) => void;
  handleGameOver: () => void;
  pause: boolean;
  size: number;
  minesCount: number;
  gameOver: boolean;
}

function PlayField(props: PlayFieldTypes) {
  const { gameOver, size, minesCount, addPoints, pause, handleGameOver } =
    props;
  const [field, setField] = useState(() => generateMatrix(size, minesCount));
  const cellId = useId();
  let openedCells = 0;

  function openCell(matrix: Cell[][], targetCell: Cell) {
    const { x, y, mineAround, isMined } = targetCell;

    matrix[y][x].isOpen = true;
    if (isMined) {
      handleGameOver();
    }
    openedCells += 1;

    if (mineAround === 0) {
      matrix[y][x].siblings.forEach((sibling) => {
        if (!sibling.isOpen) {
          openCell(matrix, sibling);
        }
      });
    }
  }

  function handleCheck(targetCell: Cell) {
    if (targetCell.isOpen || pause) {
      return;
    }

    openCell(field, targetCell);
    addPoints(openedCells);
    setField([...field]);
  }

  const rows = field.map((col, i) => (
    <div
      className={"play-field__row" + (pause ? " disable" : "")}
      key={`${cellId} ${i}`}
    >
      {col.map((cell) => (
        <button
          className={"play-field__cell" + (cell.isOpen ? " open" : "")}
          onClick={() => handleCheck(cell)}
          key={`${cellId} ${cell.x} ${cell.y}`}
          disabled={gameOver}
        >
          {cell.isOpen && cell.isMined && "X"}
          {cell.isOpen && !cell.isMined && cell.mineAround}
        </button>
      ))}
    </div>
  ));

  return <div className="play-field">{rows}</div>;
}

export default PlayField;
