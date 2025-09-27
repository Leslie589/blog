# Blogs

Este proyecto es una aplicación web de blog desarrollada con tecnologías modernas, que permite a los usuarios registrarse, iniciar sesión y gestionar publicaciones (crear, editar y eliminar) de manera segura y eficiente.

El sistema está dividido en dos partes claramente definidas: un backend que provee una API RESTful para la gestión de datos y autenticación, y un frontend interactivo desarrollado con React para una experiencia de usuario fluida y responsiva.
The application integrates two external APIs to provide up-to-date and reliable content:

- **Backend:** API RESTful con Node.js, Express y MySQL.
- **Frontend:** SPA React con UI responsiva, editor enriquecido y gestión completa de posts.

---

## 🚀 Vea el proyecto en ejecución

Explore una demostración funcional de la aplicación haciendo clic en el siguiente enlace:


[![🚀 Visitar App](https://img.shields.io/badge/Visitar_App-brightgreen?style=for-the-badge&logo=appveyor)](https://my-blog-1-7r7j.onrender.com/)



---

## 📂 Estructura

### 🏠 Home
- Pantalla principal donde se muestran todas las categorías disponibles para publicar y explorar contenido.
  
**Además, en esta pantalla se encuentra:**
- El botón para publicar nuevo contenido.
- El enlace para acceder al inicio de sesión.
  

### ✍️ Publicar 
- Página donde los usuarios registrados pueden crear y publicar nuevos posts.
- El editor es enriquecido (React Quill) y permite agregar texto, imágenes y formato.
- Restricción: Para acceder a la sección de publicar y crear contenido, es obligatorio iniciar sesión.
- Si el usuario no está autenticado, será redirigido al login o verá un mensaje para iniciar sesión.


### 🔐 Inicio de sesión
La página de inicio de sesión permite al usuario autenticarse para acceder a funciones avanzadas de la aplicación.

**Una vez iniciado sesión, el usuario podrá:**
- Publicar nuevas publicaciones.
- Editar o eliminar sus publicaciones existentes, identificadas mediante JWT y su ID.
- Ver un mensaje de bienvenida con su nombre de usuario en el navbar.
- Cerrar sesión desde la misma interfaz de navegación.


### 📝 Registrarse 
Si el usuario no tiene una cuenta, puede registrarse fácilmente desde la aplicación.

**Una vez registrado, podrá:**
- Publicar nuevas publicaciones.
- Editar o eliminar sus propias publicaciones posteriormente, gracias a la autenticación mediante JWT y su ID.

---

## 💡 Características y aspectos destacados

- 🔐 Autenticación con inicio de sesión: Solo los usuarios autenticados pueden crear publicaciones.
- 🕒 Tiempos visibles: Cada publicación muestra la fecha y hora en la que fue publicada.
- 🧾 Publicar contenido: Los usuarios registrados pueden subir nuevas publicaciones (texto, imágenes, etc.)
- ✏️ Edición limitada al autor: Solo el autor original de una publicación puede editarla.
- 🗑️ Eliminación segura: Los usuarios pueden eliminar únicamente sus propias publicaciones.
- 🙋‍♂️ Bienvenida personalizada: Al iniciar sesión, el navbar muestra un saludo personalizado con el nombre del usuario.
- 🚪 Opción para cerrar sesión: Accesible desde la barra de navegación para terminar la sesión en cualquier momento.
---

## 🛠️ Tecnologías utilizadas

### Backend

| Tecnología       | Descripción                                                                                     |
|------------------|-------------------------------------------------------------------------------------------------|
| **Node.js & Express**   | Plataforma y framework para construir la API RESTful, manejando rutas, middlewares y lógica.      |
| **MySQL2**        | Cliente MySQL para conectar y manejar la base de datos relacional.                              |
| **jsonwebtoken (JWT)** | Para crear y validar tokens seguros que autentican a los usuarios.                             |
| **bcryptjs**      | Librería para hashear y validar contraseñas, asegurando almacenamiento seguro.                  |
| **multer**        | Middleware para manejar la subida de archivos (imágenes) desde el frontend.                     |
| **cloudinary**    | Servicio en la nube para almacenar y servir imágenes de forma eficiente y escalable.            |
| **nodemailer**    | Para enviar correos electrónicos, usado en notificaciones y recuperación de cuenta.             |
| **dotenv**        | Carga variables de entorno desde un archivo `.env` para mantener secretos fuera del código.     |
| **cors**          | Middleware para habilitar el intercambio de recursos entre distintos orígenes (CORS).           |
| **cookie-parser** | Analiza cookies en las peticiones para manejar sesiones o datos almacenados en cookies.        |
| **nodemon**       | Herramienta para reiniciar automáticamente el servidor en desarrollo tras cambios en el código.|
| **streamifier**   | Convierte buffers en streams, usado para subir archivos a Cloudinary. 



### Frontend

| Tecnología             | Descripción                                                                                   |
|------------------------|-----------------------------------------------------------------------------------------------|
| **React 18**           | Librería para construir la interfaz de usuario como una SPA (Single Page Application).       |
| **react-router-dom**   | Maneja el enrutamiento en el cliente para navegación entre páginas sin recargar.              |
| **axios**              | Cliente HTTP para consumir la API backend de forma sencilla y eficiente.                      |
| **react-quill**        | Editor WYSIWYG para crear y editar posts con formato enriquecido (negrita, listas, imágenes). |
| **sass & sass-loader** | Preprocesador CSS para escribir estilos más organizados y mantenibles.                        |
| **sweetalert2**        | Librería para mostrar alertas y modales visualmente atractivos y configurables.               |
| **moment.js**          | Manipulación y formato sencillo de fechas y tiempos.                                         |
| **react-icons**        | Conjunto de iconos para mejorar la UI con iconografía clara y visual.                         |
| **html-react-parser**  | Permite interpretar HTML dentro de componentes React de forma segura y dinámica.             |
| **@testing-library/react** | Herramienta para pruebas unitarias y de integración en componentes React.                   |
| **@testing-library/jest-dom** | Extensiones para Jest que facilitan assertions más legibles en tests de DOM.           |
| **@testing-library/user-event** | Simula eventos de usuario en pruebas para validar comportamiento.                      |
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
