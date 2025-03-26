
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

export const fetchEmployees = createAsyncThunk('employees/fetch', async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
});

export const addEmployee = createAsyncThunk('employees/add', async (employeeData) => {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
});

export const updateEmployee = createAsyncThunk('employees/update', async ({ id, employeeData }) => {
    await axios.put(`${API_URL}/${id}`, employeeData);
    return { id, ...employeeData };
});

export const deleteEmployee = createAsyncThunk('employees/delete', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        loading: false,
        error: null,
        totalPages: 1,
        currentPage: 1
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => { state.loading = true; })
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
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.map(emp => emp.id === action.payload.id ? action.payload : emp);
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(emp => emp.id !== action.payload);
            });
    }
});

export default employeeSlice.reducer;