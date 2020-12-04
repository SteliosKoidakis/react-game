import {
  shuffle,
  generateCards,
  isEmptyFalsyArray,
  isMatch,
  sortRandomItems,
} from './index';

const mockedArrayItems = [
  {
    login: 'login1',
    avatar_url: 'avatar_url1',
    id: 123,
  },
  {
    login: 'login2',
    avatar_url: 'avatar_url2',
    id: 43,
  },
];

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
      it('Then it should return a new array with id, avatarUrl, uuid and name properties', () => {
        const result = generateCards(mockedArrayItems);
        expect(result.some((item) => !item.name
          || !item.avatarUrl
          || !item.id
          || !item.uuid)).toBeFalsy();
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
  describe('Given sortRandomItems function', () => {
    describe('When is called with arrayItems and a limit', () => {
      it('Then it should return a sorted array randomly with the correct limit', () => {
        const array = [1, 2, 3];
        const result = sortRandomItems(array, 2);

        expect(result).not.toStrictEqual(array);
        expect(result).toHaveLength(2);
      });
    });
    describe('When is called with an empty array or another type of param', () => {
      it('Then it should return an empty array', () => {
        let result = sortRandomItems([]);
        expect(result).toStrictEqual([]);
        result = sortRandomItems(null);
        expect(result).toStrictEqual([]);
      });
    });
  });
  describe('Given isMatch function', () => {
    const cards = [
      {
        uuid: 1,
        name: 'test1',
      },
      {
        uuid: 2,
        name: 'test2',
      },
    ];
    const flippedCards = [1];
    describe('When is called with uuid same with the one from the flippedCards', () => {
      it('Then it should return true', () => {
        const result = isMatch(1, cards, flippedCards);

        expect(result).toBeTruthy();
      });
    });
    describe('When is called with an unexpected parameter', () => {
      it('Then it should return false', () => {
        const result = isMatch(1, [], {});

        expect(result).toBeFalsy();
      });
    });
  });
});
