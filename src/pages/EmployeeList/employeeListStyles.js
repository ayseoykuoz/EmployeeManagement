import { css } from "lit";

export default css`
  :host {
    display: block;
    font-family: var(--font-family);
    background-color: var(--background-color);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-large);
  }
  .no-data-message {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-large);
    margin: var(--spacing-large) 0;
    font-size: var(--font-medium);
    font-weight: 500;
    color: var(--text-gray);
    background-color: #f9fafb; /* Light gray background */
    border: 1px solid #e5e7eb; /* Soft border for definition */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .no-data-message::before {
    content: "🔍"; /* Placeholder icon */
    font-size: 24px;
    margin-right: var(--spacing-small);
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-medium);
  }

  .list-title {
    font-size: var(--font-large);
    font-weight: 600;
    color: var(--primary-color);
    margin: 0;
  }

  .search-section {
    margin-bottom: var(--spacing-large);
    padding: var(--spacing-small);
    background: var(--text-white);
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    width: 100%;
    box-sizing: border-box;
  }

  search-bar {
    max-width: 600px;
    margin: 0 auto;
    display: block;
    width: 100%;
  }

  .card-view {
    display: none;
  }

  .view-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
  }

  .view-btn {
    background: none;
    border: none;
    padding: var(--spacing-small);
    cursor: pointer;
    color: var(--text-color);
    transition: all 0.2s ease;
    border-radius: 4px;
  }

  .view-btn.active {
    color: var(--primary-color);
    background-color: rgba(255, 98, 0, 0.1);
  }

  .view-btn:hover {
    color: var(--primary-color);
    background-color: rgba(255, 98, 0, 0.05);
  }

  .view-btn svg {
    width: 20px;
    height: 20px;
  }

  .table-container {
    background: var(--text-white);
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow-x: auto;
  }

  table {
    width: 100%;
    font-size: var(--font-small);
    border-collapse: separate;
    border-spacing: 0;
    min-width: 800px;
  }

  th,
  td {
    padding: var(--spacing-medium);
    text-align: left;
    text-wrap: nowrap;
  }

  th {
    font-weight: 500;
    color: var(--primary-color);
    background: var(--text-white);
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }

  td {
    color: var(--text-gray);
    border-bottom: 1px solid var(--border-color);
  }

  .table-container.grid {
    display: flex;
    background: transparent;
    box-shadow: none;
    padding: var(--spacing-large);
  }

  .table-container.grid table {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-large);
    min-width: unset;
    justify-content: flex-start;
  }

  .table-container.grid thead {
    display: none;
  }

  .table-container.grid tbody {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-large);
    width: 100%;
  }

  .table-container.grid tr {
    width: 300px;
    flex: 0 0 300px;
    display: flex;
    flex-direction: column;
    background: var(--text-white);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin: 0;
  }

  .table-container.grid td {
    display: flex;
    padding: var(--spacing-small) var(--spacing-medium);
    border-bottom: 1px solid var(--border-color);
    align-items: center;
  }

  .table-container.grid td:first-child,
  .table-container.grid td:last-child {
    padding: var(--spacing-medium);
    background: var(--background-color);
  }

  .card-field {
    margin-bottom: var(--spacing-small);
  }

  .field-label {
    color: var(--primary-color);
  }

  .grid-card {
    background: var(--text-white);
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: var(--spacing-medium);
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .action-btn {
    padding: var(--spacing-small);
    border-radius: 6px;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    background: none;
    color: var(--primary-color);
  }

  .action-btn svg {
    width: 16px;
    height: 16px;
    stroke-width: 2;
  }

  .action-btn.edit:hover {
    background-color: rgba(255, 98, 0, 0.1);
  }

  .action-btn.delete:hover {
    background-color: rgba(220, 38, 38, 0.1);
  }

  .checkbox {
    width: 13px;
    height: 13px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    cursor: pointer;
    appearance: none;
    transition: all 0.2s ease;
  }

  .checkbox:checked {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  .checkbox:checked::after {
    content: "✓";
    color: var(--text-white);
    position: absolute;
    font-size: 12px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 1024px) {
    .container {
      padding: var(--spacing-medium);
    }

    .search-section {
      padding: var(--spacing-medium);
      margin-bottom: var(--spacing-medium);
    }

    .table-container.grid {
      padding: var(--spacing-medium);
    }

    .table-container.grid tbody {
      justify-content: center;
      gap: var(--spacing-medium);
    }
  }

  @media (max-width: 768px) {
    .list-header {
      flex-direction: column;
      gap: var(--spacing-small);
      align-items: flex-start;
    }

    .search-section {
      padding: calc(var(--spacing-small) * 0.875);
      margin-bottom: var(--spacing-small);
    }

    .list-title {
      font-size: calc(var(--font-large) * 0.8);
    }

    .card-view {
      display: block;
      font-size: 10px;
    }

    .employee-card {
      margin-bottom: var(--spacing-small);
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      padding: 7px 10px;
    }

    .table-container.table,
    .table-container.grid,
    .view-controls {
      display: none;
    }

    search-bar {
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: calc(var(--spacing-small) * 0.75);
    }

    .search-section {
      padding: calc(var(--spacing-small) * 0.75);
      margin-bottom: calc(var(--spacing-small) * 0.875);
    }

    .list-title {
      font-size: calc(var(--font-large) * 0.75);
    }

    .table-container.grid {
      padding: var(--spacing-small);
    }

    .table-container.grid td:not(:first-child):not(:last-child) {
      flex-direction: column;
      align-items: flex-start;
      gap: calc(var(--spacing-small) * 0.5);
    }

    .table-container.grid td:not(:first-child):not(:last-child)::before {
      width: 100%;
      margin-bottom: calc(var(--spacing-small) * 0.5);
    }
  }
`;
