import { css } from "lit";
export default css`
  :host {
    display: block;
    font-family: var(--font-family);
  }

  .navbar {
    background-color: var(---text-white, #ffffff);
    border-bottom: 1px solid var(--border-color, #eeeeee);
    padding: 12px 24px;
    height: 20px;
    margin: 40px 20px 5px;
    display: flex;
    align-items: center;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--primary-color, #ff6200);
    text-decoration: none;
  }

  .logo-icon {
    width: 24px;
    height: 24px;
    opacity: 0.9;
  }

  .logo-text {
    font-weight: 600;
    font-size: 16px;
    color: var(--text-black, #333333);
    letter-spacing: -0.2px;
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--primary-color, #ff6200);
    text-decoration: none;
    height: 36px;
    padding: 0 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .nav-item svg {
    width: 16px;
    height: 16px;
  }

  .nav-item.active {
    color: var(--not-active-color, #f4b88e);
  }

  .nav-item.active svg {
    opacity: 0.9;
  }

  .nav-item:hover {
    color: var(--primary-color, #ff6200);
  }

  .nav-item:hover svg {
    opacity: 1;
  }

  .add-new svg {
    width: 20px;
    height: 20px;
  }

  .add-new.active {
    font-weight: 600;
    color: var(--text-black, #333333);
  }

  .add-new.active svg {
    opacity: 0.9;
  }

  .add-new:hover {
    color: var(--primary-color, #ff6200);
  }

  .add-new:hover svg {
    opacity: 1;
  }

  .language-selector {
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .language-selector:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .flag-icon {
    width: 24px;
    height: 24px;
    opacity: 0.9;
  }

  .language-selector:hover .flag-icon {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 12px 16px;
    }

    .nav-item span {
      display: none;
    }

    .right-section {
      gap: 4px;
    }

    .add-new span {
      display: none;
    }
  }
`;
