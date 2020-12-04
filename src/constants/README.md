# Constants
A main source of constants which are been used across the project to avoid hard coded values and maintain scalability.

## Usage
```javascript
import {
  API_URL,
  CARD_NUMBERS,
  CARD_POINTS,
  DELAY,
  TIME_LIMIT,
} from 'src/constants';

```



| Name          | Type     | Description              |
|---------------|----------|--------------------------|
| API_URL         |`String` |  Url of api call to get the cards  |
| CARD_NUMBERS  |`Number` |  Number of matched cards             |    
| CARD_POINTS  |`Number` |  Number of points per match             |    
| DELAY  |`Number` |  Delay on click card item           |    
| TIME_LIMIT  |`Number` |  Time limit to play a round game            |    