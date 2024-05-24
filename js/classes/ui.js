import { deleteAppointment, editAppointment } from '../functions.js';
import { appointmentsContainer } from '../selectors.js';

/**
 * UI class for managing the user interface.
 */
class UI {
  /**
   * Inserts an alert message into the HTML.
   * @param {string} message - The message to display in the alert.
   * @param {string} type - The type of alert (error or success).
   */
  insertAlert(message, type) {
    const alert = document.createElement('DIV');
    const ALERT_DURATION = 5000; // milliseconds

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
    }, ALERT_DURATION);
  }

  /**
   * Inserts appointment cards into the HTML.
   * @param {object} data - The data object containing the appointments array.
   * @param {array} data.appointments - The array of appointment objects.
   */
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
      removeBtn.classList.add('btn', 'btn-danger', 'r-2');
      removeBtn.innerHTML = `
      Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
      `;
      removeBtn.onclick = () => deleteAppointment(id);

      // Add button to edit appointments
      const editBtn = document.createElement('button');
      editBtn.classList.add('btn', 'btn-info');
      editBtn.innerHTML = `
      Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
      </svg>
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
  }

  /**
   * Clears the HTML content of the appointments container.
   */
  clearHTML() {
    while (appointmentsContainer.firstChild) {
      appointmentsContainer.removeChild(appointmentsContainer.firstChild);
    }
  }
}

export default UI;
