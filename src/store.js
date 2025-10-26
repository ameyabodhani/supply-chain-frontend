import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from './pages/Order/reducers';

const store= createStore(reducers,composeWithDevTools(applyMiddleware()))
export default store