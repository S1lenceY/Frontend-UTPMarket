import React from "react";
import { Link, useLoaderData, Outlet } from "react-router-dom";
import { LOGOUT } from "../Path/Paths";
import { useAuthContext } from "../Auth/authContext";
import Sidebar from "./Utils/Sidebar";

const Chat = () => {
  return (
    <>
      <div className=" bg-background h-full flex flex-col">
        <Sidebar /> {/*Sidebar and Header are together XD*/}
        <div className="flex flex-col pt-20 px-5 md:pt-28 md:pl-32 md:pr-10 pb-5 max-w-7xl mx-auto "> {/* A puro padding he colocado el contenido en medio XDXDXD */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Chat;
