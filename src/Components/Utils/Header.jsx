import React, { useEffect, useState } from "react";
import { LOGOUT } from "../../Path/Paths";
import { Link, useLoaderData } from "react-router-dom";
import LogoUTP from "../../Assets/LogoUTP.png";
import User from "../../Assets/User.png";
import { IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch, AiOutlineDollar } from "react-icons/ai";
import Dropdown from "./Dropdown";

const Header = ({ handleMenuClick }) => {

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
              className=" w-20 md:w-72 bg-transparent outline-none text-sm p2"
            />
            <AiOutlineSearch />
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-[#EFF5FE] flex items-center justify-center p-2 gap-2 text-sm ml-7 md:mr-7">
            <span>
              {localStorage.getItem('coins')} coins
            </span>
            <AiOutlineDollar className="text-lg" />
          </div>
          <div className="hidden lg:block ">
            <div className=" pl-5 gap-4 items-center flex border-l-slate-500 border-l">
              <div className="flex flex-col">
                <span className="text-sm">
                  Hola, <b>Gabriel Paiva</b>
                </span>
                <span className="text-xs self-end">Estudiante</span>
              </div>
              <img
                src={User}
                className="rounded-full h-10 w-10"
              />
            </div>
          </div>
          
          <Dropdown />
        </div>
      </div>
    </>
  );
};

export default Header;
