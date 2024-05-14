import React from "react";
import Slider from "react-slick";
import { AiOutlineDollar, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {useLoaderData} from "react-router-dom";


const BestProducts = () => {

  //Importamos el JSON obtenido de la API aquí, para usarlo simplemente cambiar por bestProducts.map
  const bestProducts = useLoaderData();

  //Cambiar esto por la recepción de datos que me den en el API
  const data = [
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 15,
      coin: 2,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 15,
      coin: 3,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 15,
      coin: 4,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 15,
      coin: 5,
    },
  ];

  return (
    <>
      <div className="mt-5 flex max-w-72 md:max-w-[1112px] overflow-x-auto scroll">
        <div className="flex mb-2">
          {data.map((d) => (
            <div className="bg-white text-black rounded-md w-72 mr-5">
              <img src={d.img} className="rounded-t-md w-full h-32" />
              <div className=" bg-yellow-200 w-full h-3"></div>
              <div className="flex mt-2 justify-between px-5 items-center">
                <div className="flex flex-col">
                  <span className="font-bold">{d.name}</span>
                  <span className="text-sm">{d.id_category}</span>
                </div>
                <div className="flex gap-3">
                  <span className="bg-slate-300 p-1.5 text-sm">
                    S/ {d.price}
                  </span>
                  <span className="text-sm bg-slate-300 p-1.5 flex items-center gap-1">
                    {d.coin}
                    <AiOutlineDollar />
                  </span>
                </div>
              </div>
              <div className="flex justify-between p-4">
                <input
                  type="number"
                  className="w-20 outline-none p-1.5 bg-slate-300 rounded-md "
                />
                <button className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-3 py-1 text-xs hover:border-[#fff] cursor-pointer transition">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestProducts;
