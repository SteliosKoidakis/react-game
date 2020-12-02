import React from 'react';
import { Container } from '@material-ui/core';
import { MemoryGameView } from 'src/views';
import {
  API_URL,
  CARD_NUMBERS,
  CARD_POINTS,
  DELAY,
  TIME_LIMIT,
} from 'src/constants';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Container component="header">
        <p>
          Github Memory
        </p>
      </Container>
      <Container component="main">
        <MemoryGameView
          url={API_URL}
          cardNumbers={CARD_NUMBERS}
          cardPoints={CARD_POINTS}
          timeLimit={TIME_LIMIT}
          delay={DELAY}
        />
      </Container>
    </div>
  );
}

export default App;
