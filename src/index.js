
import {initRouter} from './router/router.js';

document.addEventListener('DOMContentLoaded', () => {
  const outlet = document.getElementById('app');
  initRouter(outlet);
});
