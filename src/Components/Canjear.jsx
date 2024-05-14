import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";

const Canjear = () => {
  //Cambiar esto por la recepción de datos que me den en el API
  const data = [
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      category: "Panaderia",
      price: 15,
      coin: 2,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      category: "Panaderia",
      price: 15,
      coin: 3,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      category: "Panaderia",
      price: 15,
      coin: 4,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      category: "Panaderia",
      price: 15,
      coin: 5,
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white p-3 text-lg md:p-3 md:text-2xl gap-2 flex font-bold">
          <span>|</span> Canjea tus UTP coins
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-8">
          {data.map((d) => (
            <div className="bg-white text-black rounded-md w-72">
              <img src={d.img} className="rounded-t-md w-full h-32" />
              <div className=" bg-yellow-200 w-full h-3"></div>
              <div className="flex mt-2 justify-between px-5 items-center">
                <div className="flex flex-col">
                  <span className="font-bold">{d.name}</span>
                  <span className="text-sm">{d.category}</span>
                </div>
                <div className="flex gap-3">
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
                <button className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-7 py-1 text-xs hover:border-[#fff] cursor-pointer transition">
                  Canjear
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#000f37] p-4 rounded-full text-white flex items-center gap-2 text-sm font-bold fixed right-2 md:right-16">
        <MdOutlineShoppingCart className="text-lg" />
      </div>
    </>
  );
};

export default Canjear;
