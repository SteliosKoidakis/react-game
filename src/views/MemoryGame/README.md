# Memory game
A view component responsible for a memory card game. The user see an amount of hidden cards and has a time to find all matches by clicking on each one. If every two clicked cards are not the same the cards are hidden again.The idea is to configure the rules of the game with the passed properties.

## Usage
```javascript
import { MemoryGameView } from 'src/view';

<MemoryGameView
  url={API_URL}
  cardNumber={CARD_NUMBER}
  cardPoints={CARD_POINTS}
  timeLimit={TIME_LIMIT}
  delay={DELAY}
/>
```

## Properties
| Name          | Required | Type     | Description              |
|---------------|----------|----------|-------------|--------------------------|
| url         |yes        |`String`  | Url path for http request to get game items  |
| cardNumber  |yes        |`Number`   |  Card number to duplicate for starting the game         |
| cardPoints  |yes        |`Number`   |  Points per match       |
| timeLimit  |yes        |`Number`| Time limit to play one game             |
| delay  |no        |`Number`| Time delay to display un flipp a card            |

## States
| Name          | Mutation | Initial Type     | Description              |
|---------------|----------|----------|-------------|--------------------------|
| cards         |setCards   |`Array`  | State to store cards that will be displayed in the game  |
| flippedCards  |setFlippedCard     |`Array`   |  Array to store flipped cards ids        |
| matchedCards  |setMatchedCards   |`Array`   |  Array to store matched cards ids   |
| isDisabled  |setDisabled      |`Boolean`| Identifier of disable status with main purpose to not allow click events on cards          |
| counter  |setCounter        |`Number`| Time counter to finish a game            |

## Effects
There are two side effects. One is for the counter and one for the http call to get card items. The first one has dependency the `counter` state and the second one `contributors, isWin, isLost` state/properties.

## Methods

| Name          | Parameters | Description              |
|---------------|----------|-------------|--------------------------|
| onFlippSecondCard         |uuid    | Handle logic when a second card is clicked and define if there is a match or not  |
| onClickCard  |uuid        | On click card main function         |
| restartGame  |-        | Set a game from the beginning and ready to start     |  
