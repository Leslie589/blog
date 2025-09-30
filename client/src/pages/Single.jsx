// Importaciones necesarias desde React y otras librerías
import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Hooks de React Router
import { AuthContext } from "../context/authContext"; // Contexto de autenticación para saber si el usuario está logueado
import "moment/locale/es"; // Localización de Moment.js en español
import Menu from '../components/Menu'; // Componente para mostrar posts relacionados o menú lateral
import axios from 'axios'; // Cliente HTTP para hacer peticiones al backend
import moment from 'moment'; // Librería para manejar fechas
import parse from 'html-react-parser'; // Permite convertir HTML en JSX seguro
import Swal from 'sweetalert2'; // Librería para mostrar alertas bonitas
import Edit from '../img/edit.png'; // Icono de editar
import Delete from '../img/delete.png'; // Icono de eliminar


// URL base de la API en render 
const baseURL = process.env.REACT_APP_API_URL || "";

// Map para mostrar categorías en español
const categoryNames = {
  art: "Arte",
  science: "Ciencia",
  technology: "Tecnología",
  cinema: "Cine",
  design: "Diseño",
  food: "Comida",
};

const Single = () => {
  const [post, setPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/posts/${postId}`, { withCredentials: true });
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${baseURL}/api/posts/${postId}`, { withCredentials: true });
      Swal.fire({
        icon: 'success',
        title: res.data,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!post) return <p>Cargando publicación...</p>;

  // Categoría para mostrar arriba en español
  const normalizedCat = post.cat?.trim().toLowerCase();
const displayCategory = categoryNames[normalizedCat] || "Categoría desconocida";


  return (
    <div className="single">
      <div className="content">

        {/* 🔹 Categoría en español arriba del título */}
        {displayCategory && (
          <div className="post-category">
            <span>{displayCategory.toUpperCase()}</span>
          </div>
        )}

        {/* Imagen principal */}
        {post.img && <img src={post.img} alt="Imagen del post" />}

        {/* Información del usuario */}
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="Imagen de usuario" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Publicado el {moment.utc(post.date).local().format('LLL')}</p>
          </div>

          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="Editar" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="Eliminar" />
            </div>
          )}
        </div>

        {/* Título y contenido */}
        <h1>{post.title}</h1>
        <div className="post-body">
          {typeof post.desc === "string" ? parse(post.desc) : null}
        </div>
      </div>

      {/* Menú sigue usando la categoría original en inglés */}
      <Menu cat={post.cat} currentPostId={post.id} />
    </div>
  );
};

export default Single;
