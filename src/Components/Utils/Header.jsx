import React, { useEffect, useState, useContext } from "react";
import { LOGOUT } from "../../Path/Paths";
import { Link, useLoaderData } from "react-router-dom";
import LogoUTP from "../../Assets/LogoUTP.png";
import User from "../../Assets/User.png";
import { IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch, AiOutlineDollar } from "react-icons/ai";
import Dropdown from "./Dropdown";
import { useCoins } from "../../Auth/CoinsContext";
import SearchContext from "../../Auth/SearchContext";
import AxiosHeader from "../../Auth/AxiosHeader";
import axios from "axios";

function LoadingScreen() {
  return (
    <div className="bg-[#EFF5FE] flex items-center justify-center p-2 gap-2 text-sm ml-7 md:mr-7">
      <div className="animate-pulse rounded-md bg-gray-500 w-10 h-3"> </div>
      <div className="animate-pulse rounded-full bg-gray-500 w-5 h-5"> </div>
    </div>
  );
}

const Header = ({ handleMenuClick }) => {
  //Función para realizar la búsqueda a la API
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Espera de 2 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador
  }, []);

  const { totalCoins } = useCoins();
  const { setSearchResults } = useContext(SearchContext); // Usa el contexto para establecer los resultados de búsqueda

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Actualizar el término de búsqueda en el estado local

    // Realizar la búsqueda solo si el término de búsqueda tiene al menos 3 caracteres
    if (value.trim().length >= 3) {
      try {
        AxiosHeader();
        const response = await axios.get(`http://localhost:8080/utp-market-api/productos/buscar?nombre=${value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
      };
    } else {
      setSearchResults([]); // Si el término de búsqueda no tiene al menos 3 caracteres, restablecer los resultados de búsqueda a un estado vacío
    }
  };
  

  return (
    <>
      <div className="fixed flex md:absolute md:h-20 h-14 w-screen bg-inputbackground items-center justify-between z-10">
        <div
          className="absolute cursor-pointer top-0 left-0 bg-[#000f37] w-14 h-14 flex items-center justify-center text-white text-2xl"
          onClick={handleMenuClick}
        >
          <IoIosMenu />
        </div>
        <div className="flex items-center">
          <img
            src={LogoUTP}
            alt=""
            className=" h-7 hidden md:block ml-20 md:ml-36"
          />
          <div className="flex bg-[#EFF5FE] items-center p-2 rounded-xl gap-2 text-lg ml-20 md:ml-8">
            <input
              type="search"
              placeholder="Buscar producto"
              className=" w-11 sm:w-28 md:w-72 bg-transparent outline-none text-sm p2 sm:border-r sm:border-r-slate-800"
              value={searchTerm}
              onChange={handleSearchChange} // Llamar a la función de búsqueda a medida que se escribe
            />
            <AiOutlineSearch />
          </div>
        </div>

        <div className="flex items-center">
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <div className="bg-[#EFF5FE] flex items-center justify-center p-2 gap-2 text-sm  md:mr-7">
              <span>{totalCoins} coins</span>
              <AiOutlineDollar className="text-lg" />
            </div>
          )}
          <div className="hidden lg:block ">
            <div className=" pl-5 gap-4 items-center flex border-l-slate-500 border-l">
              <div className="flex flex-col">
                <span className="text-sm">
                  Hola, <b>{localStorage.getItem("usuario")}</b>
                </span>
                <span className="text-xs self-end">Estudiante</span>
              </div>
              <img src={User} className="rounded-full h-10 w-10" />
            </div>
          </div>

          <Dropdown />
        </div>
      </div>
    </>
  );
};

export default Header;
