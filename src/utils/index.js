const isEmptyFalsyArray = (array) => !Array.isArray(array) || !array.length;

const shuffle = (arrayItems) => {
  if (isEmptyFalsyArray(arrayItems)) return [];

  const newArray = [...arrayItems];
  let currentIndex = newArray.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};

const generateCards = (arrayItems) => {
  if (isEmptyFalsyArray(arrayItems)) return [];

  let uuid = 0;

  const cardsItems = arrayItems.reduce((previous, { id, login, avatar_url: avatarUrl }) => {
    previous.push(
      {
        uuid: uuid += 1,
        name: login,
        avatarUrl,
        id,
      },
      {
        uuid: uuid += 1,
        name: login,
        avatarUrl,
        id,
      },
    );
    return previous;
  }, []);

  return cardsItems;
};

const sortRandomItems = (arrayItems, limit) => {
  if (isEmptyFalsyArray(arrayItems)) return [];

  return arrayItems.sort(() => Math.random() - Math.random())
    .slice(0, limit);
};

export {
  generateCards,
  isEmptyFalsyArray,
  shuffle,
  sortRandomItems,

};
