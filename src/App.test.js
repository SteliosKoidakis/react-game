import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('Given App component', () => {
  describe('When has been called', () => {
    it('Then it should render MemoryGameView component', () => {
      const { getByTestId } = render(<App />);

      expect(getByTestId('memoryGameView')).toBeInTheDocument();
    });
  });
});
