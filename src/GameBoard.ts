import prompt from 'prompt-sync';
import getRandomPercentage from './helpers/getRandomPercentage';
import getRandomInt from './helpers/getRandomInt';

export enum MoveDirection {
  Up,
  Down,
  Left,
  Right,
}

export enum GameStatus {
  InProgress,
  Won,
  Lost,
}

class GameBoard {
  board: number[][];

  constructor(
    board: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  ) {
    this.board = board;
  }

  initializeBoard(): void {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    for (let i = 0; i < 2; i++) this.placeNewTile();
  }

  display(): void {
    console.log(this.board);
  }

  placeNewTile(): void {
    let openTiles: number[][] = [];
    this.board.forEach((row, i) => {
      row.forEach((cell: number, j) => {
        if (cell === 0) openTiles.push([i, j]);
      });
    });
    const random = getRandomInt(0, openTiles.length);
    const position: number[] = openTiles[random];
    const newTile: number = getRandomPercentage() > 90 ? 4 : 2;
    this.board[position[0]][1] = newTile;
  }

  moveTiles(direction: MoveDirection): void {
    if (direction == MoveDirection.Up || direction == MoveDirection.Down) {
      // Combine elements in column
      const [start, end] = [0, 4];
      for (let column = 0; column < 4; column++) {
        for (let rowA = start; rowA < end; rowA++) {
          const cellA = this.board[rowA][column];
          if (cellA !== 0) {
            for (let rowB = rowA + 1; rowB < end; rowB++) {
              const cellB = this.board[rowB][column];
              if (cellB !== cellA && cellB !== 0) break;
              else {
                if (cellB == cellA) {
                  this.board[rowB][column] = 0;
                  this.board[rowA][column] *= 2;
                  if (rowA + 1 != end) rowA++;
                  break;
                }
              }
            }
          }
        }
      }
      console.log('finished combining elements');
      this.display();
      // squash elements
      let availableCellsRowNumber: number[] = [];
      if (direction == MoveDirection.Up) {
        for (let column = 0; column < 4; column++) {
          availableCellsRowNumber = [];
          for (let row = 0; row < 4; row++) {
            const cell = this.board[row][column];
            console.log(`cell ${column},${row} is equal to ${cell}`);
            if (cell === 0) availableCellsRowNumber.push(row);
            if (cell !== 0 && availableCellsRowNumber.length > 0) {
              const availableCellRowNumber = availableCellsRowNumber.shift();
              console.log(
                `there are cells before this one which are 0, will move this one to ${column},${availableCellRowNumber}`
              );
              this.board[availableCellRowNumber][column] = this.board[row][
                column
              ];
              this.board[row][column] = 0;
              availableCellsRowNumber.push(row);
            }
          }
        }
      } else if (direction == MoveDirection.Down) {
        for (let column = 0; column < 4; column++) {
          availableCellsRowNumber = [];
          for (let row = 3; row >= 0; row--) {
            const cell = this.board[row][column];
            console.log(`cell ${column},${row} is equal to ${cell}`);
            if (cell === 0) availableCellsRowNumber.push(row);
            if (cell !== 0 && availableCellsRowNumber.length > 0) {
              const availableCellRowNumber = availableCellsRowNumber.shift();
              console.log(
                `there are cells before this one which are 0, will move this one to ${column},${availableCellRowNumber}`
              );
              this.board[availableCellRowNumber][column] = this.board[row][
                column
              ];
              this.board[row][column] = 0;
              availableCellsRowNumber.push(row);
            }
          }
        }
      }
    } else if (
      direction == MoveDirection.Left ||
      direction == MoveDirection.Right
    ) {
      // Combine elements in rows
      const [start, end] = [0, 4];
      for (let row = 0; row < 4; row++) {
        for (let columnA = start; columnA < end; columnA++) {
          const cellA = this.board[row][columnA];
          console.log(`cell at ${columnA},${row} is equal to ${cellA}`);
          if (cellA !== 0) {
            for (let columnB = columnA + 1; columnB < end; columnB++) {
              const cellB = this.board[row][columnB];
              console.log(`checking next cell to check for equality.`);
              console.log(
                `the next cell at ${columnB},${row} is equal to ${cellB}`
              );
              if (cellB !== cellA && cellB !== 0) break;
              else {
                if (cellB == cellA) {
                  console.log(
                    `cell at ${columnA},${row} is equal to ${columnB},${row}, value is ${cellA}`
                  );
                  this.board[row][columnB] = 0;
                  this.board[row][columnA] *= 2;
                  if (columnA + 1 != end) columnA++;
                  break;
                }
              }
            }
          }
        }
      }
      console.log('finished combining!');
      this.display();
      // Squash
      let availableCellsColumnNumber: number[] = [];
      if (direction == MoveDirection.Left) {
        for (let row = 0; row < 4; row++) {
          availableCellsColumnNumber = [];
          for (let column = 0; column < 4; column++) {
            const cell = this.board[row][column];
            console.log(`cell ,${column},${row} is equal to ${cell}`);
            if (cell === 0) availableCellsColumnNumber.push(column);
            if (cell !== 0 && availableCellsColumnNumber.length > 0) {
              const availableCellColumnNumber = availableCellsColumnNumber.shift();
              console.log(
                `there are cells before this one which are 0, will move this one to ${availableCellColumnNumber},${row}`
              );
              this.board[row][availableCellColumnNumber] = this.board[row][
                column
              ];
              this.board[row][column] = 0;
              availableCellsColumnNumber.push(column);
            }
          }
        }
      } else if (direction == MoveDirection.Right) {
        for (let row = 0; row < 4; row++) {
          availableCellsColumnNumber = [];
          for (let column = 3; column >= 0; column--) {
            const cell = this.board[row][column];
            console.log(`cell ,${column},${row} is equal to ${cell}`);
            if (cell === 0) availableCellsColumnNumber.push(column);
            if (cell !== 0 && availableCellsColumnNumber.length > 0) {
              const availableCellColumnNumber = availableCellsColumnNumber.shift();
              console.log(
                `there are cells before this one which are 0, will move this one to ${availableCellColumnNumber},${row}`
              );
              this.board[row][availableCellColumnNumber] = this.board[row][
                column
              ];
              this.board[row][column] = 0;
              availableCellsColumnNumber.push(column);
            }
          }
        }
      }
    }
  }

  getBoardStatus(): GameStatus {
    return GameStatus.InProgress;
  }
}

const gameboardapi = new GameBoard([
  [2, 2, 2, 2],
  [0, 2, 4, 4],
  [16, 16, 16, 16],
  [0, 0, 0, 0],
]);

gameboardapi.moveTiles(MoveDirection.Right);
gameboardapi.display();

export default GameBoard;
