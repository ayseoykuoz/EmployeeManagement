import { LitElement, html } from "lit";
import { store, addEmployee, editEmployee } from "../../state/store.js";
import employeeFormStyles from "./employeeFormStyles.js";
import { validateField } from "../../utils/validationUtils.js";
import { t } from "../../localization/localization.js";

class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
    isEditing: { type: Boolean },
    errorMessages: { type: Object },
    isFormEdited: { type: Boolean },
    showConfirmationDialog: { type: Boolean },
  };

  constructor() {
    super();
    this.employee = {
      id: null,
      firstName: "",
      lastName: "",
      dateOfEmployment: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      department: "Analytics",
      position: "Junior",
    };
    this.isEditing = false;
    this.errorMessages = {};
    this.isFormEdited = false;
    this.showConfirmationDialog = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadEmployeeFromPath();
    window.addEventListener("popstate", this._loadEmployeeFromPath);
    document.addEventListener("language-changed", this._updateLocalization);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._loadEmployeeFromPath);
    document.removeEventListener("language-changed", this._updateLocalization);
  }

  _updateLocalization = () => {
    this.requestUpdate();
  };

  _loadEmployeeFromPath = () => {
    const path = window.location.pathname;
    const match = path.match(/^\/edit\/(\d+)$/);

    if (match) {
      const employeeId = match[1];
      const employee = store
        .getState()
        .employees.find((e) => e.id == employeeId);
      if (employee) {
        this.employee = { ...employee };
        this.isEditing = true;
      }
    } else {
      this.employee = {
        id: null,
        firstName: "",
        lastName: "",
        dateOfEmployment: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        department: "",
        position: "",
      };
      this.isEditing = false;
    }
  };

  static styles = [employeeFormStyles];

  render() {
    return html`
      <nav-bar></nav-bar>
      <div class="container">
        <div class="employee-form">
          <div class="form-header">
            <h2>${this.isEditing ? t("editEmployee") : t("addNewEmployee")}</h2>
          </div>
          <form @submit="${this._handleSubmit}">
            <div class="form-grid">
              ${this._renderInputFields()}
              <div class="actions">
                <button
                  type="button"
                  class="btn-secondary"
                  @click="${this._navigateToList}"
                >
                  ${t("cancel")}
                </button>
                <button
                  type="submit"
                  class="btn-primary"
                  ?disabled="${!this._isFormValid()}"
                >
                  ${this.isEditing ? t("updateEmployee") : t("addEmployee")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Confirmation Dialog -->
      ${this.showConfirmationDialog
        ? html`
            <confirmation-dialog
              .open="${this.showConfirmationDialog}"
              .message="${t("confirmationEditMessage")}"
              @dialog-confirmed="${this._handleDialogConfirmed}"
              @dialog-closed="${this._handleDialogClosed}"
            ></confirmation-dialog>
          `
        : ""}
    `;
  }

  _renderInputFields() {
    return html`
      ${this._renderInputField(
        "firstName",
        t("firstName"),
        "text",
        t("onlyAlphabeticAllowed")
      )}
      ${this._renderInputField(
        "lastName",
        t("lastName"),
        "text",
        t("onlyAlphabeticAllowed")
      )}
      ${this._renderInputField(
        "dateOfEmployment",
        t("dateOfEmployment"),
        "date"
      )}
      ${this._renderInputField("dateOfBirth", t("dateOfBirth"), "date")}

      <div class="form-group">
        <label>${t("phoneNumber")}</label>
        <input
          type="tel"
          pattern="^\\+\\d{10,13}$"
          placeholder="+905384166270"
          .value="${this.employee.phone}"
          @input="${(e) => this._updateField("phone", e)}"
          title="${t("phoneNumberTitle")}"
          required
        />
        ${this.errorMessages.phone
          ? html`<span class="error-message">${this.errorMessages.phone}</span>`
          : ""}
      </div>

      ${this._renderInputField("email", t("email"), "email", t("validEmail"))}
      <div class="form-group">
        <label>${t("department")}</label>
        <select
          .value="${this.employee.department}"
          @change="${(e) => this._updateField("department", e)}"
          aria-label="${t("department")}"
        >
          <option value="Analytics">${t("analytics")}</option>
          <option value="Tech">${t("tech")}</option>
        </select>
        ${this.errorMessages.department
          ? html`<span class="error-message"
              >${this.errorMessages.department}</span
            >`
          : ""}
      </div>
      <div class="form-group">
        <label>${t("position")}</label>
        <select
          .value="${this.employee.position}"
          @change="${(e) => this._updateField("position", e)}"
          aria-label="${t("position")}"
        >
          <option value="Junior">${t("junior")}</option>
          <option value="Medior">${t("medior")}</option>
          <option value="Senior">${t("senior")}</option>
        </select>
        ${this.errorMessages.position
          ? html`<span class="error-message"
              >${this.errorMessages.position}</span
            >`
          : ""}
      </div>
    `;
  }

  _renderInputField(field, label, type, errorMessage = "") {
    return html`
      <div class="form-group">
        <label>${label}</label>
        <input
          type="${type}"
          .value="${this.employee[field]}"
          @input="${(e) => this._updateField(field, e)}"
        />
        ${this.errorMessages[field]
          ? html`<span class="error-message"
              >${this.errorMessages[field]}</span
            >`
          : ""}
      </div>
    `;
  }

  _updateField(field, event) {
    this.employee = { ...this.employee, [field]: event.target.value };
    this.isFormEdited = true;
    this._validateField(field, event.target.value);
  }

  _validateField(field, value) {
    const errorMessage = validateField(field, value, this.employee.id);
    this.errorMessages = { ...this.errorMessages, [field]: errorMessage };
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._validateField("department", this.employee.department || "");
    this._validateField("position", this.employee.position || "");

    if (this.isEditing && this.isFormEdited) {
      this.showConfirmationDialog = true;
    } else if (this._isFormValid()) {
      this._submitForm();
    }
  }

  _submitForm() {
    const action = this.isEditing ? editEmployee : addEmployee;
    store.dispatch(
      action({ ...this.employee, id: this.employee.id || Date.now() })
    );
    this._navigateToList();
  }

  _handleDialogConfirmed() {
    this.showConfirmationDialog = false;
    this._submitForm();
  }

  _handleDialogClosed() {
    this.showConfirmationDialog = false;
  }

  _isFormValid() {
    const hasErrors = Object.values(this.errorMessages).some(
      (message) => message
    );
    const requiredFieldsFilled =
      !!this.employee.firstName &&
      !!this.employee.lastName &&
      !!this.employee.email &&
      !!this.employee.phone;

    return !hasErrors && requiredFieldsFilled;
  }

  _navigateToList() {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new Event("popstate"));
  }
}

customElements.define("employee-form", EmployeeForm);
