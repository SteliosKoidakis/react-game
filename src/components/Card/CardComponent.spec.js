import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CardComponent from './CardComponent';

describe('Given component CardComponent', () => {
  describe('When isMatched property is true', () => {
    it('Then it should render card--matched element', async () => {
      const { getByTestId } = render(
        <CardComponent isMatched={true} imageUrl="test"/>,
      );

      expect(getByTestId('card--matched')).toBeInTheDocument();
    });
  });
  describe('When isFlipped property is true', () => {
    it('Then it should render card--matched element', async () => {
      const { getByTestId } = render(
        <CardComponent isFlipped={true} imageUrl ="test"/>,
      );

      expect(getByTestId('card-media--flipped')).toBeInTheDocument();
    });
  });
  describe('When isMatched is false and isFlipped is false', () => {
    it('Then it should render card-media element', async () => {
      const { queryByTestId } = render(
        <CardComponent
          isFlipped={false}
          isMatched={false}
          imageUrl="test"
        />,
      );

      expect(queryByTestId('card-media')).toBeInTheDocument();
    });
  });
  describe('When isMatched is false and trigger click in the component', () => {
    it('Then it should trigger onClickCard function', async () => {
      const onClickCard = jest.fn();
      const { queryByTestId } = render(
        <CardComponent
          isMatched={false}
          imageUrl="test"
          isDisabled={false}
          onClickCard={onClickCard}
        />,
      );
      fireEvent.click(queryByTestId('card'));

      expect(onClickCard).toHaveBeenCalled();
    });
  });
});
