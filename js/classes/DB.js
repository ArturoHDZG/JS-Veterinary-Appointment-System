class DB {
  constructor(ui, db) {
    this.ui = ui;
    this.db = db;
  }
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
      objectStore.createIndex('sint', 'sint', { unique: false });
      objectStore.createIndex('id', 'id', { unique: true });

      this.ui.insertAlert('Base de datos creada con éxito');
    };
  }

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
}

export default DB;
