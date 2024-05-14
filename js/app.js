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
    console.log(this.appointments);
    // this.saveAppointments();
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

  // Show Appointment in UI
};

function resetAppointmentObj() {
  appointmentObj.mascota = '';
  appointmentObj.propietario = '';
  appointmentObj.tel = '';
  appointmentObj.fecha = '';
  appointmentObj.hora = '';
  appointmentObj.sint = '';
};
