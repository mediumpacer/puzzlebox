
import './App.css'
import TileBoard from './components/TileBoard'

function App() {


  return (
    <>
      <TileBoard />

      <ul>
        <li>Grey — Tile acts as an empty space and has no function.</li>
        <li>Black — Moves all of the tiles in the row one to the right.</li>
        <li>Red — Turns all white tiles black and all black tiles red.</li>
        <li>Green — Tile swaps positions with a tile in the opposite position.</li>
        <li>Yellow — Tile moves up one position.</li>
        <li>Pink — Rotates every surrounding tile in a clockwise direction.</li>
        <li>Purple — Tile moves down one position.</li>
        <li>Orange — Tile changes colors to match the majority of its adjacent tiles. If there adjacent tiles are evenly split, the tile will not change colours.</li>
        <li>White — Tile expands outwards if there are any adjacent grey tiles. The white tile will turn grey.</li>
        <li>Blue — Tile will copy the ability of the tile in the middle of the 3x3 grid.</li>
      </ul>
    </>
  )
}

export default App
