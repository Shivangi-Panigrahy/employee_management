import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slice/employeeSlice";
import statsReducer from "./slice/statsSlice";
import departmentReducer from "./slice/departmentSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    stats: statsReducer,
    departments: departmentReducer,
  },
});

export default store;
