import styled from 'styled-components';
import { useState } from 'react';
import Tile from './Tile';
import LockToggle from './LockToggle';
import { type TileColour, TileColours } from '../types/tiles';
import { calculateTileChange } from '../helpers/tileHelpers.ts'

const StyledTileBoardContainer = styled.div`
  padding: clamp(4rem, 8vw, 8rem);
  position: relative;

  .styled-tile-board__inner {
    padding: clamp(3rem, 5vw, 6rem);
    width: clamp(24rem, 60vw, 60rem);
    position: relative;

    & > svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      fill: var(--color-board-bg);
      stroke: var(--color-tile-border);
      stroke-width: 0.2rem;
      filter: drop-shadow(0.6rem 0.6rem rgba(0,0,0, 0.2));
    }
  }
`;

const StyledTileBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 3vw, 3rem);
  margin: auto;

`;

export default function TileBoard() {

  // Game 1 - grey corners win
  // const defaultBoard = [
  //   TileColours.GREY, TileColours.GREEN, TileColours.GREY,
  //   TileColours.ORANGE, TileColours.RED, TileColours.ORANGE,
  //   TileColours.WHITE, TileColours.GREEN, TileColours.BLACK
  // ]

  // Game 2 - yello corners win
  const defaultBoard = [
    TileColours.PINK, TileColours.GREY, TileColours.GREY,
    TileColours.GREY, TileColours.YELLOW, TileColours.YELLOW,
    TileColours.GREY, TileColours.YELLOW, TileColours.YELLOW
  ]

  // const defaultBoard = [
  //   TileColours.BLUE, TileColours.PURPLE, TileColours.PURPLE,
  //   TileColours.PURPLE, TileColours.BLACK, TileColours.RED,
  //   TileColours.GREEN, TileColours.WHITE, TileColours.BLACK
  // ];

  const defaultLocks = [
    TileColours.YELLOW, TileColours.YELLOW, TileColours.YELLOW, TileColours.YELLOW
  ];

  const [tiles, setTiles] = useState<TileColour[]>(defaultBoard);
  const [locks, setLocks] = useState<TileColour[]>(defaultLocks);

  const handlTileClick = (pos: number) => {
    const newTiles = calculateTileChange(pos, tiles);
    setTiles(newTiles);
  }

  const handleLockClick = (pos: number) => {
    console.log('handlelockclick', pos);
  }

  return (
    <StyledTileBoardContainer>
      {locks.map(function(lockColour, index){
        return <LockToggle colour={lockColour} pos={index} key={index} onLockClick={handleLockClick}></LockToggle>;
      })}

      <div className="styled-tile-board__inner">
        <svg viewBox="0 0 104 104" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 92,2 102,12 102,92 92,102 12,102 2,92 2,12" />
        </svg>
        <StyledTileBoard>
          {tiles.map(function(tileColour, index){
            return <Tile colour={tileColour} pos={index} key={index} onTileClick={handlTileClick}></Tile>;
          })}
        </StyledTileBoard>
      </div>

    </StyledTileBoardContainer>
  );
}