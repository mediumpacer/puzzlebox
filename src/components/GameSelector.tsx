import TileBoard from './TileBoard';
import { type TileColour, TileColours } from '../types/tiles';
import { gameData } from '../data/gameData.ts';
import styled from 'styled-components';


const SelectorTile = styled.button<{ $colour?: TileColour, $isActive?: boolean }>`
  background: ${props => props.$colour ? `var(--color-tile-${props.$colour})` : 'transparent'};
  /* border:  ${props => props.$isActive ? ` 0.2rem solid gold` : ` 0.2rem solid var(--color-tile-border)`};; */

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
  align-items: center;
  gap: 1rem;
  padding: 1.6rem;
  background: var(--color-card-bg);
  border-radius: 0.8rem;
`;

export default function GameSelector({games, currentGameId, onSelectClick}) {
  return (
    <StyledGameSelector>
      <p>Select a game:</p>
    {games.map(function(game, index) {
      return <SelectorTile $colour={game.iconColour} id={game.id} $isActive={game.id === currentGameId} key={index} onClick={() => onSelectClick(game.id)}></SelectorTile>;
    })}
    </StyledGameSelector>
  );
}

