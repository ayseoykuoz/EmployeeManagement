import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100%;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: var(--spacing-small);
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
    font-family: var(--font-family);
  }

  button {
    min-width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    font-size: var(--font-small);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, color 0.2s ease;
    padding: 0;
    margin: 0;
  }

  button:hover:not([disabled]) {
    background-color: var(--primary-hover-color);
    color: var(--text-white);
  }

  button[disabled] {
    cursor: default;
    color: var(--border-color);
  }

  button.active {
    background-color: var(--primary-color);
    color: var(--text-white);
  }

  .ellipsis {
    padding: 0 var(--spacing-small);
    color: var(--text-color);
  }

  .nav-button {
    font-size: var(--font-medium);
    font-weight: bold;
    color: var(--primary-blue-color);
    transition: color 0.2s ease;
  }

  .nav-button:hover:not([disabled]) {
    background-color: var(--primary-blue-color);
    color: var(--text-white);
  }

  @media (max-width: 768px) {
    .pagination-container {
      padding: calc(var(--spacing-small) * 0.5);
    }

    button {
      font-size: calc(var(--font-small) * 0.9);
    }

    .nav-button {
      font-size: var(--font-small);
    }

    .ellipsis {
      padding: 0 calc(var(--spacing-small) * 0.5);
    }
  }

  @media (max-width: 480px) {
    button {
      min-width: 24px;
      height: 24px;
      font-size: calc(var(--font-small) * 0.8);
    }

    .nav-button {
      font-size: calc(var(--font-small) * 0.9);
    }

    .pagination {
      gap: calc(var(--spacing-small) * 0.5);
    }

    .ellipsis {
      padding: 0 calc(var(--spacing-small) * 0.25);
    }
  }
`;
