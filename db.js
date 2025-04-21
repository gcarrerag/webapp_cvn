const Database = require('better-sqlite3');
const db = new Database('comandes.db');

// Crear la taula comandes si no existeix
db.exec(`
  CREATE TABLE IF NOT EXISTS comandes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    telefon TEXT,
    adreca TEXT,
    observacions TEXT,
    enviament TEXT,
    estat TEXT DEFAULT 'pendent',
    productes TEXT,
    data TEXT
  );
`);

// Crear la taula productes amb ANIMAL i CATEGORIA
db.exec(`
  CREATE TABLE IF NOT EXISTS productes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    descripcio TEXT,
    preu TEXT,
    imatge TEXT,
    stock INTEGER,
    animal TEXT,      -- 🐾 Nou camp
    categoria TEXT    -- 🍽️ Nou camp
  );
`);



// 🔥 Crear la taula de notícies si no existeix
db.exec(`
  CREATE TABLE IF NOT EXISTS noticies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titol TEXT,
    contingut TEXT,
    imatge TEXT,
    data TEXT
  )
`);


module.exports = db;

