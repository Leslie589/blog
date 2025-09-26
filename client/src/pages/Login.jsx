// Importa React y hooks necesarios
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Navegación
import { AuthContext } from "../context/authContext"; // Contexto de autenticación
import Swal from "sweetalert2"; // Alertas personalizadas
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Íconos de ver/ocultar contraseña

export const Login = () => {
  // Estados para los campos del formulario
  const [inputs, setInputs] = useState({ username: "", password: "" });

  // Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Para redireccionar
  const { login } = useContext(AuthContext); // Función de login del contexto

  // Actualiza los campos del formulario cuando el usuario escribe
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Maneja el envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs); // Intenta iniciar sesión

      // Muestra alerta de éxito
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente",
        timer: 1000,
        showConfirmButton: false,
      });

      navigate("/"); // Redirige al home
    } catch (err) {
      // Muestra alerta de error si falló el login
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: err.response?.data || "Verifica tus datos e intenta nuevamente",
      });
    }
  };

  return (
    <div className="auth">
      <h1>Iniciar sesión</h1>

      {/* Formulario de login */}
      <form onSubmit={handleSubmit}>
        {/* Campo de nombre de usuario */}
        <input
          required
          type="text"
          placeholder="Nombre"
          name="username"
          onChange={handleChange}
        />

        {/* Campo de contraseña con ícono para mostrar u ocultar */}
        <div className="password-input-container">
          <input
            required
            type={showPassword ? "text" : "password"} // Muestra texto o puntos según el estado
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
          />

          {/* Ícono de ojo para cambiar visibilidad */}
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Botón de envío */}
        <button type="submit">Iniciar sesión</button>

        {/* Enlace a página de registro */}
        <span>
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
