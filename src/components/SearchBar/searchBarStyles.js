import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100%;
  }

  .search-container {
    position: relative;
    width: 100%;
    max-width: 800px; 
    margin: 0 auto; 
  }

  .search-input {
    width: calc(100% - var(--spacing-small)); 
    padding: var(--spacing-medium);
    padding-left: calc(var(--spacing-medium) + 32px); 
    background-color: var(--text-white);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: var(--font-small);
    color: var(--text-color);
    transition: all 0.2s ease;
    outline: none;
    margin-right: var(--spacing-small); 
    box-sizing: border-box;
  }

  .search-input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
  }

  .search-input::placeholder {
    color: #a0aec0;
  }

  .search-icon {
    position: absolute;
    left: var(--spacing-medium);
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #a0aec0;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  .search-input:focus + .search-icon {
    color: var(--primary-color);
  }

  .clear-button {
    position: absolute;
    right: var(--spacing-small);
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: var(--spacing-small);
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

  .search-input:placeholder-shown + .clear-button {
    display: none;
  }

  @media (max-width: 840px) {
    .search-container {
      max-width: 100%;
    }
  }
`;
