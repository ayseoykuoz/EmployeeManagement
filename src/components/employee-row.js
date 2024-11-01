import {LitElement, html, css} from 'lit';

class EmployeeRow extends LitElement {
  static properties = {
    employee: {type: Object},
  };

  static styles = css`
    /* Styling for the row to match the table design */
  `;

  render() {
    const {
      firstName,
      lastName,
      dateOfEmployment,
      dateOfBirth,
      phone,
      email,
      department,
      position,
    } = this.employee;
    return html`
      <tr>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${dateOfEmployment}</td>
        <td>${dateOfBirth}</td>
        <td>${phone}</td>
        <td>${email}</td>
        <td>${department}</td>
        <td>${position}</td>
        <td>
          <button @click="${this._edit}">✏️</button>
          <button @click="${this._delete}">🗑️</button>
        </td>
      </tr>
    `;
  }

  _edit() {
    this.dispatchEvent(new CustomEvent('edit', {detail: this.employee}));
  }

  _delete() {
    this.dispatchEvent(new CustomEvent('delete', {detail: this.employee}));
  }
}

customElements.define('employee-row', EmployeeRow);
