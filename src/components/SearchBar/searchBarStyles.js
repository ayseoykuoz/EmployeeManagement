import {css} from 'lit';
export default css`
  :host {
    display: block;
    width: 100%;
  }

  .search-container {
    position: relative;
    width: 100%;
    max-width: 800px; /* Optimal reading width */
    margin: 0 auto; /* Center the search bar if parent is wider */
  }

  .search-input {
    width: calc(100% - 1rem); /* Subtract margin from total width */
    padding: 14px 16px;
    padding-left: 48px;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.925rem;
    color: #4a5568;
    transition: all 0.2s ease;
    outline: none;
    margin-right: 1rem; /* Add right margin */
    box-sizing: border-box;
  }

  .search-input:focus {
    border-color: var(--primary-color, #ff6200);
    box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
  }

  .search-input::placeholder {
    color: #a0aec0;
  }

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #a0aec0;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  .search-input:focus + .search-icon {
    color: var(--primary-color, #ff6200);
  }

  .clear-button {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 6px;
    cursor: pointer;
    color: #a0aec0;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .clear-button:hover {
    color: #4a5568;
    background-color: #f7fafc;
  }

  .clear-button svg {
    width: 16px;
    height: 16px;
  }

  /* Hide clear button when input is empty */
  .search-input:placeholder-shown + .clear-button {
    display: none;
  }

  /* Responsive adjustments */
  @media (max-width: 840px) {
    /* 800px + 40px padding */
    .search-container {
      max-width: 100%;
    }
  }
`;
