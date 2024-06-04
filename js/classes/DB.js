/**
 * Database class for managing appointments.
 * @class DB
 */
class DB {
  /**
   * Constructor for DB class.
   * @param {UI} ui - The UI class instance.
   * @param {IDBDatabase} db - The IndexedDB database instance.
   */
  constructor(ui, db) {
    this.ui = ui;
    this.db = db;
    this.appointments = 'appointments';
  }

  /**
   * Creates a new IndexedDB database for storing appointments.
   */
  createDB() {
    const createDBConfig = window.indexedDB.open('appointments', 1);

    createDBConfig.onerror = () => {
      this.ui.insertAlert('Hubo un error, intenta de nuevo', 'error');
    };

    createDBConfig.onsuccess = () => {
      this.db = createDBConfig.result;
      this.readDB();
    };

    createDBConfig.onupgradeneeded = () => {
      const db = createDBConfig.result;
      const objectStore = db.createObjectStore('appointments', {
        keyPath: 'id',
        autoIncrement: true
      });

      objectStore.createIndex('mascota', 'mascota', { unique: false });
      objectStore.createIndex('propietario', 'propietario', { unique: false });
      objectStore.createIndex('tel', 'tel', { unique: false });
      objectStore.createIndex('fecha', 'fecha', { unique: false });
      objectStore.createIndex('hora', 'hora', { unique: false });
      objectStore.createIndex('sint', 'int', { unique: false });
      objectStore.createIndex('id', 'id', { unique: true });

      this.ui.insertAlert('Base de datos creada con éxito');
    };
  }

  /**
   * Reads all appointments from the IndexedDB database and displays them in the UI.
   */
  readDB() {
    const appointments = [];
    const objectStore = this.db.transaction('appointments').objectStore('appointments');
    objectStore.openCursor().onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        appointments.push(cursor.value);
        cursor.continue();
      }

      this.ui.showAppointments(appointments);
    };
  }

  /**
   * Retrieves all appointments from the IndexedDB database.
   * @returns {Promise<Array>} A promise that resolves with an array of appointments.
   */
  getAllAppointments() {
    return new Promise((resolve, reject) => {
      const request = this.db.transaction([ this.appointments ], 'readonly')
     .objectStore(this.appointments)
     .getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}

export default DB;
