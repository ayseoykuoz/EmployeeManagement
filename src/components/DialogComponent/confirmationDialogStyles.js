import { css } from "lit";

export default css`
  :host {
    --dialog-width: 450px;
  }

  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out;
  }

  .dialog-backdrop[open] {
    opacity: 1;
    visibility: visible;
  }

  .dialog {
    background: white;
    border-radius: 16px;
    width: var(--dialog-width);
    max-width: 90vw;
    transform: scale(0.9);
    opacity: 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  }

  .dialog-backdrop[open] .dialog {
    transform: scale(1);
    opacity: 1;
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
    position: relative;
  }

  .dialog-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-color);
    margin: 0;
  }

  .close-button {
    position: absolute;
    right: 16px;
    top: 16px;
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: var(--primary-color);
    transition: color 0.2s ease;
  }

  .close-button:hover {
    color: #4b5563;
  }

  .close-button svg {
    width: 20px;
    height: 20px;
  }

  .dialog-content {
    padding: 20px 24px;
    color: #6b7280;
    font-size: 16px;
    line-height: 1.5;
  }

  .dialog-footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 24px 24px;
  }

  .btn {
    padding: 12px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    text-align: center;
    border: 1px solid transparent;
  }

  .btn-primary {
    background-color: var(--primary-color);
    color: white;
  }

  .btn-primary:hover {
    background-color: #e65800;
  }

  .btn-secondary {
    background-color: white;
    color: var(--primary-blue-color);
    border: 1px solid var(--primary-blue-color);
  }

   .btn-secondary:hover {

  color: var(--text-white);
  background-color: var(--primary-blue-color);
  border: 1px solid var(--primary-blue-color);
}

  .close-icon {
    color: #9ca3af;
    width: 24px;
    height: 24px;
  }
`;
