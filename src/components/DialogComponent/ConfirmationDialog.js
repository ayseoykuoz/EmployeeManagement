import { LitElement, html } from "lit";
import confirmationDialogStyles from "./confirmationDialogStyles";
import { t } from "../../localization/localization.js";

export class ConfirmationDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    message: { type: String },
  };

  constructor() {
    super();
    this.open = false;
  }

  _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("dialog-closed"));
  }

  _confirm() {
    this.dispatchEvent(new CustomEvent("dialog-confirmed"));
    this._close();
  }

  static styles = [confirmationDialogStyles];

  render() {
    return html`
      <div
        class="dialog-backdrop"
        ?open=${this.open}
        @click=${(e) => {
          if (e.target === e.currentTarget) this._close();
        }}
      >
        <div class="dialog">
          <div class="dialog-header">
            <h2 class="dialog-title">${t("confirmationDialogTitle")}</h2>
            <button class="close-button" @click=${this._close}>
              <svg
                class="close-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="dialog-content">${this.message}</div>
          <div class="dialog-footer">
            <button class="btn btn-primary" @click=${this._confirm}>
              ${t("confirmationDialogConfirmText")}
            </button>
            <button class="btn btn-secondary" @click=${this._close}>
              ${t("confirmationDialogCancelText")}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("confirmation-dialog", ConfirmationDialog);
