import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, logger, sagaMiddleware];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
sagaMiddleware.run(rootSaga);

export default store;
