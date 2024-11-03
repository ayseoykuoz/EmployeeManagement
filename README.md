# Employee Management Application
An Employee Management Application built with LitElement and Redux, providing a comprehensive system to manage employee data, navigate between views, and utilize localization for multilingual support.

# Getting Started

Clone the Repository:
git clone https://github.com/ayseoykuoz/EmployeeManagement.git


cd employee-management-app


Install Dependencies:
npm install


Run the Application:
npm start

The application will run locally

# Dummy Data Usage
The application allows the use of predefined dummy data for employee records, which is helpful for development and testing purposes. This data is stored in employeeData and is loaded into the Redux store as the default state.

To enable or disable dummy data:

Open state/store.js.

Locate the following line in the initialState object:


employees: employeeData, // dummy data
employees: [], // default state

Using dummy data is helpful to preview the application's UI and functionality without manually adding employee records.

