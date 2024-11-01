import {LitElement, html} from 'lit';
import navBarStyles from './navBarStyles.js';
import {t, toggleLanguage} from '../../localization/localization.js';

export class NavBar extends LitElement {
  static properties = {
    currentLanguage: {type: String},
  };

  static styles = [navBarStyles];

  constructor() {
    super();
    this.currentLanguage = 'en';
    this._handleLanguageChange = this._handleLanguageChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(
      'language-changed',
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
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  }

  _handleToggleLanguage() {
    toggleLanguage();
    const newLanguage = this.currentLanguage === 'en' ? 'tr' : 'en';
    document.dispatchEvent(
      new CustomEvent('language-changed', {
        detail: {language: newLanguage},
      })
    );
  }

  render() {
    return html`
      <nav class="navbar">
        <div class="container">
          <div class="left-section">
            <a
              href="/"
              class="logo-section"
              @click="${(e) => this._handleNavigation(e, '/')}"
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
              class="nav-item ${this._isActive('/') ? '' : 'active'}"
              @click="${(e) => this._handleNavigation(e, '/')}"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
              <span>${t('employees')}</span>
            </a>

            <a
              href="/add"
              class="nav-item ${this._isActive('/add') ||
              this._isActive('/edit')
                ? ''
                : 'active'}"
              @click="${(e) => this._handleNavigation(e, '/add')}"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              <span>${t('add_new')}</span>
            </a>

            <div
              class="language-selector"
              @click="${this._handleToggleLanguage}"
            >
              <img
                alt="${this.currentLanguage === 'en' ? 'TR' : 'UK'}"
                class="flag-icon"
                src="${this.currentLanguage === 'en'
                  ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cpath fill='%23E30A17' d='M0 0h1200v800H0z'/%3E%3Ccircle cx='425' cy='400' r='200' fill='white'/%3E%3Ccircle cx='475' cy='400' r='160' fill='%23E30A17'/%3E%3C/svg%3E"
                  : 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg'}"
              />
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
