import React, { useEffect, useState } from "react"; // Importa React y hooks
import { Link, useLocation } from "react-router-dom"; // Para navegación y lectura de URL
import axios from "axios"; // Cliente HTTP para consumir API

  /*VARIABLE PARA URL DE RENDER  */
 const baseURL = process.env.REACT_APP_API_URL || "";


  export const Home = () => {
  // Estado para almacenar las publicaciones
  const [posts, setPosts] = useState([]);

  // Obtiene la categoría (query string) desde la URL
  const cat = useLocation().search;

  useEffect(() => {
    // Función para obtener los datos de las publicaciones
    const fetchData = async () => {
      try {
        // Realiza una solicitud GET con la categoría (si hay)
       // const res = await axios.get(`/posts${cat}`);
         const res = await axios.get(`${baseURL}/api/posts${cat}`);
        setPosts(res.data); // Actualiza el estado con los datos recibidos
      } catch (err) {
        console.log(err); // Muestra errores en consola
      }
    };
    fetchData(); // Llama a la función
  }, [cat]); // Se vuelve a ejecutar si cambia la categoría

  // Función para limpiar y recortar texto HTML
  const getSummary = (html, maxLength = 300) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    let text = tmp.textContent || tmp.innerText || "";

    // Agrega un espacio después de cada punto si no hay uno
    text = text.replace(/\.([^\s.])/g, ". $1");

    // Limita el texto al máximo de caracteres permitido
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (

  <div className="home">
    <div className="posts">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p className="post-desc">{getSummary(post.desc)}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Leer más..</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="no-posts-message">
          <h2>No hay publicaciones en esta categoría.</h2>
          <p>
            ¿Quieres ser el primero en publicar?{" "}
            <Link to="/login" className="login-link">
              Inicia sesión
            </Link>{" "}
            para publicar contenido.
          </p>
        </div>
      )}
    </div>
  </div>
);

  };

export default Home;
