console.log('index.js loaded');
import {initRouter} from './router/router.js';

document.addEventListener('DOMContentLoaded', () => {
  const outlet = document.getElementById('app');
  initRouter(outlet);
});
