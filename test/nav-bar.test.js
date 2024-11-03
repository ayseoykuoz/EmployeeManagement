import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "../src/components/NavigationBar/NavBar.js";
import {
  t,
  loadLanguage,
  setLanguage,
} from "../src/localization/localization.js";

describe("NavBar", () => {
  let el;

  before(async () => {
    await loadLanguage("en");
  });

  beforeEach(async () => {
    el = await fixture(html`<nav-bar></nav-bar>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("renders the logo correctly", () => {
    const logoSection = el.shadowRoot.querySelector(".logo-section");
    expect(logoSection).to.exist;

    const logoText = logoSection.querySelector(".logo-text");
    expect(logoText).to.exist;
    expect(logoText.textContent.trim()).to.equal("ING");
  });

  it("renders navigation items", () => {
    const navItems = el.shadowRoot.querySelectorAll(".nav-item");
    expect(navItems.length).to.equal(2);

    const employeesNav = navItems[0];
    const addNewNav = navItems[1];

    expect(employeesNav.querySelector("span").textContent.trim()).to.equal(
      t("employees")
    );
    expect(addNewNav.querySelector("span").textContent.trim()).to.equal(
      t("add_new")
    );
  });

  it("highlight the correct navigation item based on URL path", async () => {
    window.history.pushState({}, "", "/add"); // Update the URL path to /add
    await el.updateComplete;

    const navItems = el.shadowRoot.querySelectorAll(".nav-item");

    expect(navItems[0].classList.contains("active")).to.be.true;
    expect(navItems[1].classList.contains("active")).to.be.false;
  });

  it("updates currentLanguage when language-changed event is dispatched", async () => {
    document.dispatchEvent(
      new CustomEvent("language-changed", {
        detail: { language: "tr" },
      })
    );
    await el.updateComplete;

    expect(el.currentLanguage).to.equal("tr");
  });

  it("adds and removes event listeners on connect and disconnect", () => {
    const addEventListenerSpy = sinon.spy(document, "addEventListener");
    const removeEventListenerSpy = sinon.spy(document, "removeEventListener");

    const newEl = document.createElement("nav-bar");
    document.body.appendChild(newEl);

    expect(addEventListenerSpy.calledWith("language-changed")).to.be.true;

    document.body.removeChild(newEl);

    expect(removeEventListenerSpy.calledWith("language-changed")).to.be.true;

    addEventListenerSpy.restore();
    removeEventListenerSpy.restore();
  });

  it("cleans up event listeners on disconnect", () => {
    const removeEventListenerSpy = sinon.spy(document, "removeEventListener");
    el.disconnectedCallback();

    expect(removeEventListenerSpy.calledWith("language-changed")).to.be.true;
    removeEventListenerSpy.restore();
  });
});
