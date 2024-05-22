import React, { useState } from "react";
import withSplashScreen from "../Loader/withSplashScreen";
import LogoLogin from "../Assets/LogoLogin.png";
import LogoUTP from "../Assets/LogoUTP.png";
import market from "../Assets/market.png";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
import { useAuthContext } from "../Auth/authContext";
import axios from "axios";
import useThemeStorage from "./Utils/useThemeStorage";
import { jwtDecode } from "jwt-decode";
import AxiosHeader from "../Auth/AxiosHeader";
import getUsers from "../Path/Apis.jsx/getUsers";

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
      const response = await axios.post(
        "http://localhost:8080/utp-market-api/login",
        {
          nombre: formData.nombre,
          password: formData.password,
        }
      );

      // Extraer el token de la respuesta del backend
      const token = response.data.jwTtoken;

      // Guardar el token en el localStorage
      localStorage.setItem("jwtToken", token);

      //npm install jwt-decode
      const decodedToken = jwtDecode(token);
      //Aquí ya tienes la id del usuario que querias.
      const id_usuario = decodedToken.id;

      // Si queremos la información de este usuario
      getUsers(token).then((usersData) => {
        const user = usersData.find((user) => user.usuarioID === id_usuario);
        localStorage.setItem("userID", user.usuarioID);
        localStorage.setItem("usuario", user.usuario);
        localStorage.setItem("coins", user.coins);
        localStorage.setItem("rol", user.rol);
      });

      //Establecemos El Link de Inicio
      localStorage.setItem("selectedLink", "/UTPilot/Main/inicio");

      // Llamar a la función login y pasar el token
      login(token);
      AxiosHeader();
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
          <div className="flex items-center">
            <img src={LogoUTP} alt="" className="h-9"/>
            <img src={market} alt="" className="h-5"/>
          </div>
          <div className="mt-5">
            <div className="mb-4">
              <p className=" text-2xl text-titlecolor font-semibold">
                La nueva experiencia digital de marketplace
              </p>
              <span className=" text-xl font-light text-subtitlecolor">
                Agradable, fácil y dinámica
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

                <div className="flex justify-center md:justify-start">
                  <button
                    className="cursor-pointer w-full md:w-28 h-10 text-sm bg-loginbutton text-white rounded-md hover:bg-loginbuttonhover hover:shadow-lg transition-all group focus:w-10 focus:h-10 focus:rounded-full focus:duration-300 ease-in-out"
                    type="submit"
                  >
                    <svg
                      className="animate-spin hidden group-focus:block mx-auto"
                      width="30"
                      height="28"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.1792 0.129353C10.6088 0.646711 8.22715 1.74444 6.16886 3.36616C4.13416 4.96799 2.42959 7.14686 1.38865 9.48493C0.202866 12.1414 -0.241805 15.156 0.125386 18.0413C0.684593 22.4156 3.02922 26.3721 6.63375 29.0186C8.01155 30.0301 9.65549 30.8757 11.2725 31.3997C12.0405 31.6518 13.4857 32 13.7518 32H13.8361V30.7232V29.4464L13.762 29.4331C11.8485 29.0252 10.2787 28.3818 8.7493 27.3802C7.50961 26.5644 6.29688 25.4402 5.40416 24.2794C3.88824 22.3095 2.98206 20.0908 2.66203 17.5736C2.57781 16.8905 2.57781 15.1029 2.66203 14.4396C2.88773 12.7317 3.31556 11.3288 4.06678 9.863C5.88589 6.3045 9.23103 3.67791 13.1286 2.746C13.4352 2.67303 13.7182 2.60671 13.762 2.59676L13.8361 2.58349V1.29009C13.8361 0.577066 13.8327 -0.00330353 13.8293 1.33514e-05C13.8226 1.33514e-05 13.5329 0.0597076 13.1792 0.129353Z"
                        fill="white"
                      ></path>
                      <path
                        d="M19.563 1.38627V2.67967L19.7078 2.71615C20.8768 3.01463 21.7527 3.32968 22.6723 3.78071C24.8249 4.84528 26.6878 6.467 28.042 8.47011C29.248 10.251 29.9858 12.2375 30.2654 14.4562C30.3126 14.831 30.326 15.1792 30.326 16.0149C30.326 17.169 30.2923 17.5869 30.1205 18.5022C29.7365 20.575 28.8404 22.5681 27.5266 24.2761C26.8158 25.2014 25.8019 26.2029 24.862 26.9027C23.3056 28.0634 21.7324 28.7997 19.7078 29.3137L19.563 29.3502V30.6436V31.9403L19.691 31.9204C20.0616 31.8541 21.1362 31.5689 21.6516 31.4031C24.8216 30.365 27.6041 28.3951 29.6152 25.7652C30.2789 24.8996 30.7337 24.1667 31.2356 23.1618C31.8959 21.8419 32.3102 20.6479 32.5999 19.2318C33.4354 15.1394 32.6606 10.9441 30.417 7.40886C28.4126 4.24833 25.3067 1.8373 21.692 0.640079C21.1867 0.470943 20.038 0.169149 19.7078 0.112772L19.563 0.0895557V1.38627Z"
                        fill="white"
                      ></path>
                    </svg>
                    <span className="group-focus:hidden">Iniciar Sesión</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withSplashScreen(Login);
