# Components
A main source of components which are been used across the project to increase scalability

## CardComponent
UI functional component with main responsibility to display a Card element. Works with properties and callbacks.

```javascript
import { CardComponent } from 'src/components'

<CardComponent
  title={name}
  imageUrl={avatarUrl}
  uuid={uuid}
  isFlipped={flippedCards.includes(uuid)}
  isMatched={matchedCards.includes(uuid)}
  onClickCard={onClickCard}
/>
```


### Properties

| Name          | Required | Type     | Description              |
|---------------|----------|----------|-------------|--------------------------|
| title         |no        |`String`  | Title of the Card  |
| imageUrl  |no        |`String`   |  Url source of media content            |
| uuid  |no        |`Number`| Element's unique identifier             |
| isFlipped  |no        |`Boolean`| Flipp status of the card            |
| isMatched  |no        |`Boolean`| Match status of the card             |

## ModalComponent
```javascript
import { ModalComponent } from 'src/components'

<ModalComponent
  title={isWin ? 'YOU WON!' : 'GAME OVER' }
  text={`Score: ${score}`}
  isOpen={isWin || isLost}
  onClickActionButton={ () => restartGame()}
/>
```


### Properties

| Name          | Required | Type     | Description              |
|---------------|----------|----------|-------------|--------------------------|
| title         |no        |`String`  | Title of Modal  |
| text  |no        |`String`   |  Description text            |
| isOpen  |no        |`Boolean`| Identifier of model's open status          |
| onClickActionButton  |no        |`Function`| Action button function            |

