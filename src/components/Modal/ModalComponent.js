import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '@material-ui/core';
import './ModalComponent.scss';

const ModalComponent = ({
  onClickActionButton,
  score = 0,
  isOpen = false,
  title = false,
}) => (
  <Modal
    open={isOpen}
    aria-labelledby={title}
    className="ModalComponent"
  >
    <div className="ModalComponent__modal-content">
      <h2> {title}</h2>
      <p>Score: {score}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={onClickActionButton}
      >
        New game!
      </Button>
    </div>
  </Modal>
);

ModalComponent.propTypes = {
  onClickActionButton: PropTypes.func,
  score: PropTypes.number,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
};

export default ModalComponent;
