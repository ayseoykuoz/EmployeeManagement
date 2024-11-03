import { css } from "lit";

export default css`
  .navbar {
    background-color: var(--text-white);
    border-bottom: 1px solid var(--border-color);
    padding: var(--spacing-small) var(--spacing-large);
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

  .left-section,
  .right-section {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: var(--spacing-medium);
    color: var(--primary-color);
    text-decoration: none;
  }

  .logo-icon {
    width: 24px;
    height: 24px;
    opacity: 0.9;
  }

  .logo-text {
    font-weight: 600;
    font-size: var(--font-medium);
    color: var(--text-black);
    letter-spacing: -0.2px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
    color: var(--primary-color);
    text-decoration: none;
    height: 36px;
    padding: 0 var(--spacing-small);
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .nav-item svg {
    width: 16px;
    height: 16px;
  }

  .nav-item.active {
    color: var(--not-active-color);
  }

  .nav-item.active svg {
    opacity: 0.9;
  }

  .nav-item:hover {
    color: var(--primary-color);
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
    color: var(--text-black);
  }

  .add-new:hover {
    color: var(--primary-color);
  }

  .language-selector {
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 var(--spacing-small);
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
      padding: var(--spacing-small) var(--spacing-medium);
    }

    .nav-item span,
    .add-new span {
      display: none;
    }

    .right-section {
      gap: var(--spacing-small);
    }
  }
`;
