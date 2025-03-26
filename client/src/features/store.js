import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./Slice/employeeSlice";
import statsReducer from "./Slice/statsSlice";
import departmentReducer from "./Slice/departmentSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    stats: statsReducer,
    departments: departmentReducer,
  },
});

export default store;
