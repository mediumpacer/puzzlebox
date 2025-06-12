import TileBoard from './TileBoard';
import { type TileColour, TileColours } from '../types/tiles';
import { gameData } from '../data/gameData.ts';
import styled from 'styled-components';

const SelectorTile = styled.button<{ $colour?: TileColour, $isActive?: boolean }>`
  background: ${props => props.$colour ? `var(--color-tile-${props.$colour})` : 'transparent'};
  border: 0.2rem solid var(--color-tile-border);
  outline:  ${props => props.$isActive ? ` 0.4rem solid var(--color-tile-border-active)` : ` 0.4rem solid var(--color-tile-border-inactive)`};;
  width: 3rem;
  height: 3rem;
  border-radius: 0.4rem;
  flex-shrink: 0;
  cursor: pointer;
`;

const StyledGameSelector = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.6rem;
  background: var(--color-card-bg);
  border-radius: 0.8rem;
  filter: drop-shadow(0.6rem 0.6rem rgba(0,0,0, 0.2));
  z-index: 50;

  .game-selector__tiles {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (min-width: 768px) {
      flex-direction: row;

  }
`;

export default function GameSelector({games, currentGameId, onSelectClick}) {
  return (
    <StyledGameSelector>
      <p>Select a game:</p>
      <div className="game-selector__tiles">
        {games.map(function(game, index) {
          return <SelectorTile $colour={game.iconColour} id={game.id} $isActive={game.id === currentGameId} key={index} onClick={() => onSelectClick(game.id)}></SelectorTile>;
        })}
      </div>
    </StyledGameSelector>
  );
}

