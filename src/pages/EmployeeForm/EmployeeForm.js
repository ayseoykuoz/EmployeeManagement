import {LitElement, html} from 'lit';
import {store, addEmployee, editEmployee} from '../../state/store.js';
import employeeFormStyles from './employeeFormStyles.js';
import {validateField} from '../../utils/validationUtils.js';
import {t} from '../../localization/localization.js';

class EmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
    isEditing: {type: Boolean},
    errorMessages: {type: Object},
  };

  constructor() {
    super();
    this.employee = {
      id: null,
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '', // Combined field for country code and number
      email: '',
      department: 'Analytics',
      position: 'Junior',
    };
    this.isEditing = false;
    this.errorMessages = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadEmployeeFromPath();
    window.addEventListener('popstate', this._loadEmployeeFromPath);
    document.addEventListener('language-changed', this._updateLocalization);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._loadEmployeeFromPath);
    document.removeEventListener('language-changed', this._updateLocalization);
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
        this.employee = {...employee};
        this.isEditing = true;
      }
    } else {
      this.employee = {
        id: null,
        firstName: '',
        lastName: '',
        dateOfEmployment: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        department: 'Analytics',
        position: 'Junior',
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
            <h2>${this.isEditing ? t('editEmployee') : t('addNewEmployee')}</h2>
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
                  ${t('cancel')}
                </button>
                <button
                  type="submit"
                  class="btn-primary"
                  ?disabled="${!this._isFormValid()}"
                >
                  ${this.isEditing ? t('updateEmployee') : t('addEmployee')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  _renderInputFields() {
    return html`
      ${this._renderInputField(
        'firstName',
        t('firstName'),
        'text',
        t('onlyAlphabeticAllowed')
      )}
      ${this._renderInputField(
        'lastName',
        t('lastName'),
        'text',
        t('onlyAlphabeticAllowed')
      )}
      ${this._renderInputField(
        'dateOfEmployment',
        t('dateOfEmployment'),
        'date'
      )}
      ${this._renderInputField('dateOfBirth', t('dateOfBirth'), 'date')}

      <div class="form-group">
        <label>${t('phoneNumber')}</label>
        <input
          type="tel"
          pattern="^\\+\\d{10,13}$"
          placeholder="+905384166270"
          .value="${this.employee.phone}"
          @input="${(e) => this._updateField('phone', e)}"
          title="${t('phoneNumberTitle')}"
          required
        />

        ${this.errorMessages.phone
          ? html`<span class="error-message">${this.errorMessages.phone}</span>`
          : ''}
      </div>

      ${this._renderInputField('email', t('email'), 'email', t('validEmail'))}
      <div class="form-group">
        <label>${t('department')}</label>
        <select
          .value="${this.employee.department}"
          @change="${(e) => this._updateField('department', e)}"
        >
          <option>${t('analytics')}</option>
          <option>${t('tech')}</option>
        </select>
      </div>
      <div class="form-group">
        <label>${t('position')}</label>
        <select
          .value="${this.employee.position}"
          @change="${(e) => this._updateField('position', e)}"
        >
          <option>${t('junior')}</option>
          <option>${t('medior')}</option>
          <option>${t('senior')}</option>
        </select>
      </div>
    `;
  }

  _renderInputField(field, label, type, errorMessage = '') {
    return html`
      <div class="form-group">
        <label>${label}</label>
        <input
          type="${type}"
          .value="${this.employee[field]}"
          @input="${(e) => this._updateField(field, e)}"
          required
        />
        ${this.errorMessages[field]
          ? html`<span class="error-message"
              >${this.errorMessages[field]}</span
            >`
          : ''}
      </div>
    `;
  }

  _updateField(field, event) {
    this.employee = {...this.employee, [field]: event.target.value};
    this._validateField(field, event.target.value);
  }

  _validateField(field, value) {
    const errorMessage = validateField(field, value, this.employee.id);
    this.errorMessages = {...this.errorMessages, [field]: errorMessage};
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (this._isFormValid()) {
      const action = this.isEditing ? editEmployee : addEmployee;
      store.dispatch(
        action({...this.employee, id: this.employee.id || Date.now()})
      );
      this._navigateToList();
    }
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
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  }
}

customElements.define('employee-form', EmployeeForm);
