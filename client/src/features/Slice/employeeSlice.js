import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/employees";

export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employeeData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, employeeData);

      // Immediately refetch employees after adding
      dispatch(fetchEmployees({ page: 1, limit: 10 }));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, employeeData }, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/${id}`, employeeData);

      // Immediately refetch employees after updating
      dispatch(fetchEmployees({ page: 1, limit: 10 }));

      return { id, ...employeeData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      // Immediately refetch employees after deleting
      dispatch(fetchEmployees({ page: 1, limit: 10 }));

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || action.error.message;
        }
      );
  },
});

export default employeeSlice.reducer;
