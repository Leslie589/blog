
import express from "express";                  // Framework web
import authRoutes from "./routes/auth.js";      // Rutas de autenticación
import userRoutes from "./routes/users.js";     // Rutas de usuarios
import postRoutes from "./routes/posts.js";     // Rutas de posts
import cookieParser from "cookie-parser";       // Para leer cookies
import multer from "multer";                     // Manejo de uploads de archivos
import cors from "cors";                         // Control de acceso entre dominios
import path from "path";                         // Manejo de rutas de archivos
import { fileURLToPath } from "url";             // Convertir URL a ruta de archivo
import streamifier from "streamifier"; // Permite convertir buffer en stream para subir a Cloudinary
import { v2 as cloudinary } from "cloudinary";

// Inicialización de la aplicación Express
const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: process.env.FRONTEND_URL, // URL permitida para solicitudes (frontend)
  credentials: true,                // Permite enviar cookies en las solicitudes
}));


// Variables para obtener la ruta y directorio actual con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*Configuración de Multer para almacenamiento en memoria
 No se guardan archivos en disco, se mantienen en buffer en memoria*/
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* Función para subir un buffer de archivo a Cloudinary
 Recibe el buffer del archivo y la carpeta destino en Cloudinary*/
const uploadToCloudinary = (fileBuffer, folder = "default") => {
  return new Promise((resolve, reject) => {
    // Se crea un stream de subida a Cloudinary con la carpeta especificada
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) {
          resolve(result); // Si sube correctamente, se resuelve con el resultado
        } else {
          reject(error); // Si hay error, se rechaza la promesa
        }
      }
    );
    // Convierte el buffer a un stream legible y lo conecta al stream de subida
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

/* Ruta para subir archivos asociados a posts
 Utiliza multer para procesar un archivo llamado "file" en la solicitud*/
app.post("/api/uploads", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se recibió ningún archivo" });
  }
  try {
    const result = await uploadToCloudinary(req.file.buffer, "posts");
    res.status(200).json({
      message: "Archivo subido correctamente",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
     console.error("Error al subir imagen:", err); 
    res.status(500).json({ error: "Error al subir imagen", details: err.message });
  }
});


/* Ruta para subir imágenes de usuarios
 Similar a la anterior pero los archivos se guardan en la carpeta "users"*/
app.post("/api/uploads/users", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se recibió ningún archivo" });
  }
  try {
    const result = await uploadToCloudinary(req.file.buffer, "users");
    res.status(200).json({
      message: "Imagen de usuario subida correctamente",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
     console.error("Error al subir imagen:", err); 
    res.status(500).json({ error: "Error al subir imagen de usuario", details: err.message });
  }
});

// Registro de rutas para funcionalidades de posts, autenticación y usuarios
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Servidor conectado en puerto ${PORT}!`);
});


