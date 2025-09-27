# Blogs

Esta es una aplicación web tipo blog que permite a los usuarios registrarse, iniciar sesión y gestionar publicaciones (crear, editar, eliminar) de forma segura.
El proyecto se compone de un backend con API RESTful (Node.js, Express, MySQL) y un frontend en React como SPA responsiva

- **Backend:** API RESTful con Node.js, Express y MySQL.
- **Frontend:** SPA React con UI responsiva, editor enriquecido y gestión completa de posts.

---

## 🚀 Vea el proyecto en ejecución

Explore una demostración funcional de la aplicación haciendo clic en el siguiente enlace:

[![🚀 Visitar App](https://img.shields.io/badge/Visitar_App-brightgreen?style=for-the-badge&logo=appveyor)](https://my-blog-1-7r7j.onrender.com/)


## Puedes usar estas credenciales para iniciar sesión y explorar todas las funciones.

Usuario: Demo Usuario

Contraseña: demo1284

O bien, crea tu propia cuenta registrándote para acceder a todas las funciones.

---

## 📂 Estructura

### 🏠 Home
- Pantalla principal donde se muestran todas las categorías disponibles para publicar y explorar contenido.
- Acceso rápido a publicación y login.

### ✍️ Publicar 
- Página para crear posts (con editor enriquecido).
- Requiere inicio de sesión; redirige si no estás autenticado.

### 🔐 Inicio de sesión
- Autenticación para acceder a funciones como publicar, editar y eliminar posts.
- Navbar muestra saludo y opción para cerrar sesión.

### 📝 Registrarse 

- Registro rápido para nuevos usuarios.
- Permite gestionar publicaciones tras autenticarse.

---

## 💡 Características y aspectos destacados

- 🔐 Implementación de autenticación con JWT y seguridad con bcrypt.
- 🕒 Las publicaciones muestran fecha y hora.
- 🧾 Uso de React Quill como editor enriquecido.
- ✏️ Edición limitada al autor.
- 🗑️ Eliminación limitada al autor.
- ☁️ Subida y gestión de imágenes con Cloudinary + Multer.
---

## 🛠️ Tecnologías utilizadas

### 🛠️ Backend

| Tecnología         | Descripción breve                                          |
|--------------------|------------------------------------------------------------|
| **Node.js & Express** | API RESTful, manejo de rutas y lógica del servidor.         |
| **MySQL2**          | Conexión y gestión de base de datos relacional.   
| **Aiven (MySQL)**   |Servicio cloud utilizado para producción con conexión segura vía SSL.|
| **JWT**             | Autenticación mediante tokens seguros.                     |
| **bcryptjs**        | Encriptación de contraseñas.                               |
| **Multer**          | Subida de imágenes desde el frontend.                      |
| **Cloudinary**      | Almacenamiento y entrega de imágenes en la nube.          |
| **Nodemailer**      | Envío de emails (recuperación, notificaciones).            |
| **dotenv**          | Variables de entorno seguras.                             |
| **CORS**            | Permite solicitudes entre frontend y backend.              |
| **cookie-parser**   | Lectura y manejo de cookies.                              |
| **Nodemon**         | Recarga automática en desarrollo.                         |
| **Streamifier**     | Conversión de buffers a streams para subir imágenes.      |

### Frontend

| Tecnología             | Descripción                                                   |
|-----------------------|---------------------------------------------------------------|
| **React 18**          | Librería para construir la interfaz como SPA.                |
| **react-router-dom**   | Enrutamiento para navegación sin recargar.                    |
| **axios**             | Cliente HTTP para consumir la API backend.                    |
| **react-quill**       | Editor enriquecido para crear y editar posts.                 |
| **sass & sass-loader**| Preprocesador CSS para estilos organizados.                   |
| **sweetalert2**       | Librería para alertas y modales atractivos.                   |
| **moment.js**         | Formateo y manejo sencillo de fechas.                         |
| **react-icons**       | Iconos para mejorar la interfaz visualmente.                  |
| **html-react-parser** | Interpretación segura de HTML en componentes React.           |


---

## ⚙️ Instalación y ejecución de la aplicación

1. Clone el repositorio:

```bash
https://github.com/Leslie589/blog.git

### Backend (API)
cd Api

### Frontend (Client)
cd client 
```
2. Instale las depedencias:

```bash
npm install

# Ejecute la aplicación
npm start

```
---

## Uso de archivos .env

Este proyecto utiliza archivos de configuración .env tanto en el backend (api/.env) como en el frontend (client/.env), los cuales son esenciales para:

- Conectarse a la base de datos (Aiven MySQL)

- Subir imágenes mediante Cloudinary

- Definir la URL base del backend para el frontend

- Configurar seguridad, CORS y autenticación

⚠️ Los archivos .env contienen información sensible (como claves API y credenciales), por lo que no están incluidos en este repositorio por razones de seguridad.

📦 api/.env (Backend)
```bash
# Base de datos MySQL (Aiven o local)
DB_HOST=your-db-host.com
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Certificado SSL (solo si usas Aiven o similar)
DB_SSL_CERT=MIIC...base64...==

# Cloudinary para el manejo y almacenamiento de imágenes
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL para CORS (El proyecto esta desplegado en Render )
# api/.env
FRONTEND_URL=https://mi-blog-frontend.onrender.com

```

💻client/.env (Frontend)
```bash
# Dirección base del backend
# client/.env
REACT_APP_API_URL=https://mi-blog-backend.onrender.com/api

```

Nota sobre las URLs de entorno

Las variables FRONTEND_URL y REACT_APP_API_URL contienen las URLs públicas del frontend y backend desplegados en Render.

Si ejecutas el proyecto localmente, no necesitas estas URLs públicas.

En su lugar, debes configurar estas variables para que apunten a tus URLs locales, por ejemplo:

FRONTEND_URL=http://localhost:3000 (backend)

REACT_APP_API_URL=http://localhost:8800/api (frontend)
