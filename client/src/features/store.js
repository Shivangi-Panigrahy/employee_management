import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './Slice/employeeSlice';
import statsReducer from './Slice/statsSlice';

const store = configureStore({
    reducer: {
        employees: employeeReducer,
        stats: statsReducer
    }
});

export default store;