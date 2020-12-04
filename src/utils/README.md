# Utilities
A main source of utilities which are been used across the project.

## Usage
```javascript
import {
  isMatch, sortRandomItems, shuffle, generateCards,
} from 'src/utils';

isMatch(uuid, cards, flippedCards);
```


### Utilities

| Name          | Description |
|---------------|----------|
| isMatch         |Return a boolean that define if there is a match of the clicked card  |
| sortRandomItems  | Sort item randomly with a limit         |
| shuffle  | Shuffle cards        |          
| isEmptyFalsyArray  | Check if a item is not an array or an empty one        |          
| generateCards  | Generate cards items to be displayed for the memory game        |          



### isMatch


```javascript
import { isMatch } from 'src/utils'

isMatch(uuid,cards, flippedCards)

// Returns
boolean
```

| Parameters          | Description |
|---------------|----------|
| uuid         | Uuid of clicked card |
| cards  | Cards array that are on the current game         |
| flippedCards  | Array of flipped cards       |        




### sortRandomItems

```javascript
import { sortRandomItems } from 'src/utils';

const sortedContributorsList = sortRandomItems(contributors, cardNumbers);

// Returns
[]
```
| Parameters          | Description |
|---------------|----------|
| arrayItems         | Array of total items |
| limit  | Sort limit result         |   

### shuffle

```javascript
import { shuffle } from 'src/utils';

const shuffledCards = shuffle(generatedCards);

// Return
[]


```
| Parameters          | Description |
|---------------|----------|
| arrayItems         | Array items to shuffle |

### isEmptyFalsyArray

```javascript
import { isEmptyFalsyArray } from 'src/utils';

isEmptyFalsyArray(array);

// Return
boolean


```
| Parameters          | Description |
|---------------|----------|
| array         | Array to check if is not empty |

### generateCards

```javascript
import { generateCards } from 'src/utils';

const generatedCards = generateCards(array);

// Return
[]


```
| Parameters          | Description |
|---------------|----------|
| array         | Array to duplicate items for playing the memory game |


