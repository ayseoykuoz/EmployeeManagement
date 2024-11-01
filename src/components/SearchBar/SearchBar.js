import {LitElement, html} from 'lit';
import {t} from '../../localization/localization.js';
import searchBarStyles from './searchBarStyles.js';

export class SearchBar extends LitElement {
  static properties = {
    value: {type: String},
    placeholder: {type: String},
  };

  constructor() {
    super();
    this.value = '';
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', (event) => {
      this.currentLanguage = event.detail.language;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this._updateLanguage);
  }

  static styles = [searchBarStyles];
  render() {
    return html`
      <div class="search-container">
        <!-- Search Input -->
        <input
          type="text"
          class="search-input"
          .value="${this.value}"
          placeholder=${t('searchPlaceholder')}
          @input="${this._handleInput}"
          @keydown="${this._handleKeyDown}"
        />

        <!-- Search Icon -->
        <svg
          class="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>

        <!-- Clear Button -->
        ${this.value
          ? html`
              <button
                class="clear-button"
                @click="${this._handleClear}"
                title="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `
          : ''}
      </div>
    `;
  }

  _handleInput(event) {
    this.value = event.target.value;
    this._dispatchSearch();
  }

  _handleKeyDown(event) {
    if (event.key === 'Escape') {
      this._handleClear();
    }
  }

  _handleClear() {
    this.value = '';
    this._dispatchSearch();
    this.shadowRoot.querySelector('.search-input').focus();
  }

  _dispatchSearch() {
    this.dispatchEvent(
      new CustomEvent('search', {
        detail: {query: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('search-bar', SearchBar);
