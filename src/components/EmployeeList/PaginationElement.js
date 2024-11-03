import { LitElement, html, css } from "lit";

class Pagination extends LitElement {
  static properties = {
    currentPage: { type: Number },
    totalItems: { type: Number },
    itemsPerPage: { type: Number },
  };


  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  render() {
    return html`
      <div class="pagination">
        <button
          ?disabled="${this.currentPage === 1}"
          @click="${() => this._changePage(this.currentPage - 1)}"
        >
          &lt;
        </button>
        ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map(
          (page) => html`
            <button
              ?disabled="${page === this.currentPage}"
              @click="${() => this._changePage(page)}"
            >
              ${page}
            </button>
          `
        )}
        <button
          ?disabled="${this.currentPage === this.totalPages}"
          @click="${() => this._changePage(this.currentPage + 1)}"
        >
          &gt;
        </button>
      </div>
    `;
  }

  _changePage(page) {
    this.dispatchEvent(new CustomEvent("page-changed", { detail: { page } }));
  }
}

customElements.define("pagination-element", Pagination);
