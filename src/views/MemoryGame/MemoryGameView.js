import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHttp } from 'src/hooks';
import { CardComponent, ModalComponent } from 'src/components';
import { Grid } from '@material-ui/core';
import {
  isMatch, sortRandomItems, shuffle, generateCards,
} from 'src/utils';

import './MemoryGameView.scss';

// TODO: think about match number to be a constant
const MemoryGameView = ({
  url,
  cardNumbers,
  cardPoints,
  delay,
  timeLimit,
}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCard] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(timeLimit);
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

  const onClickCard = (uuid) => {
    if (!uuid || flippedCards.includes(uuid)) return;

    setDisabled(true);

    if (flippedCards.length === 0) {
      setFlippedCard([uuid]);
      setDisabled(false);
      return;
    }
    onFlippSecondCard(uuid);
    setDisabled(false);
  };

  const restartGame = () => {
    setCounter(timeLimit);
    setFlippedCard([]);
    setMatchedCards([]);
    setDisabled(false);
  };

  return (
    <Grid
      container
      spacing={3}
      className="MemoryGameView"
    >
      {!isLoading && cards.map(({
        uuid, name, avatarUrl,
      }) => (
        <Grid item xs={4} sm={3} key={uuid}>
          <CardComponent
            title={name}
            imageUrl={avatarUrl}
            isFlipped={flippedCards.includes(uuid)}
            isMatched={matchedCards.includes(uuid)}
            onClickCard={() => !isDisabled && onClickCard(uuid)}
          />
        </Grid>
      ))}
      score: {score}
      counter: {counter}
      <ModalComponent
        title={isWin ? 'YOU WON!' : 'GAME OVER' }
        score={score}
        isOpen={isWin || isLost}
        onClickActionButton={ () => restartGame()}
      />
    </Grid>
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
