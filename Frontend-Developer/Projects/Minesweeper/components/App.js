import React, { useState, useEffect } from "react";
import "../css/App.css";
import ControlPanel from "./ControlPanel";
import Field from "./Field";

const NUMBER_OF_CELL = 72;
const NUMBER_OF_MINE = 10;
const NUMBER_OF_ROWS = 9;
const NUMBER_OF_COLS = 8;

const stateOfGame = {
  WAITING: "waiting",
  RUNNING: "running",
  WON: "won",
  OVER: "over",
};
const stateOfCell = {
  CLOSED: "closed",
  OPENED: "opened",
  FLAGGED: "flagged",
  FIRED: "fired",
};

export default function App() {
  const [field, setField] = useState([]);
  const [mineArray, setMineArray] = useState([]);
  const [flag, setFlag] = useState(NUMBER_OF_MINE);
  const [openingArea, setOpeningArea] = useState([]);
  const [firstClick, setFirstClick] = useState(null);
  const [gameStatus, setGameStatus] = useState(stateOfGame.WAITING);

  // Create field
  const createField = () => {
    const cellArray = [];
    const mineArray = [];

    // Create cells
    for (let index = 0; index < NUMBER_OF_CELL; index++) {
      cellArray.push({
        id: index,
        minesAround: 0,
        status: stateOfCell.CLOSED,
        isMine: false,
        isChecked: false,
      });
    }

    // Place mines
    for (let index = 0; index < NUMBER_OF_MINE; index++) {
      const randomIndex = Math.floor(Math.random() * 72);
      const [row, col] = [Math.floor(randomIndex / 8), randomIndex % 8];

      // If index has mine then change to another index
      if (mineArray.includes(randomIndex)) {
        index--;
        continue;
      }
      // Else change isMine attribute to true
      mineArray.push(randomIndex);
      cellArray[randomIndex].isMine = true;

      // Count mines around
      for (let i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > 8) {
          continue;
        }
        for (let j = col - 1; j <= col + 1; j++) {
          if (j < 0 || j > 7) {
            continue;
          }
          const pos = i * 8 + j;
          cellArray[pos].minesAround++;
        }
      }
    }

    setField(cellArray);
    setMineArray(mineArray);
  };

  // Reset game
  const resetGame = () => {
    createField();
    setFlag(NUMBER_OF_MINE);
    setOpeningArea([]);
    setGameStatus(stateOfGame.WAITING);
  };

  // Find opening area
  const findOpeningArea = (index, cellArray) => {
    if (cellArray[index].isMine) {
      return;
    }

    if (cellArray[index].minesAround !== 0) {
      cellArray[index].status = stateOfCell.OPENED;

      return;
    }

    const [row, col] = [Math.floor(index / 8), index % 8];

    // Check neighbors
    for (let i = row - 1; i <= row + 1; i++) {
      if (i < 0 || i > NUMBER_OF_ROWS - 1) {
        continue;
      }

      for (let j = col - 1; j <= col + 1; j++) {
        if (j < 0 || j > NUMBER_OF_COLS - 1) {
          continue;
        }

        const pos = i * NUMBER_OF_COLS + j;
        if (cellArray[pos].isChecked) {
          continue;
        } else {
          cellArray[pos].isChecked = true;

          // If this cell is closed then open it
          if (cellArray[pos].status === stateOfCell.CLOSED) {
            cellArray[pos].status = stateOfCell.OPENED;
          }

          setOpeningArea([...openingArea, pos]);

          // If this cell has no mines around then repeat
          if (cellArray[pos].minesAround === 0) {
            findOpeningArea(pos, cellArray);
          }
        }
      }
    }
  };

  // Check all cells are open
  const checkAllCells = () => {
    for (let i = 0; i < NUMBER_OF_CELL; i++) {
      if (field[i].status === stateOfCell.CLOSED) {
        return false;
      }
    }

    return true;
  };

  // Show all mines
  const showAllMines = () => {
    const newField = field;

    mineArray.forEach((index) => (newField[index].status = stateOfCell.OPENED));

    setField(newField);
  };

  // Click handler
  const openCell = (id) => {
    // Open cell when state of game is not over and state of cell is closed
    if (
      gameStatus !== stateOfGame.OVER &&
      field[id].status === stateOfCell.CLOSED
    ) {
      // Handle first click
      if (gameStatus === stateOfGame.WAITING) {
        const cellIsMine = field[id].isMine;

        // If cell is mine then change field
        if (cellIsMine) {
          setFirstClick(id);
          createField();

          return;
        }
      }

      // Find opening area of this cell
      const newField = field;

      // If this cell is empty then find opening area
      // Else change status to opened
      setOpeningArea([]);
      findOpeningArea(id, newField);
      setField(newField);

      // If cell is mine then game over
      // Else if all cells are open then game won
      // Else run the game
      if (newField[id].isMine) {
        showAllMines();
        setGameStatus(stateOfGame.OVER);
      } else if (checkAllCells()) {
        setGameStatus(stateOfGame.WON);
      } else {
        setGameStatus(stateOfGame.RUNNING);
      }
    }
  };

  // Right click handler
  const markCell = (id) => {
    // Mark cell when remaining flag is more than 0 and
    // state of cell is closed and
    // state of game is not over and won
    if (
      flag > 0 &&
      field[id].status === stateOfCell.CLOSED &&
      gameStatus !== stateOfGame.OVER &&
      gameStatus !== stateOfGame.WON
    ) {
      // Mark this cell
      const newField = field;
      newField[id].status = stateOfCell.FLAGGED;
      setFlag(flag - 1);
      setField(newField);

      // If all cells are open then game won
      // Else run the game
      if (checkAllCells()) {
        setGameStatus(stateOfGame.WON);
      } else {
        setGameStatus(stateOfGame.RUNNING);
      }
    }
  };

  // Init field
  useEffect(() => {
    createField();
  }, []);

  // Handle first click
  useEffect(() => {
    if (firstClick !== null) {
      setFirstClick(null);
      openCell(firstClick);
    }
  }, [firstClick]);

  useEffect(() => {}, [field]);

  return (
    <div className="minesweeper">
      <ControlPanel flag={flag} gameStatus={gameStatus} resetGame={resetGame} />
      <Field
        field={field}
        clickHandler={openCell}
        rightClickHandler={markCell}
      />
    </div>
  );
}
