import { Router } from "@vaadin/router";
import "../pages/EmployeeList/EmployeeList.js";
import "../pages/EmployeeForm/EmployeeForm.js";

export function initRouter(outlet) {
  const router = new Router(outlet);

  router.setRoutes([
    { path: "/", component: "employee-list" },
    { path: "/add", component: "employee-form" },
    { path: "/edit/:id", component: "employee-form" },
  ]);
}
