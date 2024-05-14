'use strict';

//* Selectors & Variables
// UI Elements
const form = document.querySelector('#nueva-cita');
const appointContainer = document.querySelector('#citas');
// Form Inputs
const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#tel');
const dateInput = document.querySelector('#fecha');
const timeInput = document.querySelector('#hora');
const symptomsInput = document.querySelector('#sint');

//* Listeners
eventListeners();
function eventListeners() {
  petInput.addEventListener('change', appointData);
  ownerInput.addEventListener('change', appointData);
  phoneInput.addEventListener('change', appointData);
  dateInput.addEventListener('change', appointData);
  timeInput.addEventListener('change', appointData);
  symptomsInput.addEventListener('change', appointData);
};

//* Objects
const appointObj = {
  mascota: '',
  propietario: '',
  tel: '',
  fecha: '',
  hora: '',
  sint: ''
};

//* Functions
function appointData(e) {
  appointObj[ e.target.name ] = e.target.value;
  console.log(appointObj);
  // e.preventDefault();
  // const pet = petInput.value;
  // const owner = ownerInput.value;
  // const phone = phoneInput.value;
  // const date = dateInput.value;
  // const time = timeInput.value;
  // const symptoms = symptomsInput.value;

  // if (pet === '' || owner === '' || phone === '' || date === '' || time === '' || symptoms === '') {
  //   showAlert('Todos los campos son obligatorios', 'error');
  // } else {
  //   const appoint = {
  //     pet,
  //     owner,
  //     phone,
  //     date,
  //     time,
  //     symptoms
  //   };
  //   console.log(appoint);
  //   saveAppoint(appoint);
  // }
};
