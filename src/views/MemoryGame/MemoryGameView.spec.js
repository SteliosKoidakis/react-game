import React from 'react';
import { shallow } from 'enzyme';
import MemoryGameView from './MemoryGameView';

const url = 'url';

describe('Given component MemoryGameView', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MemoryGameView url={url}/>);
  });
  describe('When is been called', () => {
    it('Then it should trigger createCardItems with the return value of useHttp hook', () => {

    });

    // TODO: calculate it from constants
    it('Then it should render 12 Card components', () => {

    });
  });
});
