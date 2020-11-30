import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Given component App', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });
  // TODO: remove test configuration examples
  it('Then it should be defined', () => {
    expect(component).toBeDefined();
  });
  it('Then it should match snapshot output', () => {
    expect(component.debug()).toMatchSnapshot();
  });
});
