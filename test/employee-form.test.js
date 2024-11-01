import {html, fixture, expect} from '@open-wc/testing';
import sinon from 'sinon';
import '../src/pages/EmployeeForm/EmployeeForm.js';
import {store} from '../src/state/store.js';
import {addEmployee, editEmployee} from '../src/state/store.js';

describe('EmployeeForm', () => {
  let el;

  beforeEach(async () => {
    // Reset the store before each test
    store.dispatch({type: 'RESET_EMPLOYEES', payload: []});
    el = await fixture(html`<employee-form></employee-form>`);
    el.disableNavigation = true; // Prevent navigation during tests
  });

  afterEach(() => {
    sinon.restore();
  });

  it('initializes with default values', () => {
    expect(el.employee).to.deep.equal({
      id: null,
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: 'Analytics',
      position: 'Junior',
    });
    expect(el.isEditing).to.be.false;
    expect(el.errorMessages).to.deep.equal({});
  });

  it('renders all form fields', () => {
    const form = el.shadowRoot.querySelector('form');
    expect(form).to.exist;

    const inputFields = el.shadowRoot.querySelectorAll(
      '.form-group input, .form-group select'
    );
    expect(inputFields.length).to.equal(8); // 8 form fields

    const labels = el.shadowRoot.querySelectorAll('.form-group label');
    expect(labels.length).to.equal(8);

    const actionButtons = el.shadowRoot.querySelectorAll('.actions button');
    expect(actionButtons.length).to.equal(2);
  });

  it('shows validation errors for invalid inputs', async () => {
    // Stub the validateField function to simulate validation errors
    const validateFieldStub = sinon
      .stub(el, '_validateField')
      .callsFake((field, value) => {
        el.errorMessages[field] = 'Invalid input';
      });

    const emailInput = el.shadowRoot.querySelector('input[type="email"]');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    await el.updateComplete;

    expect(el.errorMessages.email).to.equal('Invalid input');

    const errorMessage = el.shadowRoot.querySelector('.error-message');
    expect(errorMessage).to.exist;
    expect(errorMessage.textContent).to.equal('Invalid input');

    validateFieldStub.restore();
  });

  it('form is invalid when required fields are missing', () => {
    el.employee.firstName = '';
    el.employee.lastName = '';
    el.employee.email = '';
    el.employee.phone = '';

    el.errorMessages = {}; // Ensure no validation errors

    expect(el._isFormValid()).to.be.false;
  });

  it('form is invalid when there are validation errors', () => {
    el.employee.firstName = 'John';
    el.employee.lastName = 'Doe';
    el.employee.email = 'john.doe@example.com';
    el.employee.phone = '+1234567890';

    el.errorMessages = {firstName: 'Invalid first name'};

    expect(el._isFormValid()).to.be.false;
  });

  it('form is valid when all required fields are filled and no errors', () => {
    el.employee.firstName = 'Valid';
    el.employee.lastName = 'User';
    el.employee.email = 'valid.user@example.com';
    el.employee.phone = '+1234567890';
    el.errorMessages = {}; // No validation errors

    expect(el._isFormValid()).to.be.true;
  });

  it('dispatches addEmployee action on form submit when adding new employee', async () => {
    const dispatchSpy = sinon.spy(store, 'dispatch');

    // Fill in required fields
    el.employee.firstName = 'John';
    el.employee.lastName = 'Doe';
    el.employee.email = 'john.doe@example.com';
    el.employee.phone = '+1234567890';

    el.errorMessages = {}; // Ensure no validation errors
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('form');

    // Create a submit event that is cancelable
    const submitEvent = new Event('submit', {bubbles: true, cancelable: true});
    form.dispatchEvent(submitEvent);
    await el.updateComplete;

    expect(dispatchSpy.calledOnce).to.be.true;
    const dispatchedAction = dispatchSpy.getCall(0).args[0];
    expect(dispatchedAction.type).to.equal('ADD_EMPLOYEE');

    dispatchSpy.restore();
  });

  it('dispatches editEmployee action on form submit when editing employee', async () => {
    const dispatchSpy = sinon.spy(store, 'dispatch');

    // Simulate editing mode
    el.isEditing = true;
    el.employee.id = 1;
    el.employee.firstName = 'Jane';
    el.employee.lastName = 'Doe';
    el.employee.email = 'jane.doe@example.com';
    el.employee.phone = '+1234567890';

    el.errorMessages = {}; // Ensure no validation errors
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('form');

    // Create a submit event that is cancelable
    const submitEvent = new Event('submit', {bubbles: true, cancelable: true});
    form.dispatchEvent(submitEvent);
    await el.updateComplete;

    expect(dispatchSpy.calledOnce).to.be.true;
    const dispatchedAction = dispatchSpy.getCall(0).args[0];
    expect(dispatchedAction.type).to.equal('EDIT_EMPLOYEE');

    dispatchSpy.restore();
  });

  it('loads employee data from URL when in edit mode', async () => {
    // Add an employee to the store
    store.dispatch(
      addEmployee({
        id: 1,
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        phone: '+1234567890',
        department: 'Tech',
        position: 'Senior',
      })
    );

    // Use history.pushState to simulate path-based navigation
    window.history.pushState({}, '', '/edit/1');

    // Dispatch a popstate event to simulate the navigation event that the component listens for
    window.dispatchEvent(new Event('popstate'));

    // Create the component and ensure it picks up the new path
    const el = await fixture(html`<employee-form></employee-form>`);
    el.disableNavigation = true;

    expect(el.isEditing).to.be.true;
    expect(el.employee.firstName).to.equal('Alice');
  });

  it('clears the form when not in edit mode (no edit path)', async () => {
    // Simulate no edit path by setting the location to the root
    window.history.pushState({}, '', '/');

    // Dispatch a popstate event to simulate navigation
    window.dispatchEvent(new Event('popstate'));

    // Re-create the component
    const el = await fixture(html`<employee-form></employee-form>`);
    el.disableNavigation = true;

    expect(el.isEditing).to.be.false;
    expect(el.employee.id).to.be.null;
    expect(el.employee.firstName).to.equal('');
  });

  it('adds and removes event listeners', () => {
    const addEventListenerSpy = sinon.spy(window, 'addEventListener');
    const removeEventListenerSpy = sinon.spy(window, 'removeEventListener');

    const newEl = document.createElement('employee-form');
    document.body.appendChild(newEl);

    // Verify that 'popstate' event listener is added
    expect(addEventListenerSpy.calledWith('popstate')).to.be.true;

    document.body.removeChild(newEl);

    // Verify that 'popstate' event listener is removed
    expect(removeEventListenerSpy.calledWith('popstate')).to.be.true;

    addEventListenerSpy.restore();
    removeEventListenerSpy.restore();
  });
});
