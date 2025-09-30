import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "";

// Mapa para traducir categorías de inglés a español
const categoryNames = {
  art: "Arte",
  science: "Ciencia",
  technology: "Tecnología",
  cinema: "Cine",
  design: "Diseño",
  food: "Comida",
};

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Extraemos la categoría de la URL (ejemplo: "?cat=art")
  const query = new URLSearchParams(useLocation().search);
  const cat = query.get("cat"); // cat = "art", "science", etc.

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Si hay categoría, la pasamos en la query, si no, trae todo
        const url = cat ? `${baseURL}/api/posts?cat=${cat}` : `${baseURL}/api/posts`;
        const res = await axios.get(url);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [cat]);

  // Función para limpiar y recortar texto HTML
  const getSummary = (html, maxLength = 300) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    let text = tmp.textContent || tmp.innerText || "";
    text = text.replace(/\.([^\s.])/g, ". $1");
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Traducimos la categoría para mostrarla en español
  const displayCategory = cat ? (categoryNames[cat] || "Categoría desconocida") : null;

  return (
    <div className="home">
      {displayCategory && (
        <div className="post-category">
          <span>{displayCategory.toUpperCase()}</span>
        </div>
      )}

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
