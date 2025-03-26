import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/departments";

// Async Thunks
export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (params = { page: 1, limit: 10 }) => {
    const response = await axios.get(
      `${API_URL}?page=${params.page}&limit=${params.limit}`
    );
    return response.data;
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],
    totalPages: 0,
    currentPage: 1,
    stats: [],
    employeeCounts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Departments
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload.departments;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default departmentSlice.reducer;
