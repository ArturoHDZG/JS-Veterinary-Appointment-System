/**
 * Appointment management system.
 * @module Appointment
 */

import Appointment from './classes/Appointment.js';
import UI from './classes/UI.js';
import DB from './classes/DB.js';
import {
  form, petInput, ownerInput, phoneInput,
  dateInput, timeInput, symptomsInput
} from './selectors.js';

/**
 * @type {boolean} - Flag to indicate if the form is in editing mode.
 */
let editing;

/**
 * @type {string} - Name of the object store for appointments in IndexedDB.
 */
const appointments = 'appointments';

/**
 * @type {Object} - Object to store appointment data.
 */
const appointmentObj = {
  mascota: '',
  propietario: '',
  tel: '',
  fecha: '',
  hora: '',
  sint: ''
};

/**
 * @type {UI} - Instance of the UI class.
 */
const ui = new UI();

/**
 * @type {DB} - Instance of the DB class.
 */
const db = new DB(ui);

/**
 * @type {Appointment} - Instance of the Appointment class.
 */
const appointmentsManagement = new Appointment();

/**
 * Updates the appointment object with the input values from the form.
 * @param {Event} e - The event object representing the form input change.
 */
export function appointmentData(e) {
  appointmentObj[ e.target.name ] = e.target.value;
}

/**
 * Handles the creation or editing of appointments.
 * @param {Event} e - The event object representing the form submission.
 */
export function newAppointment(e) {
  e.preventDefault();
  const { mascota, propietario, tel, fecha, hora, sint } = appointmentObj;

  // Data validation
  if (
    mascota === '' || propietario === '' || tel === '' ||
    fecha === '' || hora === '' || sint === ''
  ) {
    ui.insertAlert('Todos los campos son obligatorios', 'error');
    return;
  }

  // Check if editing
  if (editing) {
    // Send appointment data to edit
    appointmentsManagement.editAppointment({ ...appointmentObj });

    const transaction = db.db.transaction([ appointments ], 'eadwrite');
    const objectStore = transaction.objectStore(appointments);
    objectStore.put(appointmentObj);

    transaction.oncomplete = () => {
      // Insert success message
      ui.insertAlert('Cita editada con éxito');

      // Change text submit button & disable edit mode
      form.querySelector('button[type="submit"]').textContent = 'Crear Cita';
      editing = false;
    };
  } else {
    // Add unique identifier
    appointmentObj.id = Date.now();

    // Create new appointment
    appointmentsManagement.addAppointment({ ...appointmentObj });

    const transaction = db.db.transaction([ appointments ], 'eadwrite');
    const objectStore = transaction.objectStore(appointments);
    objectStore.add(appointmentObj);

    transaction.oncomplete = () => {
      // Insert success message
      ui.insertAlert('Cita agregada con éxito');
    };
  }

  // Reset appointment object & form inputs
  resetAppointmentObj();
  form.reset();

  db.getAllAppointments().then(fetchedAppointments => {
    ui.showAppointments(fetchedAppointments);
  });
}

/**
 * Resets the appointment object to its initial state.
 */
export function resetAppointmentObj() {
  appointmentObj.mascota = '';
  appointmentObj.propietario = '';
  appointmentObj.tel = '';
  appointmentObj.fecha = '';
  appointmentObj.hora = '';
  appointmentObj.sint = '';
}

/**
 * Deletes an appointment from the appointments management.
 * @param {number} id - The unique identifier of the appointment to delete.
 */
export function deleteAppointment(id) {
  const transaction = db.db.transaction([ appointments ], 'eadwrite');
  const objectStore = transaction.objectStore(appointments);
  objectStore.delete(id);

  transaction.oncomplete = () => {
    // Insert success message
    ui.insertAlert('Cita eliminada con éxito');
    db.getAllAppointments().then(fetchedAppointments => {
      ui.showAppointments(fetchedAppointments);
    });
  };
}

/**
 * Fills the form inputs with appointment data and enables editing mode.
 * @param {Object} appointment - The appointment object containing the data to fill the form.
 */
export function editAppointment(appointment) {
  const { mascota, propietario, tel, fecha, hora, sint, id } = appointment;

  // Fill input fields
  petInput.value = mascota;
  ownerInput.value = propietario;
  phoneInput.value = tel;
  dateInput.value = fecha;
  timeInput.value = hora;
  symptomsInput.value = sint;

  // Fill appointment object
  appointmentObj.mascota = mascota;
  appointmentObj.propietario = propietario;
  appointmentObj.tel = tel;
  appointmentObj.fecha = fecha;
  appointmentObj.hora = hora;
  appointmentObj.sint = sint;
  appointmentObj.id = id;

  // Change text submit button & enable edit mode
  form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
  editing = true;
}

/**
 * Initializes the IndexedDB database for storing appointments.
 */
export function initDB() {
  db.createDB(appointments);
}
