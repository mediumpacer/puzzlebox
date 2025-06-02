import { type TileColour, TileColours } from '../types/tiles';

  // Tiles that share borders
export const getAdjacentTiles = (pos: number) => {
  switch (pos) {
    case 0:
      return [1, 3];
    case 1:
      return [0, 2, 4];
    case 2:
      return [1, 5];
    case 3:
      return [0, 4, 6];
    case 4:
      return [1, 5, 7, 3];
    case 5:
      return [2, 8, 4];
    case 6:
      return [3, 7];
    case 7:
      return [4, 8, 6];
    case 8:
      return [5, 7];
    default:
      return [];
  }
}

// We define these in a clockwise manner so we can rotate them for pink tiles
export const getSurroundingTiles = (pos: number) => {
  switch (pos) {
    case 0:
      return [1, 4, 3];
    case 1:
      return [0, 2, 5, 4, 3];
    case 2:
      return [1, 5, 4];
    case 3:
      return [0, 1, 4, 7, 6];
    case 4:
      return [0, 1, 2, 5, 8, 7, 6, 3];
    case 5:
      return [1, 2, 8, 7, 4];
    case 6:
      return [3, 4, 7];
    case 7:
      return [3, 4, 5, 8, 6];
    case 8:
      return [4, 5, 7];
    default:
      return [];
  }
}

export const calculateTileChange = (pos: number, tiles: TileColour[], colourOverride: null | TileColour = null) => {
  let nextTiles = tiles.slice();
  const tileColour = colourOverride ? colourOverride : nextTiles[pos];
  const adjacentTiles = getAdjacentTiles(pos);

  switch (tileColour) {
    // Moves all tiles in row to the right
    case TileColours.BLACK:
      switch (pos) {
        case 0:
        case 1:
        case 2:
          nextTiles[0] = tiles[2];
          nextTiles[1] = tiles[0];
          nextTiles[2] = tiles[1];
          break;
        case 3:
        case 4:
        case 5:
          nextTiles[3] = tiles[5];
          nextTiles[4] = tiles[3];
          nextTiles[5] = tiles[4];
          break;
        case 6:
        case 7:
        case 8:
          nextTiles[6] = tiles[8];
          nextTiles[7] = tiles[6];
          nextTiles[8] = tiles[7];
          break;
      }
      break;

    // Will copy the ability of the centre tile of the 3x3 grid
    case TileColours.BLUE:
      const centreTileColour = tiles[4];
      nextTiles = calculateTileChange(pos, tiles, centreTileColour);
      break;

    // Grey tiles do nothing
    case TileColours.GREY:
      break;

    // Tile moves up one position.
    case TileColours.YELLOW:
      if (pos >= 3) {
        nextTiles[pos] = tiles[pos - 3];
        nextTiles[pos - 3] = tiles[pos];
      }
      break;

    // Tile moves down one position.
    case TileColours.PURPLE:
      if (pos <= 5) {
        nextTiles[pos] = tiles[pos + 3];
        nextTiles[pos + 3] = tiles[pos];
      }
      break;

    // Tile swaps with tile in the opposite position.
    case TileColours.GREEN:
      switch (pos) {
        case 0:
        case 8:
          nextTiles[0] = tiles[8];
          nextTiles[8] = tiles[0];
          break;
        case 1:
        case 7:
          nextTiles[1] = tiles[7];
          nextTiles[7] = tiles[1];
          break;
        case 2:
        case 6:
          nextTiles[2] = tiles[6];
          nextTiles[6] = tiles[2];
          break;
        case 3:
        case 5:
          nextTiles[3] = tiles[5];
          nextTiles[5] = tiles[3];
          break;
      }
      break;

    // White tiles turn adjacent grey tiles white (including diagonals).
    // White tiles always turn grey when clicked
    case TileColours.WHITE:
      adjacentTiles.forEach((adjPos) => {
        if (tiles[adjPos] === TileColours.GREY) {
          nextTiles[adjPos] = TileColours.WHITE;
        }
      });
      nextTiles[pos] = TileColours.GREY;
      break;

    // Turns all white tiles black and all black tiles red.
    case TileColours.RED:
      nextTiles.forEach((tile, index) => {
        if (tile === TileColours.WHITE) {
          nextTiles[index] = TileColours.BLACK;
        } else if (tile === TileColours.BLACK) {
          nextTiles[index] = TileColours.RED;
        }
      });
      break

    // Rotates every adjacent tile one clockwise position.
    case TileColours.PINK:
      const surroundingTiles = getSurroundingTiles(pos);
      surroundingTiles.forEach((adjPos, index) => {
        // If the adjacent tile is undefined, get the last tile in the arra
        nextTiles[adjPos] = surroundingTiles[(index - 1)] !== undefined ? tiles[surroundingTiles[(index - 1)]] : tiles[surroundingTiles[surroundingTiles.length - 1]];
      });
      break;

    // Tile changes colors to match the majority of its adjacent tiles. If there adjacent tiles are evenly split, the tile will not change colors.
    case TileColours.ORANGE:
      const adjColours = adjacentTiles.map((adjPos) => tiles[adjPos]);
      const counts = adjColours.reduce((acc, col) => {
        const value = col;
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {});

      let maxCount = 0;
      let maxColour = '';

      for (const value in counts) {
        if (counts[value] > maxCount) {
          maxCount = counts[value];
          maxColour = value;
        }
      }
      nextTiles[pos] = maxColour as TileColour;
  }

  return nextTiles;
};