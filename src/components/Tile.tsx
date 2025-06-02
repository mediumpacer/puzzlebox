import styled from 'styled-components';
import type { TileColour } from '../types/tiles';

const StyledTile = styled.button<{ $colour?: TileColour}>`
  aspect-ratio: 1;
  background: none;
  border: none;
  cursor: pointer;
  height: 100%;
  position: relative;
  width: 100%;
  padding: 0;

  svg {
    fill: ${props => props.$colour ? `var(--color-tile-${props.$colour})` : 'transparent'};
    stroke-width: 0.4rem;
    stroke-linecap: round;
    stroke: var(--color-tile-border);
    filter: drop-shadow(0.4rem 0.4rem rgba(0,0,0, 0.2));
    transition: filter 0.15s ease-in-out, transform 0.15s ease-in-out, fill 0.1s ease-in-out;
  }

  &:hover {
    svg {
      filter: brightness(1.1) drop-shadow(0.4rem 0.4rem rgba(0,0,0, 0.2));
    }
  }

  &:active {
    svg {
      filter: brightness(0.9);
      transform: translate(0.2rem, 0.2rem);
    }
  }
`;

export default function Tile({colour, pos, onTileClick}) {
  let points;

  if (pos === 0) {
    points = "26,2 102,2 102,102 2,102 2,26";
  } else if (pos === 2) {
    points = "78,2 102,26 102,102 2,102 2,2";
  } else if (pos === 6) {
    points = "102,2 102,102 26,102 2,78 2,2";
  } else if (pos === 8) {
    points = "102,2 102,78 78,102 2,102 2,2";
  } else {
    points = "2,2 102,2 102,102 2,102 2,2";
  }

  return (
    <StyledTile $colour={colour} onClick={() => onTileClick(pos)}>
      <svg viewBox="0 0 104 104" xmlns="http://www.w3.org/2000/svg">
        <polygon points={points} />
      </svg>
    </StyledTile>
  );
}

