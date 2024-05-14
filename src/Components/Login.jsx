import React, { useState } from "react";
import withSplashScreen from "../Loader/withSplashScreen";
import LogoLogin from "../Assets/LogoLogin.png";
import LogoUTP from "../Assets/LogoUTP.png";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
import { useAuthContext } from "../Auth/authContext";
import axios from "axios";
import useThemeStorage from "./Utils/useThemeStorage";

const Login = () => {
  //Ejecutamos tema:
  const { theme } = useThemeStorage();

  //Definimos constante para capturar error:
  const [authError, setAuthError] = useState(null);

  //Mostrar u ocultar contraseña:
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordType = showPassword ? "text" : "password";

  const fixedToken = "123"

  //Login Prueba:
  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    nombre: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos al backend para autenticación
      const response = await axios.post("http://localhost:3000/login", {
        nombre: formData.nombre,
        password: formData.password,
      });

      // Extraer el token de la respuesta del backend
      const token = response.data.token;
      console.log(token);

      // Llamar a la función login y pasar el token
      login(fixedToken);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Establecer el estado del error
      setAuthError("Correo o contraseña inválido");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-background">
        <div>
          <img
            src={LogoLogin}
            alt=""
            className=" h-[500px] w-[500px] mr-24 hidden md:block"
          />
        </div>
        <div className="flex flex-col w-[380px] md:p-2 p-10">
          <div className="flex h-9 w-[120px]">
            <img src={LogoUTP} alt="" />
          </div>
          <div className="mt-5">
            <div className="mb-4">
              <p className=" text-2xl text-titlecolor font-semibold">
                La nueva experiencia digital de marketplace
              </p>
              <span className=" text-xl font-light text-subtitlecolor">
                Agradable, facil y dinámica
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-titlecolor font-light">
                Ingresa tus datos para <b>iniciar sesión</b>
              </span>
            </div>
            <form className="mr-4 my-3" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Código o correo UTP"
                  className="p-2 text-sm text-titlecolor bg-inputbackground rounded w-full border border-bordercolor focus:outline-none focus:border-hoverbordercolor hover:border-hoverbordercolor peer"
                  name="nombre" //Añadido para manejar con AXIOS
                  value={formData.nombre}
                  onChange={handleChange}
                />
                <HiOutlineMail className="absolute right-2 top-1.5 text-2xl text-bordercolor peer-hover:text-hoverbordercolor peer-focus:text-hoverbordercolor" />
                {/* Mostrar el mensaje de error si hay */}
                {authError && (
                  <p className="text-pink-600 text-xs mt-1 ml-1">{authError}</p>
                )}
              </div>
              <div className="relative my-5">
                <input
                  type={passwordType}
                  placeholder="Contraseña"
                  className="p-2 text-sm text-titlecolor bg-inputbackground rounded w-full border border-bordercolor focus:outline-none focus:border-hoverbordercolor hover:border-hoverbordercolor peer"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <HiOutlineEye
                    className="absolute right-2 top-1.5 text-2xl text-bordercolor peer-hover:text-hoverbordercolor peer-focus:text-hoverbordercolor cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <HiOutlineEyeOff
                    className="absolute right-2 top-1.5 text-2xl text-bordercolor peer-hover:text-hoverbordercolor peer-focus:text-hoverbordercolor cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <a
                  href="https://contrasena.utp.edu.pe/Recuperacion/OlvideMiClave.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" self-end text-sm text-hoverbordercolor mb-5 text-[#3E4558]"
                >
                  Olvidé mi contraseña
                </a>

                <button
                  className="lg:w-28 py-2.5 bg-[#2A3247] text-white border-none rounded-md text-sm font-base cursor-pointer relative group focus:text-transparent focus:bg-slate-300"
                  type="submit" //Cambiar a "button" si se quiere dejar de hacer submit
                >
                  Iniciar Sesión
                  <span className="group-focus:opacity-100 opacity-0 absolute lg:left-6 left-32 group-focus:text-gray-400">
                    Cargando
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withSplashScreen(Login);
