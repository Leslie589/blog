// Importaciones necesarias desde React y otras librerías
import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import "moment/locale/es";
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import parse from 'html-react-parser';
import Swal from 'sweetalert2';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';

// URL base de la API
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

  // Extrae el ID del post desde la URL
  const postId = location.pathname.split("/")[2];

  // Extrae la categoría desde la query string
  const searchParams = new URLSearchParams(location.search);
  const categoryFromURL = searchParams.get("cat");

  // Fetch del post
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

  // Scroll al inicio al cambiar de post
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  // Función para eliminar post
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

  // Determina la categoría a mostrar: la del post o la de la URL, en español
  const categoryKey = post.cat || categoryFromURL;
  const categoryToShow = categoryNames[categoryKey] || categoryKey;

  return (
    <div className="single">
      <div className="content">

        {/* 🔹 CATEGORÍA ARRIBA DEL TÍTULO */}
        {categoryToShow && (
          <div className="post-category">
            <span>{categoryToShow.toUpperCase()}</span>
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

      {/* Menú o posts relacionados */}
      <Menu cat={categoryKey} currentPostId={post.id} />
    </div>
  );
};

export default Single;
