'use strict';

//* Selectors & Variables
// UI elements
const form = document.querySelector('#nueva-cita');
const appointmentsContainer = document.querySelector('#citas');
// Form inputs
const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#tel');
const dateInput = document.querySelector('#fecha');
const timeInput = document.querySelector('#hora');
const symptomsInput = document.querySelector('#sint');

//* Classes
class Appointment {
  constructor() {
    this.appointments = [];
  }

  addAppointment(appointment) {
    this.appointments = [ ...this.appointments, appointment ];
  }

  deleteAppointment(id) {
    this.appointments = this.appointments.filter(appointment => appointment.id!== id);
  }
}

class UI {
  insertAlert(message, type) {
    const alert = document.createElement('DIV');
    alert.textContent = message;
    alert.classList.add('text-center', 'alert', 'd-block', 'col-12');

    if (type === 'error') {
      alert.classList.add('alert-danger');
    } else {
      alert.classList.add('alert-success');
    }

    document.querySelector('#contenido').insertBefore(alert, document.querySelector('.agregar-cita'));

    setTimeout(() => {
      alert.remove();
    }, 5000);
  };

  insertAppointments({ appointments }) {
    this.clearHTML();

    appointments.forEach(appointment => {
      const {
        mascota, propietario, tel, fecha, hora, sint, id
      } = appointment;
      const div = document.createElement('DIV');
      div.classList.add('cita', 'p-3');
      div.dataset.id = id;

      // Inputs scripting
      const petParagraph = document.createElement('H2');
      petParagraph.classList.add('card-title', 'font-weight-bolder');
      petParagraph.textContent = mascota;

      const ownerParagraph = document.createElement('P');
      ownerParagraph.innerHTML = `
      <span class="font-weight-bolder">Propietario:</span> ${propietario}`;

      const phoneParagraph = document.createElement('P');
      phoneParagraph.innerHTML = `
      <span class="font-weight-bolder">Teléfono:</span> ${tel}
      `;

      const dateParagraph = document.createElement('P');
      dateParagraph.innerHTML = `
      <span class="font-weight-bolder">Fecha:</span> ${fecha}
      `;

      const timeParagraph = document.createElement('P');
      timeParagraph.innerHTML = `
      <span class="font-weight-bolder">Hora:</span> ${hora}
      `;

      const symptomsParagraph = document.createElement('P');
      symptomsParagraph.innerHTML = `
      <span class="font-weight-bolder">Síntomas:</span> ${sint}
      `;

      // Add button to remove appointments
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('btn', 'btn-danger', 'mr-2');
      removeBtn.innerHTML = `
      Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
      `;
      removeBtn.onclick = () => deleteAppointment(id);

      // Add button to edit appointments
      const editBtn = document.createElement('button');
      editBtn.classList.add('btn', 'btn-info');
      editBtn.innerHTML = `
      Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
      `;
      editBtn.onclick = () => editAppointment(appointment);

      // Add paragraphs into div & insert to HTML
      div.appendChild(petParagraph);
      div.appendChild(ownerParagraph);
      div.appendChild(phoneParagraph);
      div.appendChild(dateParagraph);
      div.appendChild(timeParagraph);
      div.appendChild(symptomsParagraph);
      div.appendChild(removeBtn);
      div.appendChild(editBtn);
      appointmentsContainer.appendChild(div);
    });
  };

  clearHTML() {
    while (appointmentsContainer.firstChild) {
      appointmentsContainer.removeChild(appointmentsContainer.firstChild);
    }
  }
}

//* Instances
const ui = new UI();
const appointmentsManagement = new Appointment();
let editing;

//* Listeners
eventListeners();
function eventListeners() {
  petInput.addEventListener('change', appointmentData);
  ownerInput.addEventListener('change', appointmentData);
  phoneInput.addEventListener('change', appointmentData);
  dateInput.addEventListener('change', appointmentData);
  timeInput.addEventListener('change', appointmentData);
  symptomsInput.addEventListener('change', appointmentData);

  form.addEventListener('submit', newAppointment);
};

//* Objects
const appointmentObj = {
  mascota: '',
  propietario: '',
  tel: '',
  fecha: '',
  hora: '',
  sint: ''
};

//* Functions
function appointmentData(e) {
  appointmentObj[ e.target.name ] = e.target.value;
};

function newAppointment(e) {
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
    // Insert success message
    ui.insertAlert('Cita editada con éxito');
    form.querySelector('button[type="submit"]').textContent = 'Crear Cita';
    editing = false;
  } else {
    // Add unique identifier
    appointmentObj.id = Date.now();

    // Create new appointment
    appointmentsManagement.addAppointment({ ...appointmentObj });

    // Insert success message
    ui.insertAlert('Cita agregada con éxito');
  }

  // Reset appointment object & form inputs
  resetAppointmentObj();
  form.reset();

  // Show appointments in UI
  ui.insertAppointments(appointmentsManagement);
};

function resetAppointmentObj() {
  appointmentObj.mascota = '';
  appointmentObj.propietario = '';
  appointmentObj.tel = '';
  appointmentObj.fecha = '';
  appointmentObj.hora = '';
  appointmentObj.sint = '';
};

function deleteAppointment(id) {
  appointmentsManagement.deleteAppointment(id);
  ui.insertAlert('Cita eliminada con éxito');
  ui.insertAppointments(appointmentsManagement);
};

function editAppointment(appointment) {
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

  // Change text submit button
  form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
  editing = true;
};
