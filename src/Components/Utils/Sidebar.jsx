import React, { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { GoHome, GoGift } from "react-icons/go";
import User from "../../Assets/User.png";
import ThemeButton from "../Utils/ThemeButton";
import Header from "./Header";
import { Link } from "react-router-dom";
import { INICIO, PRODUCTOS, CANJEAR, CARRITO } from "../../Path/Paths";
import { useLinkContext } from "../../Auth/LinkContext";

const Sidebar = () => {
  const { selectedLink, handleLinkClick, topOffset } = useLinkContext();

  // Estado para controlar la visibilidad del sidebar
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Función para manejar el clic en el icono de menú
  const handleMenuClick = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Función para manejar el clic en el icono de flecha izquierda
  const handleBackClick = () => {
    setSidebarVisible(false);
  };


  return (
    <>
      <Header handleMenuClick={handleMenuClick} />
      <div className="bg-backgroundsidebar hidden md:block h-screen transition-transform z-10 fixed">
        <div
          className="text-white bg-backgroundsidebar flex items-center justify-center h-20 w-[88px] text-3xl cursor-pointer"
          onClick={handleMenuClick}
        >
          <IoIosMenu />
        </div>

        <div
          className="h-20 bg-sidebarlinecolor w-1 rounded-full absolute"
          style={{ top: `${topOffset}px` }}
        ></div>
        <Link
          id={INICIO}
          to={INICIO}
          className={` flex flex-col items-center justify-center h-20 gap-2 ${
            selectedLink === INICIO
              ? "bg-background text-textsidebar"
              : "text-white"
          }`}
          onClick={() => handleLinkClick(INICIO)}
        >
          <GoHome className="text-2xl" />
          <span className=" text-xs">Inicio</span>
        </Link>
        <Link
          id={PRODUCTOS}
          to={PRODUCTOS}
          className={` flex flex-col items-center justify-center h-20 gap-2 ${
            selectedLink === PRODUCTOS
              ? "bg-background text-textsidebar"
              : "text-white"
          }`}
          onClick={() => handleLinkClick(PRODUCTOS)}
        >
          <BiDish className="text-2xl" />
          <span className=" text-xs">Productos</span>
        </Link>
        <Link
          id={CANJEAR}
          to={CANJEAR}
          className={` flex flex-col items-center justify-center h-20 gap-2 ${
            selectedLink === CANJEAR
              ? "bg-background text-textsidebar"
              : "text-white"
          }`}
          onClick={() => handleLinkClick(CANJEAR)}
        >
          <GoGift className="text-2xl" />
          <span className=" text-xs">Canjear</span>
        </Link>
        <Link
          id={CARRITO}
          to={CARRITO}
          className={` flex flex-col items-center justify-center h-20 gap-2 ${
            selectedLink === CARRITO
              ? "bg-background text-textsidebar"
              : "text-white"
          }`}
          onClick={() => handleLinkClick(CARRITO)}
        >
          <MdOutlineShoppingCart className="text-2xl" />
          <span className=" text-xs">Carrito</span>
        </Link>
      </div>

      {/* Div adicional que cubre el contenido de la página */}
      {sidebarVisible && (
        <div
          className="fixed top-0 left-0 z-10 w-screen h-screen bg-backgroundsidebar opacity-20"
          onClick={handleMenuClick}
        />
      )}

      <div
        className={`w-64 text-white h-screen fixed bg-backgroundsidebar z-20 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300`}
      >
        <div
          className="flex items-center justify-end text-3xl h-14 cursor-pointer"
          onClick={handleBackClick}
        >
          <FiArrowLeft className="m-4" />
        </div>
        <div className="flex items-center gap-3 pb-4 pl-6 border-b border-b-divisorsidebar">
          <img src={User} className="rounded-full h-10 w-10" />
          <div className="flex flex-col py-4">
            <span className="text-sm font-semibold">
              ¡Hola {localStorage.getItem("usuario")}!
            </span>
            <span className="text-xs">
              {localStorage.getItem("rol")}@utp.edu.pe
            </span>
          </div>
        </div>

        <div className="pt-7">
          <Link
            to={INICIO}
            className={` flex items-center py-4 px-5 border-l-4 gap-10 mb-10 ${
              selectedLink === INICIO
                ? "bg-background text-textsidebar border-l-4 border-l-sidebarlinecolor"
                : "text-white border-l-backgroundsidebar "
            }`}
            onClick={() => {
              handleLinkClick(INICIO);
              handleBackClick();
            }}
          >
            <GoHome className="text-2xl" />
            <span className="text-sm">Inicio</span>
          </Link>
          <Link
            to={PRODUCTOS}
            className={` flex items-center py-4 px-5 border-l-4 gap-10 mb-10 ${
              selectedLink === PRODUCTOS
                ? "bg-background text-textsidebar border-l-4 border-l-sidebarlinecolor"
                : "text-white border-l-backgroundsidebar"
            }`}
            onClick={() => {
              handleLinkClick(PRODUCTOS);
              handleBackClick();
            }}
          >
            <BiDish className="text-2xl" />
            <span className="text-sm">Productos</span>
          </Link>
          <Link
            to={CANJEAR}
            className={` flex items-center py-4 border-l-4 px-5 gap-10 mb-10 ${
              selectedLink === CANJEAR
                ? "bg-background text-textsidebar border-l-4 border-l-sidebarlinecolor"
                : "text-white border-l-backgroundsidebar"
            }`}
            onClick={() => {
              handleLinkClick(CANJEAR);
              handleBackClick();
            }}
          >
            <GoGift className="text-2xl" />
            <span className="text-sm">Canjear</span>
          </Link>
          <Link
            to={CARRITO}
            className={` flex items-center py-4 px-5 border-l-4 gap-10 mb-10 ${
              selectedLink === CARRITO
                ? "bg-background text-textsidebar border-l-sidebarlinecolor"
                : "text-white border-l-backgroundsidebar"
            }`}
            onClick={() => {
              handleLinkClick(CARRITO);
              handleBackClick();
            }}
          >
            <MdOutlineShoppingCart className="text-2xl" />
            <span className="text-sm">Carrito</span>
          </Link>
          <div className="flex justify-center items-center">
            <ThemeButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
