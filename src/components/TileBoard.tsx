import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Tile from './Tile';
import LockToggle from './LockToggle';
import { type TileColour } from '../types/tiles';
import { calculateTileChange } from '../helpers/tileHelpers.ts'

const StyledTileBoardContainer = styled.div`
padding: clamp(3rem, 6vw, 8rem);
  width: clamp(32rem, 50vw, 64rem);
  position: relative;

  .styled-tile-board__inner {
    /* padding: clamp(2rem, 3vw, 4rem); */
    position: relative;

    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      & > svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
        fill: var(--color-board-bg);
        stroke: var(--color-tile-border);
        stroke-width: 0.2rem;
        filter: drop-shadow(0.6rem 0.6rem rgba(0,0,0, 0.2));
      }

      &__top {
        z-index: 20;
      }

      &__bottom {
        z-index: 10;

        svg {
          fill: #222;
        }
      }
    }
  }

  .styled-tile-board__anim {
    position: relative;
    z-index: 20;
    padding: clamp(2rem, 3vw, 4rem);
    transition: transform 1.4s ease-in-out;
  }

  &.unlocked {
    .styled-tile-board__anim {
      transform: translate(-5rem, -5rem) rotate(-10deg);
    }
  }
`;

const StyledTileBoard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 3vw, 3rem);
  margin: auto;
  z-index: 30;
`;

export default function TileBoard({game}) {
  const [tiles, setTiles] = useState<TileColour[]>([game.tiles]);
  const [locks, setLocks] = useState<boolean[]>([false, false, false, false]);
  const [boardUnlocked, setBoardUnlocked] = useState(false);

  const handleTileClick = (pos: number) => {
    if (boardUnlocked) return;
    const newTiles = calculateTileChange(pos, tiles);
    setTiles(newTiles);
  };

  const checkLockState = (pos) => {
    const lockTileRef = [0, 2, 6, 8];
    return (game.locks[pos] === tiles[lockTileRef[pos]]);
  };

  const handleLockClick = (pos: number) => {
    if (boardUnlocked) return;
    let newLocks = locks.slice();
    if (checkLockState(pos)) {
      newLocks[pos] = true;
    } else {
      newLocks = [false, false, false, false];
      resetTiles();
    }
    setLocks(newLocks);
  };

  // Check if all locks are unlocked and then if so open the board / win
  const checkAllUnlocked = () => {
    const isAllUnlocked = locks.every(lock => lock === true);
    if (isAllUnlocked) setBoardUnlocked(true);
  };

  // If a lock is unlocked and the user changes the tiles,
  // set it back to locked if its no longer the correct colour
  const checkUnlockedLocks = () => {
    const newLocks = locks.slice();
    locks.forEach((lock, index) => {
      if (!checkLockState(index)) {
        newLocks[index] = false;
      }
    });
    setLocks(newLocks);
  };

  const resetTiles = () => {
    setTiles(game.tiles);
  }

  useEffect(() => {
    checkUnlockedLocks();
  }, [tiles]);

  useEffect(() => {
    checkAllUnlocked();
  }, [locks]);


  useEffect(() => {
    setTiles(game.tiles);
    setLocks([false, false, false, false]);
    setBoardUnlocked(false);
  }, [game]);


  return (
    <StyledTileBoardContainer className={`${boardUnlocked ? 'unlocked' : ''}`}>

      <div className="styled-tile-board__inner">
        <div className="styled-tile-board__anim">
          {game.locks.map(function(lock, index){
            return <LockToggle colour={lock} pos={index} key={index} isUnlocked={locks[index]} onLockClick={handleLockClick}></LockToggle>;
          })}
          <div className="box box__top">
            <svg viewBox="0 0 104 104" xmlns="http://www.w3.org/2000/svg">
              <polygon points="12,2 92,2 102,12 102,92 92,102 12,102 2,92 2,12" />
            </svg>
          </div>

          <StyledTileBoard className="styled-tile-board__board">
            {tiles.map(function(tileColour, index){
              return <Tile colour={tileColour} pos={index} key={index} onTileClick={handleTileClick}></Tile>;
            })}
          </StyledTileBoard>
        </div>
        <div className="box box__bottom">
          <svg viewBox="0 0 104 104" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,2 92,2 102,12 102,92 92,102 12,102 2,92 2,12" />
          </svg>
        </div>
      </div>

    </StyledTileBoardContainer>
  );
}