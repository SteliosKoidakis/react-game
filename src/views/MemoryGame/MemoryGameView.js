import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHttp } from 'src/hooks';
import { CardComponent } from 'src/components';
import { sortRandomItems, shuffle, generateCards } from 'src/utils';

const MemoryGameView = ({ url, cardNumbers }) => {
  const [cards, setCards] = useState([]);
  // const [flippedCards, setFlippedCard] = useState([]);
  const [contributors, isLoading] = useHttp(url);

  useEffect(() => {
    const sortedContributorsList = sortRandomItems(contributors, cardNumbers);
    const generatedCards = generateCards(sortedContributorsList);
    const shuffledCards = shuffle(generatedCards);

    setCards(shuffledCards);
  }, [contributors]);

  return (
    <section>
      {!isLoading && cards.map(({ uuid, name, avatarUrl }) => (
        <CardComponent
          key={uuid}
          title={name}
          imageUrl={avatarUrl}
        />
      ))}
    </section>
  );
};

MemoryGameView.propTypes = {
  url: PropTypes.string,
  cardNumbers: PropTypes.number,
};

export default MemoryGameView;
