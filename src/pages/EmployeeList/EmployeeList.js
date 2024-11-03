import { LitElement, html, css } from "lit";
import { store, deleteEmployee } from "../../state/store.js";
import { t } from "../../localization/localization.js";
import "../../components/employee-row.js";
import "../../components/pagination-element.js";
import "../../components/SearchBar/SearchBar.js";
import "../EmployeeForm/EmployeeForm.js";
import "../../components/NavigationBar/NavBar.js";
import "../../components/DialogComponent/ConfirmationDialog.js";
import employeeListStyles from "./employeeListStyles.js";

class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    currentPage: { type: Number },
    employeesPerPage: { type: Number },
    searchQuery: { type: String },
    selectedEmployees: { type: Array },
    currentView: { type: String },
    showDeleteDialog: { type: Boolean },
    employeeToDelete: { type: Object },
  };

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.employeesPerPage = 6;
    this.searchQuery = "";
    this.selectedEmployees = [];
    this.currentView = "table";
    this.showDeleteDialog = false;
    this.employeeToDelete = null;

    this.unsubscribe = store.subscribe(() => {
      this.employees = store.getState().employees;
      this.requestUpdate(); 
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.employees = store.getState().employees;
    document.addEventListener("language-changed", this._updateLocalization);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) this.unsubscribe(); 
    document.removeEventListener("language-changed", this._updateLocalization);
  }

  _updateLocalization = () => {
    this.requestUpdate();
  };

  _toggleView(view) {
    this.currentView = view;
  }

  get deleteDialogMessage() {
    return t("confirmationDialogMessage", {
      firstName: this.employeeToDelete?.firstName || "",
      lastName: this.employeeToDelete?.lastName || "",
    });
  }
  _handleSelect(event, id) {
    if (event.target.checked) {
      this.selectedEmployees = [...this.selectedEmployees, id];
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(
        (empId) => empId !== id
      );
    }
  }

  _handleSelectAll(event) {
    if (event.target.checked) {
      const startIndex = (this.currentPage - 1) * this.employeesPerPage;
      const filteredEmployees = this.employees.filter((employee) =>
        Object.values(employee).some((val) =>
          val.toString().toLowerCase().includes(this.searchQuery)
        )
      );
      const paginatedEmployees = filteredEmployees.slice(
        startIndex,
        startIndex + this.employeesPerPage
      );
      this.selectedEmployees = paginatedEmployees.map(
        (employee) => employee.id
      );
    } else {
      this.selectedEmployees = [];
    }
  }

  static styles = [employeeListStyles];

  render() {
    const startIndex = (this.currentPage - 1) * this.employeesPerPage;
    const filteredEmployees = this.employees.filter((employee) =>
      Object.values(employee).some((val) =>
        val.toString().toLowerCase().includes(this.searchQuery)
      )
    );
    const paginatedEmployees = filteredEmployees.slice(
      startIndex,
      startIndex + this.employeesPerPage
    );

    return html`
      <nav-bar></nav-bar>
      <confirmation-dialog
        ?open=${this.showDeleteDialog}
        .message=${this.deleteDialogMessage}
        @dialog-confirmed=${this._confirmDelete}
        @dialog-closed=${() => {
          this.showDeleteDialog = false;
          this.employeeToDelete = null;
        }}
      ></confirmation-dialog>
      <div class="container">
        <div class="list-header">
          <h1 class="list-title">${t("employeeListTitle")}</h1>
          <div class="view-controls">
            <button
              class="view-btn ${this.currentView === "table" ? "active" : ""}"
              @click="${() => this._toggleView("table")}"
              title="${t("toggle_table_view")}"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke-width="2"
                  stroke-linecap="round"
                  width="24"
                  height="24"
                />
              </svg>
            </button>
            <button
              class="view-btn ${this.currentView === "grid" ? "active" : ""}"
              @click="${() => this._toggleView("grid")}"
              title="${t("toggle_grid_view")}"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
                  stroke-width="2"
                  width="24"
                  height="24"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="search-section">
          <search-bar @search="${this.handleSearch}"></search-bar>
        </div>

        <!-- Table View -->
        <div class="table-container ${this.currentView}">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    class="checkbox"
                    @change="${this._handleSelectAll}"
                    title="${t("select_all")}"
                  />
                </th>
                <th>${t("firstName")}</th>
                <th>${t("lastName")}</th>
                <th>${t("dateOfEmployment")}</th>
                <th>${t("dateOfBirth")}</th>
                <th>${t("phone")}</th>
                <th>${t("email")}</th>
                <th>${t("department")}</th>
                <th>${t("position")}</th>
                <th>${t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${paginatedEmployees.map(this._renderTableRow.bind(this))}
            </tbody>
          </table>
        </div>
        <!-- Mobile Card View -->
        <div class="card-view">
          ${paginatedEmployees.map(
            (employee) => html`
              <div class="employee-card">
                <div class="card-header">
                  <input
                    type="checkbox"
                    class="checkbox"
                    .checked="${this._isSelected(employee.id)}"
                    @change="${(e) => this._handleSelect(e, employee.id)}"
                  />
                  <div class="actions">
                    <button
                      class="action-btn edit"
                      @click="${() => this._navigateToEdit(employee.id)}"
                      title="${t("edit")}"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                          stroke-width="2"
                        />
                        <path
                          d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                          stroke-width="2"
                        />
                      </svg>
                    </button>
                    <button
                      class="action-btn delete"
                      @click="${() => this.handleDelete(employee)}"
                      title="${t("delete")}"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                          stroke-width="2"
                        />
                        <path d="M10 11v6M14 11v6" stroke-width="2" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="card-content">
                  <div class="card-field">
                    <span class="field-label">${t("firstName")}</span>
                    <span class="field-value">${employee.firstName}</span>
                  </div>
                  <div class="card-field">
                    <span class="field-label">${t("lastName")}</span>
                    <span class="field-value">${employee.lastName}</span>
                  </div>
                  <div class="card-field">
                    <span class="field-label">${t("dateOfEmployment")}</span>
                    <span class="field-value"
                      >${employee.dateOfEmployment}</span
                    >
                  </div>
                  <div class="card-field">
                    <span class="field-label">${t("dateOfBirth")}</span>
                    <span class="field-value">${employee.dateOfBirth}</span>
                  </div>
                  <div class="card-field">
                    <span class="field-label">${t("phone")}</span>
                    <span class="field-value">${employee.phone}</span>
                  </div>
                  <div class="card-field">
                    <span class="field-label">${t("email")}</span>
                    <span class="field-value">${employee.email}</span>
                  </div>
                  <div class="card-field">
                    <span class="field-label">${t("department")}</span>
                    <span class="field-value">${employee.department}</span>
                  </div>
                  <div class="card-field">
                    <span class="field-label">${t("position")}</span>
                    <span class="field-value">${employee.position}</span>
                  </div>
                </div>
              </div>
            `
          )}
        </div>
        ${paginatedEmployees.length === 0
          ? html`<div class="no-data-message">${t("noEmployeesFound")}</div>`
          : ""}
        <pagination-element
          .currentPage="${this.currentPage}"
          .totalItems="${filteredEmployees.length}"
          .itemsPerPage="${this.employeesPerPage}"
          @page-changed="${this.handlePageChange}"
        ></pagination-element>
      </div>
    `;
  }

  _renderTableRow(employee) {
    if (this.currentView === "table") {
      return html`
        <tr>
          <td>
            <input
              type="checkbox"
              class="checkbox"
              .checked="${this._isSelected(employee.id)}"
              @change="${(e) => this._handleSelect(e, employee.id)}"
            />
          </td>
          <td>${employee.firstName}</td>
          <td>${employee.lastName}</td>
          <td>${employee.dateOfEmployment}</td>
          <td>${employee.dateOfBirth}</td>
          <td>${employee.phone}</td>
          <td>${employee.email}</td>
          <td>${employee.department}</td>
          <td>${employee.position}</td>
          <td class="actions">
            <button
              class="action-btn edit"
              @click="${() => this._navigateToEdit(employee.id)}"
              title="${t("edit")}"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                  stroke-width="2"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke-width="2"
                />
              </svg>
            </button>
            <button
              class="action-btn delete"
              @click="${() => this.handleDelete(employee)}"
              title="${t("delete")}"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                  stroke-width="2"
                />
                <path d="M10 11v6M14 11v6" stroke-width="2" />
              </svg>
            </button>
          </td>
        </tr>
      `;
    } else {
      return html`
        <div class="grid-card">
          <div class="card-header">
            <input
              type="checkbox"
              class="checkbox"
              .checked="${this._isSelected(employee.id)}"
              @change="${(e) => this._handleSelect(e, employee.id)}"
            />
            <div class="actions">
              <button
                class="action-btn edit"
                @click="${() => this._navigateToEdit(employee.id)}"
                title="${t("edit")}"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                    stroke-width="2"
                  />
                  <path
                    d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                    stroke-width="2"
                  />
                </svg>
              </button>
              <button
                class="action-btn delete"
                @click="${() => this.handleDelete(employee)}"
                title="${t("delete")}"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                    stroke-width="2"
                  />
                  <path d="M10 11v6M14 11v6" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
          <div class="card-content">
            <div class="card-field">
              <span class="field-label">${t("firstName")}</span>
              <span class="field-value">${employee.firstName}</span>
            </div>
            <div class="card-field">
              <span class="field-label">${t("lastName")}</span>
              <span class="field-value">${employee.lastName}</span>
            </div>
            <div class="card-field">
              <span class="field-label">${t("dateOfEmployment")}</span>
              <span class="field-value">${employee.dateOfEmployment}</span>
            </div>
            <div class="card-field">
              <span class="field-label">${t("dateOfBirth")}</span>
              <span class="field-value">${employee.dateOfBirth}</span>
            </div>
            <div class="card-field">
              <span class="field-label">${t("phone")}</span>
              <span class="field-value">${employee.phone}</span>
            </div>
            <div class="card-field">
              <span class="field-label">${t("email")}</span>
              <span class="field-value">${employee.email}</span>
            </div>
            <div class="card-field">
              <span class="field-label">${t("department")}</span>
              <span class="field-value">${employee.department}</span>
            </div>
            <div class="card-field">
              <span class="field-label">${t("position")}</span>
              <span class="field-value">${employee.position}</span>
            </div>
          </div>
        </div>
      `;
    }
  }

  _isSelected(id) {
    return this.selectedEmployees.includes(id);
  }

  _navigateToAdd() {
    window.history.pushState({}, "", "/add");
    window.dispatchEvent(new Event("popstate"));
  }

  _navigateToEdit(id) {
    window.history.pushState({}, "", `/edit/${id}`);
    window.dispatchEvent(new Event("popstate")); 
  }

  handleSearch(event) {
    this.searchQuery = event.detail.query.toLowerCase();
    this.currentPage = 1; 
  }

  handlePageChange(event) {
    this.currentPage = event.detail.page;
  }

  handleDelete(employee) {
    this.employeeToDelete = employee;
    this.showDeleteDialog = true;
  }

  _confirmDelete() {
    if (this.employeeToDelete) {
      store.dispatch(deleteEmployee(this.employeeToDelete.id));
    }
    this._closeDeleteDialog();
  }

  _closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.employeeToDelete = null;
  }
}

customElements.define("employee-list", EmployeeList);
