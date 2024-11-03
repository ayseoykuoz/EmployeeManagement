import { css } from "lit";

export default css`
  :host {
    display: block;
    font-family: var(--font-family);
  }

  .container {
    max-width: 800px;
    margin: var(--spacing-large) auto;
    padding: 0 var(--spacing-medium);
  }

  .employee-form {
    background: var(--text-white);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: var(--spacing-medium);
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-medium);
    padding-bottom: var(--spacing-small);
    border-bottom: 1px solid var(--border-color);
  }

  h2 {
    font-size: var(--font-large);
    color: var(--text-color);
    margin: 0;
    font-weight: 500;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-large);
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: var(--font-small);
    color: var(--text-color);
    margin-bottom: var(--spacing-small);
  }

  input,
  select {
    height: 15px;
    padding: var(--spacing-small) var(--spacing-medium);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: var(--font-small);
    color: var(--text-black);
    transition: border-color 0.2s;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  select {
    background-color: var(--text-white);
    cursor: pointer;
    height: 35px;
  }

  .actions {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-medium);
    margin-top: var(--spacing-medium);
    padding-top: var(--spacing-medium);
    border-top: 1px solid var(--border-color);
  }

  .error-message {
    color: var(--error-color);
  }

  button {
    padding: var(--spacing-small) var(--spacing-large);
    border-radius: 4px;
    font-size: var(--font-small);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background-color: var(--primary-color);
    color: var(--text-white);
    border: none;
  }

  .btn-primary:hover {
    background-color: var(--primary-hover-color);
  }

  .btn-secondary {
    background-color: var(--text-white);
    color: var(--primary-blue-color);
    border: 1px solid var(--primary-blue-color);
  }

  .btn-secondary:hover {
    color: var(--text-white);
    background-color: var(--primary-blue-color);
    border: 1px solid var(--primary-blue-color);
  }

  @media (max-width: 768px) {
    .container {
      padding: var(--spacing-small);
      margin: var(--spacing-small) auto;
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-medium);
    }

    .employee-form {
      padding: var(--spacing-small);
    }

    .actions {
      flex-direction: column-reverse;
    }

    button {
      width: 100%;
    }
  }
`;
