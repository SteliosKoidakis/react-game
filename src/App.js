import React from 'react';
import { Container } from '@material-ui/core';

import { MemoryGameView } from 'src/views';
import {
  API_URL,
  CARD_NUMBER,
  CARD_POINTS,
  DELAY,
  TIME_LIMIT,
} from 'src/constants';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Container
        component="header"
        className="App__header"
      >
        <h1>
          Github Memory
        </h1>
      </Container>
      <MemoryGameView
        url={API_URL}
        cardNumber={CARD_NUMBER}
        cardPoints={CARD_POINTS}
        timeLimit={TIME_LIMIT}
        delay={DELAY}
      />
    </div>
  );
}

export default App;
