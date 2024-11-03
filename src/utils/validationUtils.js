import { store } from "../state/store.js";
import { t } from "../localization/localization.js";

export const validateField = (field, value, existingEmployeeId = null) => {
  let errorMessage = "";

  switch (field) {
    case "firstName":
    case "lastName":
      errorMessage = /^[A-Za-zçğıöşüÇĞİÖŞÜ]+(\s[A-Za-zçğıöşüÇĞİÖŞÜ]+)*$/.test(
        value
      )
        ? ""
        : t("onlyAlphabeticAllowed");
      break;

    case "phone":
      if (/^\+?\d{11,12}$/.test(value)) {
        errorMessage = isPhoneUnique(value, existingEmployeeId)
          ? ""
          : t("phoneNumberUnique");
      } else {
        errorMessage = t("phoneNumberTitle");
      }
      break;

    case "email":
      errorMessage = isEmailUnique(value, existingEmployeeId)
        ? ""
        : t("emailUnique");
      break;

    case "department":
      console.log(`Validating department with value: ${value}`);
      errorMessage = value ? "" : t("departmentRequired");
      break;

    case "position":
      console.log(`Validating position with value: ${value}`);
      errorMessage = value ? "" : t("positionRequired");
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
