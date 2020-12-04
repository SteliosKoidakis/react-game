import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import { useHttp } from 'src/hooks';
import MemoryGameView from './MemoryGameView';

jest.mock('src/hooks');

const url = 'url';

const mockUserHttpResponse = [
  {
    login: 'test0',
    avatar_url: 'test0',
  },
  {
    login: 'test1',
    avatar_url: 'test0',
  },
  {
    login: 'test2',
    avatar_url: 'test2',
  },
  {
    login: 'test3',
    avatar_url: 'test3',
  },
  {
    login: 'test4',
    avatar_url: 'test4',
  },
  {
    login: 'test5',
    avatar_url: 'test5',
  },
  {
    login: 'test6',
    avatar_url: 'test6',
  },
];

describe('Given component MemoryGameView', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });
  describe('When is been called', () => {
    it('Then it should trigger useHttp hook with url parameter', () => {
      useHttp.mockReturnValue([[], false]);
      render(<MemoryGameView url={url} />);

      expect(useHttp).toHaveBeenCalledWith(url);
    });
  });
  describe('And when useHttp return an array with items', () => {
    it('Then it should render cardNumbers * 2 Cards components', async () => {
      useHttp.mockReturnValue([mockUserHttpResponse, false]);
      const { findAllByTestId } = render(<MemoryGameView cardNumbers={6} url={url} />);

      expect(await findAllByTestId('card')).toHaveLength(12);
    });
  });
  describe('When isLoading property is true from useHttp hook', () => {
    it('Then it should not render any card component', async () => {
      useHttp.mockReturnValue([mockUserHttpResponse, true]);
      const { queryByTestId } = render(<MemoryGameView cardNumbers={6} url={url} />);

      expect(await queryByTestId('card')).not.toBeInTheDocument();
    });
  });
  describe('When click on Start game button', () => {
    it('Then timer should be 60 and score 0', async () => {
      useHttp.mockReturnValue([mockUserHttpResponse, false]);
      const { getByTestId, getByText } = render(<MemoryGameView cardNumbers={6} url={url} />);
      fireEvent.click(getByText('Start Game'));

      expect(getByTestId('counter')).toHaveTextContent('60');
      expect(getByTestId('score')).toHaveTextContent('Score: 0');
    });
  });
  describe('When there is not any click on cards', () => {
    it('Then should not render any card media content', async () => {
      useHttp.mockReturnValue([mockUserHttpResponse, false]);
      const { queryAllByTestId } = render(
        <MemoryGameView cardNumbers={6} url={url} />,
      );

      expect(await queryAllByTestId('card-media--flipped').length).toBe(0);
    });
  });
  describe('Given game is started', () => {
    describe('When a card is clicked', () => {
      it('Then should render a card media content', async () => {
        useHttp.mockReturnValue([mockUserHttpResponse, false]);
        const { queryAllByTestId, getByText } = render(
          <MemoryGameView cardNumbers={6} url={url}/>,
        );
        const node = await queryAllByTestId('card');

        fireEvent.click(getByText('Start Game'));
        fireEvent.click(node[0]);

        expect(await queryAllByTestId('card-media--flipped').length).toBe(1);
      });
    });
    describe('When 2 same cards are clicked', () => {
      it('Then should add 100 points when there is a match and card--matched element should exist 2 times', async () => {
        jest.useFakeTimers();
        useHttp.mockReturnValue([mockUserHttpResponse, false]);
        const {
          queryAllByTestId,
          getByText,
          getAllByTitle,
        } = render(
          <MemoryGameView cardNumbers={6} url={url} delay={0}/>,
        );
        const node = await queryAllByTestId('card-media');
        const sameCards = getAllByTitle(node[0].title);
        fireEvent.click(getByText('Start Game'));

        fireEvent.click(sameCards[0].closest('.CardComponent'));
        fireEvent.click(sameCards[1].closest('.CardComponent'));

        waitFor(() => {
          jest.advanceTimersByTime(1000);
          expect(getByText('Score: 100')).toBeInTheDocument();
          expect(queryAllByTestId('card--matched')).toHaveLength(2);
        });
      });
    });
  });
});
