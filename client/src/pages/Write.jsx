import axios from "axios"; // Importa Axios para hacer peticiones HTTP
import moment from "moment"; // Librería para manejo de fechas
import React, { useState } from "react"; // Importa React y useState para estado local
import ReactQuill from "react-quill"; // Editor de texto enriquecido
import "react-quill/dist/quill.snow.css"; // Estilos de ReactQuill
import { useLocation, useNavigate } from "react-router-dom"; // Hooks para navegación y localización
import Swal from 'sweetalert2'; // Librería para mostrar alertas personalizadas

  /*VARIABLE PARA URL DE RENDER  */
  const baseURL = process.env.REACT_APP_API_URL || "";



const Write = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const state = useLocation().state; // Recupera datos si se está editando una publicación

  const [title, setTitle] = useState(state?.title || ""); // Estado para el título del post
  const [value, setValue] = useState(state?.desc || ""); // Estado para el contenido del post
  const [file, setFile] = useState(null); // Estado para la imagen subida
  const [cat, setCat] = useState(state?.cat || ""); // Estado para la categoría del post

  const navigate = useNavigate(); // Hook para redireccionar



  // Función para subir una imagen al servidor
  const upload = async () => {
    try {
      const formData = new FormData(); // Crea FormData para envío tipo multipart
      formData.append("file", file); // Adjunta el archivo
    //  const res = await axios.post("/upload", formData); // Envío de imagen
         const res = await axios.post(`${baseURL}/api/uploads`, formData);
        return res.data.url; // Devuelve el nombre de la imagen
    } catch (err) {
      console.log(err); // Muestra errores si falló la subida
    }
  };

  // Función que se ejecuta al hacer clic en "Publish"
  const handleClik = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

       if (!user) {
Swal.fire({
  icon: 'warning',
  title: '¡Ups! 😅',
  text: 'Necesitas iniciar sesión para poder publicar tu contenido.',
  confirmButtonText: 'Iniciar sesión',
  showCancelButton: true,
  cancelButtonText: 'Cancelar',
}).then((result) => {
  if (result.isConfirmed) {
    window.location.href = '/login'; // Cambia la ruta si es necesario
  }
});


    
    
    return;
  }
    const imgUrl = file ? await upload() : ""; // Si hay imagen nueva, la sube

    try {
      if (state) {
        // Si hay estado previo, es una edición
         const res = await axios.put(`${baseURL}/api/posts/${state.id}`, {
      //const res =   await axios.put(`/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state.img || "", // Usa la nueva o la existente
        });
           Swal.fire({
          icon: 'info',
          title: res.data,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
       }, {
  withCredentials: true, // <- Esta también

       
        });
        
      } else {
        // Si no hay estado previo, es una nueva publicación
      // const res= await axios.post(`/posts/`, {
      const res = await axios.post(`${baseURL}/api/posts/`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
        date: moment().utc().format("YYYY-MM-DD HH:mm:ss")


          //date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), // Fecha formateada
      

        });
          Swal.fire({
          icon: 'success',
          title: res.data,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,

        });
      }
      
      navigate("/"); // Redirige al home después de publicar
      
    } catch (err) {
      console.log(err); // Captura errores
      
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)} // Actualiza el título
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue} // Actualiza el contenido
          />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1> Publicar</h1>
          <span>
            <b> Estado: </b> Borrador
          </span>
          <span>
            <b> Visibilidad: </b> Publico
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])} // Selecciona imagen
          />
          <label className="file" htmlFor="file">
            Descargar imagen
          </label>
          <div className="buttons">
            <button>Guardar como borrador </button>
            <button onClick={handleClik}>Publicar</button>{" "}
          </div>
        </div>

        <div className="item">
          <h1>Categoría</h1>

          {/* Cada categoría es un radio button */}
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Arte</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Ciencia</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Tecnología</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cine</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Diseño</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Comida</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
