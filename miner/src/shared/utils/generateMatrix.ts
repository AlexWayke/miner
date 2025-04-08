export type Cell = {
  x: number;
  y: number;
  isMined: boolean;
  isOpen: boolean;
  mineAround: number;
  siblings: Cell[];
};

function mapSiblings(
  matrix: Cell[][],
  targetCell: Cell,
  callback: (cell: Cell) => void,
) {
  const { x, y } = targetCell;

  for (let v = y - 1; v <= y + 1; v++) {
    if (matrix[v]) {
      for (let l = x - 1; l <= x + 1; l++) {
        if (matrix[v][l]) {
          callback(matrix[v][l]);
        }
      }
    }
  }
}

function placeMines(matrix: Cell[][], size: number, diff: number) {
  for (let k = 0; k < diff; k++) {
    const x = Math.floor(Math.random() * size),
      y = Math.floor(Math.random() * size);

    if (matrix[y][x].isMined) {
      k--;
    } else {
      mapSiblings(matrix, matrix[y][x], (siblingCell) => {
        siblingCell.mineAround = siblingCell.mineAround + 1;
      });
    }

    matrix[y][x].isMined = true;
  }
}

function addSiblingsLinks(matrix: Cell[][]) {
  matrix.forEach((col) => {
    col.forEach((cell) => {
      mapSiblings(matrix, cell, (siblingCell) => {
        if (cell !== siblingCell) {
          cell.siblings.push(siblingCell);
        }
      });
    });
  });
}

export function generateMatrix(size = 10, diff = 1) {
  const matrix: Cell[][] = [];

  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push({
        x: j,
        y: i,
        isMined: false,
        isOpen: false,
        mineAround: 0,
        siblings: [],
      });
    }
    matrix.push(row);
  }

  placeMines(matrix, size, diff);

  addSiblingsLinks(matrix);

  return matrix;
}
