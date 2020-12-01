import { shuffle, generateCards, isEmptyFalsyArray } from './index';

describe('Given utilities functions', () => {
  describe('Given shuffle function', () => {
    describe('When is called with an empty array or another type of param', () => {
      it('Then it should return an empty array', () => {
        let result = shuffle([]);
        expect(result).toStrictEqual([]);
        result = shuffle({});
        expect(result).toStrictEqual([]);
      });
    });
    describe('When is called with a none empty array', () => {
      it('Then it should not return the same array', () => {
        const result = shuffle([1, 2, 3, 4]);
        expect(result).not.toStrictEqual([1, 2, 3, 4]);
      });
    });
  });
  describe('Given generateCard function', () => {
    describe('When a falsy or an empty array is passed', () => {
      it('Then it should return an empty array', () => {
        let result = generateCards([]);
        expect(result).toStrictEqual([]);
        result = generateCards({});
        expect(result).toStrictEqual([]);
      });
    });
    describe('When an array with items is passed', () => {
      it.skip('Then it should return a new array with id and name properties', () => {
      });
      it.skip('And the id of any item should be unique', () => {
      });
    });
  });
  describe('Given isEmptyFalsyArray function', () => {
    describe('When is called with an empty array', () => {
      it('Then it should return false', () => {
        expect(isEmptyFalsyArray([])).toBeTruthy();
      });
    });
    describe('When is called with a none array type', () => {
      it('Then it should return false', () => {
        expect(isEmptyFalsyArray({})).toBeTruthy();
      });
    });
    describe('When is called with a none empty array', () => {
      it('Then it should return true', () => {
        expect(isEmptyFalsyArray([1])).toBeFalsy();
      });
    });
  });
  describe('Given sortRandomItems', () => {
    describe('When is called', () => {
      it.skip('Then it should return a sorted array randomly', () => {
      });
    });
    describe('When is called with an empty array or another type of param', () => {
      it.skip('Then it should return an empty array', () => {
      });
    });
  });
});
