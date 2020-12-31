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
            for (let rowB = rowA; rowB < end; rowB++) {
              const cellB = this.board[rowB][column];
              if (cellB !== cellA && cellB !== 0) break;
              else {
                if (cellB == cellA) {
                  this.board[rowB][column] = 0;
                  this.board[rowA][column] *= 2;
                  if (rowA + 1 != end) rowA++;
                }
              }
            }
          }
        }
      }
    } else {
      // Combine elements in rows
      const [start, end] = [0, 4];
      for (let row = 0; row < 4; row++) {
        for (let columnA = start; columnA < end; columnA++) {
          const cellA = this.board[columnA][row];
          if (cellA !== 0) {
            for (let columnB = columnA; columnB < end; columnB++) {
              const cellB = this.board[columnB][row];
              if (cellB !== cellA && cellB !== 0) break;
              else {
                if (cellB == cellA) {
                  this.board[columnB][row] = 0;
                  this.board[columnA][row] *= 2;
                  if (columnA + 1 != end) columnA++;
                }
              }
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

const gameboardapi = new GameBoard();

gameboardapi.display();
gameboardapi.initializeBoard();
gameboardapi.display();

export default GameBoard;
