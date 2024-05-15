'use strict';

//* Selectors & Variables
// UI Elements
const form = document.querySelector('#nueva-cita');
const appointmentsContainer = document.querySelector('#citas');
// Form Inputs
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

      // Inputs Scripting
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

      // Add Button to remove Appointments
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('btn', 'btn-danger', 'mr-2');
      removeBtn.innerHTML = `
      Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      `;
      removeBtn.onclick = () => deleteAppointment(id);

      // Add Paragraphs to div & insert to HTML
      div.appendChild(petParagraph);
      div.appendChild(ownerParagraph);
      div.appendChild(phoneParagraph);
      div.appendChild(dateParagraph);
      div.appendChild(timeParagraph);
      div.appendChild(symptomsParagraph);
      div.appendChild(removeBtn);
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

  // Data Validation
  if (
    mascota === '' || propietario === '' || tel === '' ||
    fecha === '' || hora === '' || sint === ''
  ) {
    ui.insertAlert('Todos los campos son obligatorios', 'error');
    return;
  }

  // Add unique identifier
  appointmentObj.id = Date.now();

  // Create New Appointment
  appointmentsManagement.addAppointment({ ...appointmentObj });

  // Reset Appointment Object & Form Inputs
  resetAppointmentObj();
  form.reset();

  // Show Appointments in UI
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
