import { LitElement, html, css } from "lit";
import paginationStyles from "./paginationStyles";

class Pagination extends LitElement {
  static properties = {
    currentPage: { type: Number },
    totalItems: { type: Number },
    itemsPerPage: { type: Number },
    maxVisiblePages: { type: Number, attribute: "max-visible-pages" },
  };

  constructor() {
    super();
    this.maxVisiblePages = 5;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  _getVisiblePages() {
    const pages = [];
    const totalPages = this.totalPages;
    const half = Math.floor(this.maxVisiblePages / 2);

    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(totalPages, this.currentPage + half);

    if (end - start + 1 < this.maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + this.maxVisiblePages - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }
    }

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);

    return pages;
  }

  static styles = [paginationStyles];

  render() {
    return html`
      <div class="pagination-container">
        <div class="pagination">
          <button
            class="nav-button"
            ?disabled="${this.currentPage === 1}"
            @click="${() => this._changePage(this.currentPage - 1)}"
          >
            ‹
          </button>

          ${this._getVisiblePages().map((page) =>
            page === "..."
              ? html`<span class="ellipsis">...</span>`
              : html`
                  <button
                    class="${page === this.currentPage ? "active" : ""}"
                    ?disabled="${page === this.currentPage}"
                    @click="${() => this._changePage(page)}"
                  >
                    ${page}
                  </button>
                `
          )}

          <button
            class="nav-button"
            ?disabled="${this.currentPage === this.totalPages}"
            @click="${() => this._changePage(this.currentPage + 1)}"
          >
            ›
          </button>
        </div>
      </div>
    `;
  }

  _changePage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.dispatchEvent(new CustomEvent("page-changed", { detail: { page } }));
    }
  }
}

customElements.define("pagination-element", Pagination);
