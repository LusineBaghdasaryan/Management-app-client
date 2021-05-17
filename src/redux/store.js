import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from  "redux-logger"
import {mainReducer} from "./reducer";


const middleware = applyMiddleware(thunk, logger);

const store = createStore(mainReducer, middleware);

export default store;
