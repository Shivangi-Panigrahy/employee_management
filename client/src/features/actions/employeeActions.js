import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

export const fetchEmployees = (page = 1, limit = 10) => async (dispatch) => {
    dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
    try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        dispatch({
            type: 'FETCH_EMPLOYEES_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_EMPLOYEES_FAILURE',
            payload: error.response?.data?.message || 'Error fetching employees'
        });
    }
};

export const addEmployee = (employeeData) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL, employeeData);
        dispatch({
            type: 'ADD_EMPLOYEE_SUCCESS',
            payload: response.data
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error adding employee';
    }
};

export const updateEmployee = (id, employeeData) => async (dispatch) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employeeData);
        dispatch({
            type: 'UPDATE_EMPLOYEE_SUCCESS',
            payload: { id, ...employeeData }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error updating employee';
    }
};

export const deleteEmployee = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        dispatch({
            type: 'DELETE_EMPLOYEE_SUCCESS',
            payload: id
        });
    } catch (error) {
        throw error.response?.data || 'Error deleting employee';
    }
};
