import { LitElement, html } from "lit";
import navBarStyles from "./navBarStyles.js";
import { t, toggleLanguage } from "../../localization/localization.js";

export class NavBar extends LitElement {
  static properties = {
    currentLanguage: { type: String },
  };

  static styles = [navBarStyles];

  constructor() {
    super();
    this.currentLanguage = localStorage.getItem("appLanguage") || "en";
    this._handleLanguageChange = this._handleLanguageChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("language-changed", this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(
      "language-changed",
      this._handleLanguageChange
    );
  }

  _handleLanguageChange(event) {
    this.currentLanguage = event.detail.language;
    this.requestUpdate();
  }

  _isActive(page) {
    return window.location.pathname === page;
  }

  _handleNavigation(event, path) {
    event.preventDefault();
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  }

  _handleToggleLanguage() {
    toggleLanguage();
  }

  _getFlagUrl() {
    if (this.currentLanguage === "tr") {
      return "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg";
    } else if (this.currentLanguage === "en") {
      return "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg";
    }
    return "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg";
  }

  _getFlagAlt() {
    if (this.currentLanguage === "en") {
      return "English";
    } else if (this.currentLanguage === "tr") {
      return "Türkçe";
    }
    return "English";
  }

  render() {
    return html`
      <nav class="navbar">
        <div class="container">
          <div class="left-section">
            <a
              href="/"
              class="logo-section"
              @click="${(e) => this._handleNavigation(e, "/")}"
            >
              <img
                src="https://static.openfintech.io/payment_methods/ingpl/icon.svg?w=278&c=v0.59.26#w100"
                alt="ING Logo"
                class="logo-icon"
              />
              <span class="logo-text">ING</span>
            </a>
          </div>

          <div class="right-section">
            <a
              href="/"
              class="nav-item ${this._isActive("/") ? "active" : ""}"
              @click="${(e) => this._handleNavigation(e, "/")}"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
              <span>${t("employees")}</span>
            </a>

            <a
              href="/add"
              class="nav-item ${this._isActive("/add") ||
              this._isActive("/edit")
                ? "active"
                : ""}"
              @click="${(e) => this._handleNavigation(e, "/add")}"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              <span>${t("add_new")}</span>
            </a>

            <div
              class="language-selector"
              @click="${this._handleToggleLanguage}"
              title="${this.currentLanguage === "en" ? "Türkçe" : "English"}"
            >
              <img
                alt="${this._getFlagAlt()}"
                class="flag-icon"
                src="${this._getFlagUrl()}"
              />
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);
