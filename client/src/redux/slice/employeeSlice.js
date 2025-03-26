import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL + "employees";

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

      dispatch(fetchEmployees({ page: 1, limit: 10 }));
      toast.success("Employee added successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add employee");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, employeeData }, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/${id}`, employeeData);
      dispatch(fetchEmployees({ page: 1, limit: 10 }));
      toast.success("Employee updated successfully");
      return { id, ...employeeData };
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update employee");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      dispatch(fetchEmployees({ page: 1, limit: 10 }));
      toast.success("Employee deleted successfully");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete employee");
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
