import GameBoardAPI, { MoveDirection } from './GameBoard';

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
    expect(numOpenTiles).toBe(14);
  });

  test('Tile Movement', () => {
    const gameboard = new GameBoardAPI();
    gameboard.board = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 4, 0],
      [0, 0, 4, 0],
    ];
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
  });

  test('Win Condition', () => {});

  test('Loss Condition', () => {});
});
