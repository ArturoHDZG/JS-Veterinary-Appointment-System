import { newAppointment, appointmentData, initDB } from './../functions.js';
import {
  form, petInput, ownerInput, phoneInput,
  dateInput, timeInput, symptomsInput
} from './../selectors.js';

/**
 * The main application class.
 * Initializes the application and sets up event listeners.
 */
class App {
  /**
   * Constructs a new App instance.
   */
  constructor() {
    this.initApp();
  }

  /**
   * Initializes the application by setting up event listeners.
   */
  initApp() {
    initDB();
    // Event listener for form submission. Calls the newAppointment function.
    form.addEventListener('submit', newAppointment);

    // Event listeners for input field changes. Calls the appointmentData function.
    petInput.addEventListener('change', appointmentData);
    ownerInput.addEventListener('change', appointmentData);
    phoneInput.addEventListener('change', appointmentData);
    dateInput.addEventListener('change', appointmentData);
    timeInput.addEventListener('change', appointmentData);
    symptomsInput.addEventListener('change', appointmentData);
  }
}

export default App;
