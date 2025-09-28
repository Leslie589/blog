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

const baseURL = process.env.REACT_APP_API_URL || "";

// Map para mostrar nombres “bonitos” de las categorías
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

  // Extrae la categoría desde la query string
  const searchParams = new URLSearchParams(location.search);
  const categoryFromURL = searchParams.get("cat");

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

  // Categoría “bonita” para mostrar arriba
  const displayCategory = categoryNames[categoryFromURL] || post.cat || categoryFromURL;

  return (
    <div className="single">
      <div className="content">

        {/* 🔹 Categoría arriba del título */}
        {displayCategory && (
          <div className="post-category">
            <span>{displayCategory.toUpperCase()}</span>
          </div>
        )}

        {post.img && <img src={post.img} alt="Imagen del post" />}

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

        <h1>{post.title}</h1>

        <div className="post-body">
          {typeof post.desc === "string" ? parse(post.desc) : null}
        </div>
      </div>

      {/* Menú recibe la categoría original para filtrar correctamente */}
      <Menu cat={categoryFromURL || post.cat} currentPostId={post.id} />
    </div>
  );
};

export default Single;
