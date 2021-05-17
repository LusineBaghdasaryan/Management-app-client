import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {mainReducer} from "./reducer";


const middleware = applyMiddleware(thunk);

const store = createStore(mainReducer, middleware);

export default store;
