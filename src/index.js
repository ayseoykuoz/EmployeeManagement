import { initRouter } from "./router/router.js";
import { initLocalization } from "./localization/localization.js";

const startApp = async () => {
  try {
    await initLocalization();
    const outlet = document.getElementById("app");
    initRouter(outlet);
  } catch (error) {
    console.error("Failed to initialize localization:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  startApp();
});
