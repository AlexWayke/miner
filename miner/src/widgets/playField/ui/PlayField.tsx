import { useId, useState } from "react";
import "./style.scss";
import { Cell, generateMatrix } from "@shared/utils/generateMatrix";

function PlayField() {
  const [field, setField] = useState(() => generateMatrix(10, 5));
  const cellId = useId();

  const rows = field.map((col, i) => (
    <div className="play-field__row" key={`${cellId} ${i}`}>
      {col.map((cell) => (
        <button
          className={"play-field__cell" + (cell.isOpen ? " open" : "")}
          onClick={() => handleCheck(cell)}
          key={`${cellId} ${cell.x} ${cell.y}`}
        >
          {cell.isOpen && cell.isMined && "X"}
          {cell.isOpen && !cell.isMined && cell.mineAround}
        </button>
      ))}
    </div>
  ));

  function openCell(matrix: Cell[][], targetCell: Cell) {
    const { x, y, mineAround } = targetCell;

    matrix[y][x].isOpen = true;

    if (mineAround === 0) {
      matrix[y][x].siblings.forEach((sibling) => {
        if (!sibling.isOpen) {
          openCell(matrix, sibling);
        }
      });
    }
  }

  function handleCheck(targetCell: Cell) {
    if (targetCell.isOpen) {
      return;
    }

    const modField = [...field];
    openCell(modField, targetCell);
    setField(modField);
  }

  return <div className="play-field">{rows}</div>;
}

export default PlayField;
