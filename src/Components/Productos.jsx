import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";

const Productos = () => {
  //Cambiar esto por la recepción de datos que me den en el API
  const data = [
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 1.5,
      coin: 1.0,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 1.5,
      coin: 3.0,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 1.5,
      coin: 2.0,
    },
    {
      name: "Vodka",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Licores",
      price: 2.0,
      coin: 1.0,
    }
  ];

  // Agrupar productos por categoría
  const groupedProducts = data.reduce((acc, curr) => {
    if (!acc[curr.id_category]) {
      acc[curr.id_category] = [];
    }
    acc[curr.id_category].push(curr);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} className="flex flex-col">
          <div className="bg-white p-3 text-lg md:p-3 md:text-2xl gap-2 flex font-bold mt-4">
            <span>|</span> {category}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white text-black rounded-md w-72">
                <img src={product.img} className="rounded-t-md w-full h-32" />
                <div className=" bg-yellow-200 w-full h-3"></div>
                <div className="flex mt-2 justify-between px-5 items-center">
                  <div className="flex flex-col">
                    <span className="font-bold">{product.name}</span>
                    <span className="text-sm">{product.id_category}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-slate-300 p-1.5 text-sm">
                      S/ {product.price}
                    </span>
                    <span className="text-sm bg-slate-300 p-1.5 flex items-center gap-1">
                      {product.coin}
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
      ))}

      <div className="bg-[#000f37] p-3 md:p-4 rounded-sm text-white flex items-center gap-2 text-sm font-bold fixed right-3 md:right-6 translate-y-4">
        S/ 15.0
        <MdOutlineShoppingCart className="text-lg" />
      </div>
    </>
  );
};

export default Productos;
