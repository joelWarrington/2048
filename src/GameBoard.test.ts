import GameBoardAPI, { MoveDirection, GameStatus } from './GameBoard';

describe('BoardGame API', () => {
  test('Board Initialization', () => {
    const gameboard = new GameBoardAPI();
    expect(gameboard.board).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    gameboard.initializeBoard();
    let numOpenTiles: number = 0;
    gameboard.board.forEach((row) => {
      numOpenTiles += row.filter((cell) => cell === 0).length;
    });
    expect(numOpenTiles).toEqual(14);
  });

  test('Tile Movement', () => {
    const gameboard = new GameBoardAPI([
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 4, 0],
      [0, 0, 4, 0],
    ]);
    gameboard.moveTiles(MoveDirection.Down);
    expect(gameboard.board).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 8, 0],
    ]);
    gameboard.moveTiles(MoveDirection.Left);
    expect(gameboard.board).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 8, 0, 0],
    ]);
    gameboard.moveTiles(MoveDirection.Up);
    expect(gameboard.board).toStrictEqual([
      [4, 8, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    gameboard.moveTiles(MoveDirection.Right);
    expect(gameboard.board).toStrictEqual([
      [0, 0, 4, 8],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  test('Available Move Condition', () => {
    const gameboard = new GameBoardAPI();
    gameboard.initializeBoard();
    expect(gameboard.getBoardStatus()).toEqual(GameStatus.InProgress);
    gameboard.board = [
      [4, 16, 4, 8],
      [16, 32, 16, 8],
      [16, 32, 16, 4],
      [2, 4, 4, 4],
    ];
    expect(gameboard.getBoardStatus()).toEqual(GameStatus.InProgress);
  });

  test('Win Condition', () => {
    const gameboard = new GameBoardAPI([
      [2048, 16, 4, 8],
      [16, 32, 16, 8],
      [16, 32, 16, 4],
      [2, 0, 4, 4],
    ]);
    expect(gameboard.getBoardStatus()).toEqual(GameStatus.Won);
    gameboard.board = [
      [2, 16, 4, 8],
      [16, 32, 16, 8],
      [16, 32, 16, 4],
      [2, 0, 4, 2048],
    ];
    expect(gameboard.getBoardStatus()).toEqual(GameStatus.Won);
  });

  test('Loss Condition', () => {
    const gameboard = new GameBoardAPI([
      [32, 16, 2, 4],
      [16, 4, 8, 16],
      [4, 32, 16, 4],
      [2, 64, 4, 2],
    ]);
    expect(gameboard.getBoardStatus()).toEqual(GameStatus.Lost);
    gameboard.board = [
      [4, 2, 4, 2],
      [8, 16, 8, 16],
      [32, 64, 32, 64],
      [128, 256, 128, 256],
    ];
    expect(gameboard.getBoardStatus()).toEqual(GameStatus.Lost);
  });
});
