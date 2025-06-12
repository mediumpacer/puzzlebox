
import styled from 'styled-components';
import { TileColours, type TileColour } from '../types/tiles';

const ExplainerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }

`;

const ExplainerColumn = styled.div`
  background: var(--color-card-bg);
  border-radius: 1.6rem;
  padding: 2rem;

  h2 {
    text-align: center;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    gap: 1rem;
    margin: 1.6rem 0;
    align-items: center;
  }
`;

const ExplainerTile = styled.div<{ $colour?: TileColour }>`
  background: ${props => props.$colour ? `var(--color-tile-${props.$colour})` : 'transparent'};
  width: 3rem;
  height: 3rem;
  border: 0.2rem solid var(--color-tile-border);
  border-radius: 0.4rem;
  flex-shrink: 0;
`;

export default function Explainers() {
  return (
    <ExplainerContainer>

      <ExplainerColumn>
        <h2>How to play:</h2>
        <ul>
          <li>Change the corner tiles colours to match the 'lock' colours indicated that are outside that position.</li>
          <li>Once a corner tile matches the lock colour, click the lock to unlock it.</li>
          <li>If all four locks are unlocks the box opens and the puzzle is solved.</li>
          <li>Clicking a lock that doesn't match the corner tile colour will reset the puzzle.</li>
        </ul>
      </ExplainerColumn>

      <ExplainerColumn>
        <h2>Tile functions by colour:</h2>
      <ul>
        <li><ExplainerTile $colour={TileColours.GREY} /><span><strong>Grey</strong> — Tile acts as an empty space and has no function.</span></li>
        <li><ExplainerTile $colour={TileColours.BLACK} /><span><strong>Black</strong> — Moves all of the tiles in the row one to the right.</span></li>
        <li><ExplainerTile $colour={TileColours.RED} /><span><strong>Red</strong> — Turns all white tiles black and all black tiles red.</span></li>
        <li><ExplainerTile $colour={TileColours.GREEN} /><span><strong>Green</strong> — Tile swaps positions with a tile in the opposite position.</span></li>
        <li><ExplainerTile $colour={TileColours.YELLOW} /><span><strong>Yellow</strong> — Tile moves up one position.</span></li>
        <li><ExplainerTile $colour={TileColours.PINK} /><span><strong>Pink</strong> — Rotates every surrounding tile in a clockwise direction.</span></li>
        <li><ExplainerTile $colour={TileColours.PURPLE} /><span><strong>Purple</strong> — Tile moves down one position.</span></li>
        <li><ExplainerTile $colour={TileColours.ORANGE} /><span><strong>Orange</strong> — Tile changes colors to match the majority of its adjacent tiles. If adjacent tiles are evenly split, the tile will not change colours.</span></li>
        <li><ExplainerTile $colour={TileColours.WHITE} /><span><strong>White</strong> — Tile expands outwards if there are any adjacent grey tiles. The white tile will turn grey.</span></li>
        <li><ExplainerTile $colour={TileColours.BLUE} /><span><strong>Blue</strong> — Tile will copy the ability of the tile in the middle of the 3x3 grid.</span></li>
      </ul>
      </ExplainerColumn>

    </ExplainerContainer>
  );
}
