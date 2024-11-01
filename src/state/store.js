import {createStore} from 'redux';

const initialState = {
  employees: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2022-01-15',
      dateOfBirth: '1990-05-25',
      phone: '+1234567890',
      email: 'john.doe@example.com',
      department: 'Analytics',
      position: 'Senior',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfEmployment: '2021-03-30',
      dateOfBirth: '1985-10-15',
      phone: '+1098765432',
      email: 'jane.smith@example.com',
      department: 'Tech',
      position: 'Junior',
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      dateOfEmployment: '2019-07-10',
      dateOfBirth: '1992-02-11',
      phone: '+9876543210',
      email: 'alice.johnson@example.com',
      department: 'Marketing',
      position: 'Medior',
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Brown',
      dateOfEmployment: '2020-02-10',
      dateOfBirth: '1988-07-08',
      phone: '+1345678901',
      email: 'bob.brown@example.com',
      department: 'HR',
      position: 'Senior',
    },
    {
      id: 5,
      firstName: 'Eve',
      lastName: 'White',
      dateOfEmployment: '2018-11-15',
      dateOfBirth: '1991-04-21',
      phone: '+1432167890',
      email: 'eve.white@example.com',
      department: 'Finance',
      position: 'Junior',
    },
    {
      id: 6,
      firstName: 'Carl',
      lastName: 'Davis',
      dateOfEmployment: '2023-04-01',
      dateOfBirth: '1993-09-17',
      phone: '+1092345678',
      email: 'carl.davis@example.com',
      department: 'Tech',
      position: 'Medior',
    },
    {
      id: 7,
      firstName: 'Grace',
      lastName: 'Harris',
      dateOfEmployment: '2020-06-20',
      dateOfBirth: '1986-11-30',
      phone: '+1567890123',
      email: 'grace.harris@example.com',
      department: 'Marketing',
      position: 'Senior',
    },
    {
      id: 8,
      firstName: 'Mike',
      lastName: 'Clark',
      dateOfEmployment: '2017-05-10',
      dateOfBirth: '1989-02-13',
      phone: '+1987654321',
      email: 'mike.clark@example.com',
      department: 'Operations',
      position: 'Junior',
    },
    {
      id: 9,
      firstName: 'Sophia',
      lastName: 'Walker',
      dateOfEmployment: '2021-10-22',
      dateOfBirth: '1994-12-12',
      phone: '+1123456789',
      email: 'sophia.walker@example.com',
      department: 'Finance',
      position: 'Medior',
    },
    {
      id: 10,
      firstName: 'George',
      lastName: 'Anderson',
      dateOfEmployment: '2020-08-30',
      dateOfBirth: '1992-03-15',
      phone: '+1012345678',
      email: 'george.anderson@example.com',
      department: 'Tech',
      position: 'Senior',
    },
    {
      id: 11,
      firstName: 'Emma',
      lastName: 'Thomas',
      dateOfEmployment: '2019-09-05',
      dateOfBirth: '1987-01-28',
      phone: '+1176543210',
      email: 'emma.thomas@example.com',
      department: 'HR',
      position: 'Medior',
    },
    {
      id: 12,
      firstName: 'James',
      lastName: 'Martinez',
      dateOfEmployment: '2018-04-22',
      dateOfBirth: '1990-06-18',
      phone: '+1456789012',
      email: 'james.martinez@example.com',
      department: 'Sales',
      position: 'Junior',
    },
  ],
};

// Action types
const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

// Action creators// Action creator
export const addEmployee = (employee) => ({type: ADD_EMPLOYEE, employee});
export const editEmployee = (employee) => ({type: EDIT_EMPLOYEE, employee});
export const deleteEmployee = (id) => ({type: DELETE_EMPLOYEE, id});

function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {...state, employees: [action.employee, ...state.employees]};
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
