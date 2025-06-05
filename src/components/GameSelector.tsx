import TileBoard from './TileBoard';
import { type TileColour, TileColours } from '../types/tiles';
import { gameData } from '../data/gameData.ts';
import styled from 'styled-components';


const SelectorTile = styled.button<{ $colour?: TileColour }>`
  background: ${props => props.$colour ? `var(--color-tile-${props.$colour})` : 'transparent'};
  width: 3rem;
  height: 3rem;
  border: 0.2rem solid var(--color-tile-border);
  border-radius: 0.4rem;
  flex-shrink: 0;
  cursor: pointer;
`;

const StyledGameSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function GameSelector({games, onSelectClick}) {
  return (
    <StyledGameSelector>
      <p>Select a game:</p>
    {games.map(function(game, index) {
      return <SelectorTile $colour={game.iconColour} id={game.id} key={index} onClick={() => onSelectClick(game.id)}></SelectorTile>;
    })}
    </StyledGameSelector>
  );
}

