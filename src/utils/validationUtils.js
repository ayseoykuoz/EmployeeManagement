import {store} from '../state/store.js';

export const validateField = (field, value, existingEmployeeId = null) => {
  let errorMessage = '';

  switch (field) {
    case 'firstName':
    case 'lastName':
      errorMessage = /^[A-Za-zçğıöşüÇĞİÖŞÜ]+(\s[A-Za-zçğıöşüÇĞİÖŞÜ]+)*$/.test(
        value
      )
        ? ''
        : 'Only alphabetic characters and spaces are allowed';
      break;

    case 'phone':
      if (/^\+?\d{10,13}$/.test(value)) {
        errorMessage = isPhoneUnique(value)
          ? ''
          : 'Phone number must be unique';
      } else {
        errorMessage =
          'Phone number must start with + and include country code followed by 10-13 digits';
      }
      break;
    case 'email':
      errorMessage = isEmailUnique(value, existingEmployeeId)
        ? ''
        : 'Email must be unique';
      break;
    default:
      break;
  }

  return errorMessage;
};

const isEmailUnique = (email, existingEmployeeId) => {
  const employees = store.getState().employees;
  return !employees.some(
    (emp) => emp.email === email && emp.id !== existingEmployeeId
  );
};

const isPhoneUnique = (phone, existingEmployeeId) => {
  const employees = store.getState().employees;
  return !employees.some(
    (emp) => emp.phone === phone && emp.id !== existingEmployeeId
  );
};
