import { createStore } from "redux";
import { employeeData } from "../utils/employeeData";

const initialState = {
  employees: employeeData,
};

// Action types
const ADD_EMPLOYEE = "ADD_EMPLOYEE";
const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

// Action creators// Action creator
export const addEmployee = (employee) => ({ type: ADD_EMPLOYEE, employee });
export const editEmployee = (employee) => ({ type: EDIT_EMPLOYEE, employee });
export const deleteEmployee = (id) => ({ type: DELETE_EMPLOYEE, id });

function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return { ...state, employees: [action.employee, ...state.employees] };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.employee.id ? action.employee : emp
        ),
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.id),
      };
    default:
      return state;
  }
}

// Create and export the Redux store
export const store = createStore(employeeReducer);
