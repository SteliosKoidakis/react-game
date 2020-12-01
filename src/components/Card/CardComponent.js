import React from 'react';
import { Card, CardMedia } from '@material-ui/core';
import PropTypes from 'prop-types';

const CardComponent = ({ title = '', imageUrl = '' }) => (
  <Card>
    {title}
    <CardMedia
      image={imageUrl}
      title={title}
    />
  </Card>
);

CardComponent.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default CardComponent;
