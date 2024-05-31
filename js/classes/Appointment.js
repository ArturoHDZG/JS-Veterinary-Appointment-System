/**
 * Appointment class to manage appointments.
 */
class Appointment {
  /**
   * Constructor initializes an empty array for appointments.
   */
  constructor() {
    this.appointments = [];
  }

  /**
   * Adds a new appointment to the appointments array.
   * @param {Object} appointment - The appointment object to be added.
   */
  addAppointment(appointment) {
    this.appointments = [...this.appointments, appointment ];
  }

  /**
   * Deletes an appointment from the appointments array based on the given id.
   * @param {number} id - The id of the appointment to be deleted.
   */
  deleteAppointment(id) {
    this.appointments = this.appointments.filter(
      appointment => appointment.id!== id
    );
  }

  /**
   * Edits an existing appointment in the appointments array based on the given updated appointment object.
   * @param {Object} updatedAppointment - The updated appointment object.
   * @returns {void}
   */
  editAppointment(updatedAppointment) {
    this.appointments = this.appointments.map(
      appointment => appointment.id === updatedAppointment.id? updatedAppointment : appointment
    );
  }
}

export default Appointment;
