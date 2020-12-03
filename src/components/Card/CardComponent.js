import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, Fade } from '@material-ui/core';
import './CardComponent.scss';

const classMediaName = 'CardComponent__media';

const CardComponent = ({
  title = '',
  imageUrl = '',
  isFlipped = false,
  isMatched = false,
  onClickCard,
}) => {
  if (isMatched) {
    return (
      <div
        className={classMediaName}
        data-testid="card--matched"
      />
    );
  }

  return (
    <Card
      onClick={isMatched ? null : onClickCard}
      variant="outlined"
      data-testid="card"
      className="CardComponent"
    >
      <Fade in={isFlipped}>
        <CardMedia
          image={imageUrl}
          title={title}
          className={classMediaName}
          data-testid={`card-media${isFlipped ? '--flipped' : ''}`}
        />
      </Fade>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  isFlipped: PropTypes.bool,
  isMatched: PropTypes.bool,
  onClickCard: PropTypes.func,
};

export default CardComponent;
