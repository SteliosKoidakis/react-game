import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '@material-ui/core';

import './ModalComponent.scss';

const className = 'ModalComponent';

const ModalComponent = ({
  onClickActionButton = () => ({}),
  text = '',
  isOpen = false,
  title = '',
}) => (
  <Modal
    open={isOpen}
    aria-labelledby={title}
    className={className}
    data-testid="modal"
  >
    <div
        className={`${className}__modal-content`}
      >
      <h2
        data-testid="modal-title"
      >
        {title}
      </h2>
      <p
        data-testid="modal-text"
      >
        {text}
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={onClickActionButton}
        data-testid="modal-button"
      >
        New game!
      </Button>
    </div>
  </Modal>
);

ModalComponent.propTypes = {
  onClickActionButton: PropTypes.func,
  text: PropTypes.string,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
};

export default memo(ModalComponent);
