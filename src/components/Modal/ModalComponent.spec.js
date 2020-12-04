import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';

import ModalComponent from './ModalComponent';

describe('Given component ModalComponent', () => {
  describe('When isOpen property is true', () => {
    it('Then it should render modal element', () => {
      const { getByTestId } = render(
        <ModalComponent isOpen={true} />,
      );

      expect(getByTestId('modal')).toBeInTheDocument();
    });
  });
  describe('When isOpen property is false', () => {
    it('Then it should not render modal element', () => {
      const { queryByTestId } = render(
        <ModalComponent isOpen={false} />,
      );

      expect(queryByTestId('modal')).not.toBeInTheDocument();
    });
  });
  describe('When text property is passed', () => {
    it('Then it should render the correct text in the modal-text element', () => {
      const { getByTestId } = render(
        <ModalComponent isOpen={true} text="Score: 300"/>,
      );
      const { getByText } = within(getByTestId('modal-text'));
      expect(getByText('Score: 300')).toBeInTheDocument();
    });
  });
  describe('When title property is passed', () => {
    it('Then it should render the correct text in the modal-title element', () => {
      const { getByTestId } = render(
        <ModalComponent isOpen={true} title="title"/>,
      );
      const { getByText } = within(getByTestId('modal-title'));
      expect(getByText('title')).toBeInTheDocument();
    });
  });
  describe('When modal-button element is clicked', () => {
    it('Then it should trigger onClickActionButton function', async () => {
      const onClickActionButton = jest.fn();
      const { queryByTestId } = render(
        <ModalComponent
          isOpen={true}
          onClickActionButton={onClickActionButton}
        />,
      );
      fireEvent.click(queryByTestId('modal-button'));

      expect(onClickActionButton).toHaveBeenCalled();
    });
  });
});
