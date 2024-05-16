import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { ImHappy } from "react-icons/im";
import imagenes from "../../Path/Imagenes";

const Canjear = () => {
  //Para abrir modal
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Cambiar esto por la recepción de datos que me den en el API
  const data = [
    {
      id: 1,
      name: "Pan Blanco",
      id_category: "Panaderia",
      price: 15,
      coin: 2,
    },
    {
      id: 2,
      name: "Capuchino",
      id_category: "Panaderia",
      price: 15,
      coin: 3,
    },
    {
      id: 3,
      name: "Té Verde",
      id_category: "Panaderia",
      price: 15,
      coin: 4,
    },
    {
      id: 4,
      name: "Café Latte",
      id_category: "Panaderia",
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
          {data.map((d, index) => {
            // Buscar la imagen correspondiente al nombre del producto
            const imagen = imagenes.find((img) => img.name === d.name);
            return (
              <div key={index} className="bg-white text-black rounded-md w-72">
                <img
                  src={imagen ? imagen.url : ""}
                  alt={d.name}
                  className="rounded-t-md w-full h-32"
                />
                <div className=" bg-yellow-200 w-full h-3"></div>
                <div className="flex mt-2 justify-between px-5 items-center">
                  <div className="flex flex-col">
                    <span className="font-bold">{d.name}</span>
                    <span className="text-sm">{d.id_category}</span>
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
                  <button
                    className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-7 py-1 text-xs hover:border-[#fff] cursor-pointer transition"
                    onClick={handleButtonClick}
                  >
                    Canjear
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#000f37] p-4 rounded-full text-white flex items-center gap-2 text-sm font-bold fixed right-2 md:right-16">
        <MdOutlineShoppingCart className="text-lg" />
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center overflow-y-auto"
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex w-fit h-fit bg-transparent text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="w-fit flex transform overflow-hidden rounded bg-background p-5 text-left align-middle shadow-xl transition-all text-black">
                <div className="flex flex-col items-center justify-center w-72">
                  <span className="text-xl font-bold">¡Genial!</span>
                  <p className="text-center mt-2 mb-3">
                    Ahora puedes reclamar tu compra en cualquier cafetería de
                    UTP+ market brindando tu código UTP.
                  </p>
                  <div className="text-4xl">
                    <ImHappy />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Canjear;
