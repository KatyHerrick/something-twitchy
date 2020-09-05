// Because we want to manipulate the history object from inside an action
// creator, we manually create a history object (instead of using
// BrowserRouter, which internally creates a history object).
import { createBrowserHistory } from 'history';
export default createBrowserHistory();