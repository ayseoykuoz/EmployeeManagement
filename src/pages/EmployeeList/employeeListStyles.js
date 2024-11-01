import {css} from 'lit';

export default css`
  :host {
    display: block;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, sans-serif;
    background-color: #f8f9fa;
    --primary-color: #ff6200;
    --border-color: #edf2f7;
    --text-gray: #4a5568;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* Header Styles */
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .list-title {
    font-size: 1.875rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 0;
  }

  /* Search Section Styles */
  .search-section {
    margin-bottom: 2rem;
    padding: 10px;
    background: white;
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

  /* Card View (Mobile) */
  .card-view {
    display: none;
  }

  /* View Controls */
  .view-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .view-btn {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #666666;
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

  /* Table Styles */
  .table-container {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow-x: auto;
  }

  table {
    width: 100%;
    font-size: 12px;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 800px;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
  }

  th {
    font-weight: 500;
    color: var(--primary-color);
    background: white;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }

  td {
    color: var(--text-gray);
    border-bottom: 1px solid var(--border-color);
  }

  /* Grid View Styles */
  .table-container.grid {
    display: flex;
    background: transparent;
    box-shadow: none;
    padding: 24px;
  }

  .table-container.grid table {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    min-width: unset;
    justify-content: flex-start;
  }

  .table-container.grid thead {
    display: none;
  }

  .table-container.grid tbody {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    width: 100%;
  }

  .table-container.grid tr {
    width: 300px;
    flex: 0 0 300px;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin: 0;
  }

  .table-container.grid td {
    display: flex;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    align-items: center;
  }

  .table-container.grid td:first-child {
    padding: 16px;
    background: #f8f9fa;
  }

  .table-container.grid td:last-child {
    padding: 16px;
    border-bottom: none;
    background: #f8f9fa;
  }

  /* Card Styles */
  .card-field {
    margin-bottom: 5px;
  }

  .field-label {
    color: var(--primary-color);
  }

  .grid-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 16px;
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
  }

  /* Actions */
  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .action-btn {
    padding: 8px;
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

  /* Checkbox */
  .checkbox {
    width: 13px;
    height: 13px;
    border: 1px solid #e2e8f0;
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
    content: '✓';
    color: white;
    position: absolute;
    font-size: 12px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* Responsive Styles */
  @media (max-width: 1024px) {
    .container {
      padding: 1rem;
    }

    .search-section {
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .table-container.grid {
      padding: 16px;
    }

    .table-container.grid tbody {
      justify-content: center;
      gap: 16px;
    }
  }

  @media (max-width: 768px) {
    .list-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .search-section {
      padding: 0.875rem;
      margin-bottom: 1rem;
    }

    .list-title {
      font-size: 1.5rem;
    }

    .card-view {
      display: block;
      font-size: 10px;
    }

    .employee-card {
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      padding: 7px 10px 10px 10px;
    }

    .table-container.table {
      display: none;
    }

    search-bar {
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0.75rem;
    }

    .search-section {
      padding: 0.75rem;
      margin-bottom: 0.875rem;
    }

    .list-title {
      font-size: 1.25rem;
    }

    .table-container.grid {
      padding: 8px;
    }

    .table-container.grid td:not(:first-child):not(:last-child) {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .table-container.grid td:not(:first-child):not(:last-child)::before {
      width: 100%;
      margin-bottom: 4px;
    }
  }
`;
