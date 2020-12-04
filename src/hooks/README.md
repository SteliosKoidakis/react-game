# Hooks
Folder responsible for all hooks are been used across the project

## useHttp
A hook that is responsible for http calls and handle their response.

```javascript
import { useHttp } from 'src/hooks';

const Component = (props) => {

const [item, isLoading] = useHttp(url);

```
#### Parameters
| Name          | Type     | Description              |
|---------------|----------|--------------------------|
| url         |`String` |  Url path to make the http call   |

#### Return an array [ ] with:

| Name          | Type     | Description              |
|---------------|----------|--------------------------|
| item         |`any` |  Data that be returned from the http call   |
| isLoading |`Boolean` |  Indicator of http call status   |