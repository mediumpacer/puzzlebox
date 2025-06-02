
import './App.css';
import TileBoard from './components/TileBoard';
import Explainers from './components/Explainers';


import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  h1 {
    visibility: hidden;
    font-size: 0;
    text-indent: -999rem;
  }
`;

function App() {


  return (
    <>
      <AppContainer>
        <h1>Puzzle Box</h1>
        <TileBoard />
        <Explainers />
      </AppContainer>
    </>
  )
}

export default App
