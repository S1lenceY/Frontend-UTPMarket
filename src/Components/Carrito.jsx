import React from "react";
import { AiOutlineDollar } from "react-icons/ai";

const Carrito = () => {
  //Cambiar esto por la recepción de datos que me den en el API
  const data = [
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      category: "Panaderia",
      price: 15,
      count: 2,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      category: "Panaderia",
      price: 15,
      count: 2,
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white p-3 text-lg md:p-3 md:text-2xl gap-2 flex">
          <span>|</span> Carrito de Compras
        </div>
        <div className="flex">
          <div className="flex gap-10 mt-4">
            <div className="flex flex-col gap-5">
              {data.map((d) => (
                <div className="bg-white text-black rounded-md w-fit flex">
                  <div className="flex">
                    <img src={d.img} className="rounded-s-md w-64 h-32 " />
                    <div className=" bg-yellow-200 h-full w-2"></div>
                  </div>

                  <div className="flex flex-col mt-2 justify-between p-3 px-5">
                    <div className="flex flex-col">
                      <span className="font-bold">{d.name}</span>
                      <span className="text-sm">Producto de {d.category}</span>
                    </div>
                    <div className="flex gap-3 ml-48">
                      <span className="text-sm bg-slate-300 p-1.5 flex items-center gap-1">
                        {d.count} unidades
                      </span>
                      <span className="bg-[#000f37] text-white rounded-sm p-1.5 text-sm">
                        S/ {d.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="bg-white p-4 ">
                <div>
                  <span className="text-xl font-bold border-b border-b-black">
                    Datos Generales
                  </span>
                </div>
                <div className="flex flex-col text-sm py-4 border-b border-b-black">
                  <span><b>Subtotal: </b>S/100.00</span>
                  <span><b>IGV 18%: </b>S/18.00</span>
                </div>
                <div className="flex flex-col text-sm py-4 border-b border-b-black">
                  <span><b>Coins Ganadas: </b>12</span>
                  <span><b>Lugar de Recepción: </b>UTP Sede Chiclayo</span>
                </div>
                <div className="flex flex-col text-sm py-4 border-b border-b-black">
                  <span><b>Total a pagar: </b>S/112.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
