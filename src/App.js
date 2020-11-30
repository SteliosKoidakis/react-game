import React from 'react';
import { MemoryGameView } from 'views';
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
        <MemoryGameView />
      </main>
    </div>
  );
}

export default App;
