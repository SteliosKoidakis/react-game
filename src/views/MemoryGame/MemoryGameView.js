import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Grid } from '@material-ui/core';

import { useHttp } from 'src/hooks';
import { CardComponent, ModalComponent } from 'src/components';
import {
  isMatch,
  sortRandomItems,
  shuffle,
  generateCards,
} from 'src/utils';
import {
  CARD_NUMBER,
  CARD_POINTS,
  DELAY,
  TIME_LIMIT,
} from 'src/constants';

import './MemoryGameView.scss';

const className = 'MemoryGameView';

const MemoryGameView = ({
  url = '',
  cardNumber = CARD_NUMBER,
  cardPoints = CARD_POINTS,
  delay = DELAY,
  timeLimit = TIME_LIMIT,
}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCard] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [counter, setCounter] = useState(null);
  const [contributors, isLoading] = useHttp(url);

  const score = (matchedCards.length / 2) * cardPoints;
  const isWin = matchedCards.length / 2 === cardNumber;
  const isLost = counter === 0;

  useEffect(() => {
    const timer = counter && !isWin > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    setFlippedCard([]);
    const sortedContributorsList = sortRandomItems(contributors, cardNumber);
    const generatedCards = generateCards(sortedContributorsList);
    const shuffledCards = shuffle(generatedCards);

    setCards(shuffledCards);
  }, [contributors, isWin, isLost]);

  const onFlippSecondCard = (uuid) => {
    if (flippedCards.length !== 1) return;

    setFlippedCard([flippedCards[0], uuid]);

    if (isMatch(uuid, cards, flippedCards)) {
      setTimeout(() => setMatchedCards([...matchedCards, flippedCards[0], uuid]), delay);
    }
    setTimeout(() => setFlippedCard([]), delay);
  };

  const onClickCard = useCallback((uuid) => {
    if (!uuid || flippedCards.includes(uuid)) return;
    setDisabled(true);

    if (flippedCards.length === 0) {
      setFlippedCard([uuid]);
      setDisabled(false);
      return;
    }
    onFlippSecondCard(uuid);
    setDisabled(false);
  }, [flippedCards]);

  const restartGame = () => {
    setFlippedCard([]);
    setMatchedCards([]);
    setCounter(timeLimit);
    setDisabled(false);
  };

  return (
    <main
      className={className}
      data-testid="memoryGameView"
    >
      <Container component="section">
        <Grid
          container
          spacing={3}
          className={
            `${className}__cards-wrapper 
            ${isDisabled
              ? `${className}__cards-wrapper--disabled`
              : null
            }`}
        >
          {!isLoading && cards.map(({
            uuid, name, avatarUrl,
          }) => (
            <Grid item xs={4} sm={3} key={uuid}>
              <CardComponent
                title={name}
                imageUrl={avatarUrl}
                uuid={uuid}
                isFlipped={flippedCards.includes(uuid)}
                isMatched={matchedCards.includes(uuid)}
                onClickCard={onClickCard}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <footer
        className={`${className}__footer`}
      >
        <p data-testid="counter">
          Time: {counter || timeLimit} {counter < 10 ? 'second' : 'seconds'}
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={restartGame}
        >
          Start Game
        </Button>
        <p data-testid="score">Score: {score || '0'}</p>
      </footer>
      <ModalComponent
        title={isWin ? 'YOU WON!' : 'GAME OVER' }
        text={`Score: ${score}`}
        isOpen={isWin || isLost}
        onClickActionButton={ () => restartGame()}
      />
    </main>
  );
};

MemoryGameView.propTypes = {
  url: PropTypes.string.isRequired,
  cardNumber: PropTypes.number.isRequired,
  cardPoints: PropTypes.number.isRequired,
  timeLimit: PropTypes.number.isRequired,
  delay: PropTypes.number,
};

export default MemoryGameView;
