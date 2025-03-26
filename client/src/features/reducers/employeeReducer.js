const initialState = {
    employees: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_EMPLOYEES_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_EMPLOYEES_SUCCESS':
            return { 
                ...state, 
                loading: false, 
                employees: action.payload.employees,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            };
        case 'FETCH_EMPLOYEES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_EMPLOYEE_SUCCESS':
            return { ...state, employees: [...state.employees, action.payload] };
        case 'UPDATE_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employees: state.employees.map(emp => 
                    emp.id === action.payload.id ? action.payload : emp
                )
            };
        case 'DELETE_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employees: state.employees.filter(emp => emp.id !== action.payload)
            };
        default:
            return state;
    }
};

export default employeeReducer;