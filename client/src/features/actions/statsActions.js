import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stats';

export const fetchDepartmentSalaries = () => async (dispatch) => {
    dispatch({ type: 'FETCH_DEPARTMENT_SALARIES_REQUEST' });
    try {
        const response = await axios.get(`${API_URL}/highest-salary`);
        dispatch({
            type: 'FETCH_DEPARTMENT_SALARIES_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_STATS_FAILURE',
            payload: error.response?.data?.message || 'Error fetching department salaries'
        });
    }
};

export const fetchSalaryRanges = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/salary-range`);
        dispatch({
            type: 'FETCH_SALARY_RANGES_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_STATS_FAILURE',
            payload: error.response?.data?.message || 'Error fetching salary ranges'
        });
    }
};

export const fetchYoungestEmployees = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/youngest-employees`);
        dispatch({
            type: 'FETCH_YOUNGEST_EMPLOYEES_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_STATS_FAILURE',
            payload: error.response?.data?.message || 'Error fetching youngest employees'
        });
    }
};