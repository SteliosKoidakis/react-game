import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, Fade } from '@material-ui/core';
import './CardComponent.scss';

const CardComponent = ({
  title = '',
  imageUrl = '',
  isFlipped = false, // eslint-disable-line
  isMatched = false,
  onClickCard,
}) => {
  if (isMatched) {
    return <div className='CardComponent__media'></div>;
  }

  return (
    <Card
      onClick={isMatched ? null : onClickCard}
      variant="outlined"
    >
      <Fade in={isFlipped}>
        <CardMedia
          image={imageUrl}
          title={title}
           className='CardComponent__media'
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
