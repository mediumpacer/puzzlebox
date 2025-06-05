import TileBoard from './TileBoard';
import GameSelector from './GameSelector';
import { useState } from 'react';

import { type PuzzleGame } from '../types/game';
import { gameData } from '../data/gameData.ts';

export default function PuzzleBox() {

  const [currentGame, setCurrentGame] = useState<PuzzleGame>(gameData[0]);

  const handleSelectClick = (gameId: string) => {
    const newGame = gameData.find(game => game.id === gameId);
    if(newGame) {
      setCurrentGame(newGame);
    };
  }

  return (
    <>
    <GameSelector games={gameData} onSelectClick={handleSelectClick}/>
    <TileBoard game={currentGame} />
    </>
  );
}

