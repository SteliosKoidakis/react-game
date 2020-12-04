import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHttp } from 'src/hooks';
import { CardComponent, ModalComponent } from 'src/components';
import { Button, Container, Grid } from '@material-ui/core';
import {
  isMatch, sortRandomItems, shuffle, generateCards,
} from 'src/utils';

import './MemoryGameView.scss';

const MemoryGameView = ({
  url,
  cardNumbers = 100,
  cardPoints,
  delay,
  timeLimit,
}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCard] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [counter, setCounter] = useState(null);
  const [contributors, isLoading] = useHttp(url);

  const score = (matchedCards.length / 2) * cardPoints;
  const isWin = score === cardNumbers * cardPoints;
  const isLost = counter === 0;

  useEffect(() => {
    const timer = counter && !isWin > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const sortedContributorsList = sortRandomItems(contributors, cardNumbers);
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
      className="MemoryGameView"
      data-testid="memoryGameView"
    >
      <Container component="section">
        <Grid
          container
          spacing={3}
          className={
            `MemoryGameView__cards-wrapper 
            ${isDisabled
              ? ' MemoryGameView__cards-wrapper--disabled'
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
      <footer className="MemoryGameView__footer">
        <p data-testid="counter">
          Time: {counter || '60'} {counter < 10 ? 'second' : 'seconds'}
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
  url: PropTypes.string,
  cardNumbers: PropTypes.number,
  cardPoints: PropTypes.number,
  timeLimit: PropTypes.number,
  delay: PropTypes.number,
};

export default MemoryGameView;
