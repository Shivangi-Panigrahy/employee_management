
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stats';

export const fetchDepartmentSalaries = createAsyncThunk('stats/departmentSalaries', async () => {
    const response = await axios.get(`${API_URL}/highest-salary`);
    return response.data;
});

export const fetchSalaryRanges = createAsyncThunk('stats/salaryRanges', async () => {
    const response = await axios.get(`${API_URL}/salary-range`);
    return response.data;
});

export const fetchYoungestEmployees = createAsyncThunk('stats/youngestEmployees', async () => {
    const response = await axios.get(`${API_URL}/youngest-employees`);
    return response.data;
});

const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        departmentSalaries: [],
        salaryRanges: [],
        youngestEmployees: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentSalaries.pending, (state) => { state.loading = true; })
            .addCase(fetchDepartmentSalaries.fulfilled, (state, action) => {
                state.loading = false;
                state.departmentSalaries = action.payload;
            })
            .addCase(fetchSalaryRanges.fulfilled, (state, action) => {
                state.salaryRanges = action.payload;
            })
            .addCase(fetchYoungestEmployees.fulfilled, (state, action) => {
                state.youngestEmployees = action.payload;
            })
            .addCase(fetchDepartmentSalaries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default statsSlice.reducer;