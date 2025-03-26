import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import employeeReducer from './reducers/employeeReducer';
import statsReducer from './reducers/statsReducer';

const rootReducer = combineReducers({
    employees: employeeReducer,
    stats: statsReducer
});

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;