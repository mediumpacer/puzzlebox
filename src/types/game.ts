
  import { type TileColour} from '../types/tiles';

  export interface PuzzleGame {
    id: string;
    title: string;
    iconColour: TileColour;
    tiles: TileColour[];
    locks: TileColour[];
  };