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
const MemoryGameView = ({ url, cardNumbers }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCard] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [isWin, setWon] = useState(false);
  const [isLoose, setLoose] = useState(false);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(60);
  const [contributors, isLoading] = useHttp(url);

  useEffect(() => {
    if (counter === 0 && !isWin) {
      setLoose(true);
      setDisabled(true);
    }
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (score === cardNumbers * 100) {
      setWon(true);
      setDisabled(true);
      setCounter(0);
    }
  }, [score]);

  useEffect(() => {
    const sortedContributorsList = sortRandomItems(contributors, cardNumbers);
    const generatedCards = generateCards(sortedContributorsList);
    const shuffledCards = shuffle(generatedCards);

    setCards(shuffledCards);
  }, [contributors]);

  const onFlippSecondCard = (uuid) => {
    if (flippedCards.length !== 1) return;

    setFlippedCard([flippedCards[0], uuid]);

    if (isMatch(uuid, cards, flippedCards)) {
      setScore(score + 100);
      setTimeout(() => setMatchedCards([...matchedCards, flippedCards[0], uuid]), 500);
    }
    setTimeout(() => setFlippedCard([]), 1000);
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
    setCounter(60);
    setLoose(false);
    setScore(0);
    setWon(false);
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
        isOpen={isWin || isLoose}
        onClickActionButton={ () => restartGame()}
      />
    </Grid>
  );
};

MemoryGameView.propTypes = {
  url: PropTypes.string,
  cardNumbers: PropTypes.number,
};

export default MemoryGameView;
