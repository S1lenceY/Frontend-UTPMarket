import React from "react";
import Slider from "react-slick";
import { AiOutlineDollar, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import imagenes from "../../Path/Imagenes";

const BestProducts = () => {

  //Cambiar esto por la recepción de datos que me den en el API
  const data = useLoaderData();

  return (
    <>
      <div className="mt-5 w-72 sm:w-[610px] lg:w-[910px] xl:w-full flex overflow-x-auto scroll self-center sm:self-start">
        <div className="flex mb-2">
          {data.map((d, index) => {
            // Buscar la imagen correspondiente al nombre del producto
            const imagen = imagenes.find((img) => img.name === d.name);
            return (
              <div
                key={index}
                className="bg-white text-black rounded-md w-72 mr-5"
              >
                <img
                  src={imagen ? imagen.url : ""}
                  alt={d.name}
                  className="rounded-t-md w-full h-32"
                />
                <div className=" bg-[#F9CA29] w-full h-3"></div>
                <div className="flex mt-2 justify-between px-5 items-center">
                  <div className="flex flex-col">
                    <span className="font-bold">{d.name}</span>
                    <span className="text-sm">{d.id_category}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-[#EFF5FE] p-1.5 text-sm text-[#434A5D]">
                      S/ {d.price}
                    </span>
                    <span className="text-sm bg-[#EFF5FE] p-1.5 flex items-center gap-1 text-[#434A5D]">
                      {d.coin}
                      <AiOutlineDollar />
                    </span>
                  </div>
                </div>
                <div className="flex justify-between p-4">
                  <input
                    type="number"
                    className="w-12 outline-none p-1.5 bg-[#EFF5FE] rounded-md "
                    placeholder="1"
                    min="1"
                  />
                  <button className="bg-[#000F37] border-2 border-[#3e3e3e] rounded-lg text-white px-3 py-1 text-xs hover:border-[#fff] cursor-pointer transition">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BestProducts;
