import {css} from 'lit';

export default css`
  :host {
    display: block;
    --primary-blue-color: #172b53;
    --text-gray: #666666;
    --border-color: #eeeeee;
    --error-color: #dc3545;
    --success-color: #28a745;
    font-family: Arial, sans-serif;
  }

  .container {
    max-width: 800px;
    margin: 32px auto;
    padding: 0 24px;
  }

  .employee-form {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 24px;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-color);
  }

  h2 {
    font-size: 24px;
    color: var(--text-gray);
    margin: 0;
    font-weight: 500;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 14px;
    color: var(--text-gray);
    margin-bottom: 8px;
  }

  input,
  select {
    height: 15px;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    transition: border-color 0.2s;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  input:invalid {
    border-color: var(--error-color);
  }

  select {
    background-color: white;
    cursor: pointer;
    height: 35px;
  }

  .actions {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
  }

  button {
    padding: 10px 24px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
  }

  .btn-primary:hover {
    background-color: #ff7a33;
  }

  .btn-secondary {
    background-color: white;
    color: var(--primary-blue-color);
    border: 1px solid var(--primary-blue-color);
  }

  .btn-secondary:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    .container {
      padding: 16px;
      margin: 16px auto;
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .employee-form {
      padding: 16px;
    }

    .actions {
      flex-direction: column-reverse;
    }

    button {
      width: 100%;
    }
  }
`;
