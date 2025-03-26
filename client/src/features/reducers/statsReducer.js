const initialState = {
    departmentSalaries: [],
    salaryRanges: [],
    youngestEmployees: [],
    loading: false,
    error: null
};

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DEPARTMENT_SALARIES_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_DEPARTMENT_SALARIES_SUCCESS':
            return { ...state, loading: false, departmentSalaries: action.payload };
        case 'FETCH_SALARY_RANGES_SUCCESS':
            return { ...state, loading: false, salaryRanges: action.payload };
        case 'FETCH_YOUNGEST_EMPLOYEES_SUCCESS':
            return { ...state, loading: false, youngestEmployees: action.payload };
        case 'FETCH_STATS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default statsReducer;