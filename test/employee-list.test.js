import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "../src/pages/EmployeeList/EmployeeList.js";
import { store, deleteEmployee } from "../src/state/store.js";
import { loadLanguage, t } from "../src/localization/localization.js";

describe("EmployeeList", () => {
  before(async () => {
    await loadLanguage("en"); 
  });

  let el;
  const mockEmployees = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      dateOfEmployment: "2022-01-15",
      dateOfBirth: "1990-05-25",
      phone: "+1234567890",
      email: "john.doe@example.com",
      department: "Analytics",
      position: "Senior",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      dateOfEmployment: "2021-03-30",
      dateOfBirth: "1985-10-15",
      phone: "+1098765432",
      email: "jane.smith@example.com",
      department: "Tech",
      position: "Junior",
    },
  ];

  beforeEach(async () => {
    store.dispatch({ type: "RESET_EMPLOYEES", payload: mockEmployees });
    el = await fixture(html`<employee-list></employee-list>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("renders the employee list title", () => {
    const titleElement = el.shadowRoot.querySelector(".list-title");
    expect(titleElement).to.exist;
    expect(titleElement.textContent.trim()).to.equal("Employee List");
  });

  it("renders the correct number of employees per page", () => {
    const rows = el.shadowRoot.querySelectorAll("tbody tr");
    const expectedRows = Math.min(el.employeesPerPage, el.employees.length);
    expect(rows.length).to.equal(expectedRows);
  });

  it("filters employees based on search query", async () => {
    const searchBar = el.shadowRoot.querySelector("search-bar");
    searchBar.dispatchEvent(
      new CustomEvent("search", { detail: { query: "Jane" } })
    );
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll("tbody tr");
    expect(rows.length).to.equal(1);
    const firstRow = rows[0];
    expect(firstRow.textContent).to.include("Jane");
  });

  it("handles page changes", async () => {
    const additionalEmployees = [];
    for (let i = 3; i <= 10; i++) {
      additionalEmployees.push({
        id: i,
        firstName: `Employee${i}`,
        lastName: `Last${i}`,
        dateOfEmployment: "2021-01-01",
        dateOfBirth: "1995-01-01",
        phone: "0000000000",
        email: `employee${i}@example.com`,
        department: "Sales",
        position: "Associate",
      });
    }
    store.dispatch({ type: "ADD_EMPLOYEES", payload: additionalEmployees });
    el.employees = store.getState().employees;
    await el.updateComplete;

    const paginationElement = el.shadowRoot.querySelector("pagination-element");
    expect(paginationElement).to.exist;

    paginationElement.dispatchEvent(
      new CustomEvent("page-changed", { detail: { page: 2 } })
    );
    await el.updateComplete;

    expect(el.currentPage).to.equal(2);
  });

  it("selects individual employees", async () => {
    const firstRowCheckbox = el.shadowRoot.querySelector(
      'tbody tr input[type="checkbox"]'
    );
    firstRowCheckbox.checked = true;
    firstRowCheckbox.dispatchEvent(new Event("change"));
    await el.updateComplete;

    expect(el.selectedEmployees.length).to.equal(1);
    expect(el.selectedEmployees[0]).to.equal(mockEmployees[0].id);
  });

  it("shows the delete confirmation dialog when delete button is clicked", async () => {
    const deleteButton = el.shadowRoot.querySelector(".action-btn.delete");
    deleteButton.click();
    await el.updateComplete;

    expect(el.showDeleteDialog).to.be.true;
    expect(el.employeeToDelete).to.deep.equal(mockEmployees[0]);
  });

  it("confirms deletion of an employee", async () => {
    const deleteSpy = sinon.spy(store, "dispatch");
    el.employeeToDelete = mockEmployees[0];
    el.showDeleteDialog = true;
    await el.updateComplete;

    const confirmationDialog = el.shadowRoot.querySelector(
      "confirmation-dialog"
    );
    confirmationDialog.dispatchEvent(new CustomEvent("dialog-confirmed"));
    await el.updateComplete;

    expect(deleteSpy.calledWith(deleteEmployee(mockEmployees[0].id))).to.be
      .true;
    expect(el.showDeleteDialog).to.be.false;
    expect(el.employeeToDelete).to.be.null;
  });

  it("toggles between table and grid views", async () => {
    const tableViewButton = el.shadowRoot.querySelector(".view-btn.active");
    const gridViewButton = el.shadowRoot.querySelector(
      ".view-btn:not(.active)"
    );

    expect(el.currentView).to.equal("table");

    gridViewButton.click();
    await el.updateComplete;

    expect(el.currentView).to.equal("grid");
    expect(gridViewButton.classList.contains("active")).to.be.true;

    tableViewButton.click();
    await el.updateComplete;

    expect(el.currentView).to.equal("table");
    expect(tableViewButton.classList.contains("active")).to.be.true;
  });

  it("updates when the language changes", async () => {
    const titleElement = el.shadowRoot.querySelector(".list-title");
    expect(titleElement.textContent.trim()).to.equal("Employee List");

    await loadLanguage("tr");
    await el.updateComplete;

    expect(titleElement.textContent.trim()).to.equal("Çalışan Listesi"); 
  });

  it("unsubscribes from store updates on disconnect", () => {
    const unsubscribeSpy = sinon.spy(el, "unsubscribe");
    el.disconnectedCallback();
    expect(unsubscribeSpy.called).to.be.true;
  });

  it("selects and deselects all employees", async () => {
    const selectAllCheckbox = el.shadowRoot.querySelector(
      'thead input[type="checkbox"]'
    );

    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event("change"));
    await el.updateComplete;

    const expectedSelection = el.employees
      .slice(0, el.employeesPerPage)
      .map((emp) => emp.id);

    expect(el.selectedEmployees).to.deep.equal(expectedSelection);

    selectAllCheckbox.checked = false;
    selectAllCheckbox.dispatchEvent(new Event("change"));
    await el.updateComplete;

    expect(el.selectedEmployees).to.be.empty;
  });

  it("handles empty employee list gracefully", async () => {
    store.dispatch({ type: "RESET_EMPLOYEES", payload: [] });
    el.employees = [];
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll("tbody tr");
    expect(rows.length).to.equal(0);

    const noDataMessage = el.shadowRoot.querySelector(".no-data-message");
    expect(noDataMessage).to.exist;
    expect(noDataMessage.textContent.trim()).to.equal(t("noEmployeesFound"));
  });

  it("displays no results message when search yields no matches", async () => {
    const searchBar = el.shadowRoot.querySelector("search-bar");
    searchBar.dispatchEvent(
      new CustomEvent("search", { detail: { query: "NonExistentName" } })
    );
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll("tbody tr");
    expect(rows.length).to.equal(0);

    const noDataMessage = el.shadowRoot.querySelector(".no-data-message");
    expect(noDataMessage).to.exist;
    expect(noDataMessage.textContent.trim()).to.equal(t("noEmployeesFound"));
  });

  it("adds and removes event listeners on connect and disconnect", () => {
    const addEventListenerSpy = sinon.spy(document, "addEventListener");
    const removeEventListenerSpy = sinon.spy(document, "removeEventListener");

    const newEl = document.createElement("employee-list");
    document.body.appendChild(newEl);

    expect(
      addEventListenerSpy.calledWith(
        "language-changed",
        newEl._updateLocalization
      )
    ).to.be.true;

    document.body.removeChild(newEl);

    expect(
      removeEventListenerSpy.calledWith(
        "language-changed",
        newEl._updateLocalization
      )
    ).to.be.true;

    addEventListenerSpy.restore();
    removeEventListenerSpy.restore();
  });

  it("updates localization when language changes", async () => {
    const spy = sinon.spy(el, "requestUpdate");

    document.dispatchEvent(
      new CustomEvent("language-changed", {
        detail: { language: "tr" },
      })
    );
    await el.updateComplete;

    expect(spy.called).to.be.true;
  });
});
