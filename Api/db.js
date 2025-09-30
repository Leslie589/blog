import mysql from "mysql2";       // Cliente MySQL para Node.js
import dotenv from "dotenv";      // Carga variables de entorno desde archivo .env
import fs from "fs";              // Módulo para manipulación de archivos
import path from "path";          // Módulo para manejo de rutas de archivos
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary v2

dotenv.config(); // Cargar variables de entorno desde .env

// Definición de la ruta donde se guardará el certificado SSL decodificado
const certPath = path.resolve("c/ca-from-env.pem");

/* Decodifica el certificado SSL que está en base64 en la variable de entorno DB_SSL_CERT
 y escribe el contenido decodificado en un archivo local para usarlo luego en la conexión SSL*/
 
const decodedCert = Buffer.from(process.env.DB_SSL_CERT, "base64").toString("utf-8");
fs.writeFileSync(certPath, decodedCert); // Guarda el certificado en disco

// Crear la conexión a la base de datos MySQL con configuración segura SSL
export const db = mysql.createConnection({
  host: process.env.DB_HOST,         // Host de la base de datos
  port: Number(process.env.DB_PORT), // Puerto de conexión (convertido a número)
  user: process.env.DB_USER,         // Usuario para autenticación
  password: process.env.DB_PASSWORD, // Contraseña del usuario
  database: process.env.DB_NAME,     // Nombre de la base de datos
  ssl: {
    ca: fs.readFileSync(certPath),  // Certificado de la autoridad certificadora para SSL
    rejectUnauthorized: true,        // Rechaza conexiones si el certificado no es válido
  },
});



// Intento de conexión a la base de datos
db.connect((err) => {
  if (err) {
    // Si ocurre un error al conectar, se imprime en consola
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  // Si la conexión es exitosa, mensaje confirmando la conexión
  console.log("Conectado a la base de datos MySQL");
});

  

// --- CONFIGURACIÓN DE CLOUDINARY ---

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


