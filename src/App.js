import React from 'react';
import { MemoryGameView } from 'src/views';
import { API_URL, CARD_NUMBERS } from 'src/constants';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Github Memory
        </p>
      </header>
      <main>
        <MemoryGameView
          url={API_URL}
          cardNumbers={CARD_NUMBERS}
        />
      </main>
    </div>
  );
}

export default App;
