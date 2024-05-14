import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carrito = () => {
  //Para abrir modal
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Definiendo los métodos de pago
  const pago = [
    {
      name: "VISA",
      img: "/src/Assets/VISA.jpg",
      category: "Banca Movil",
    },
    {
      name: "VISA",
      img: "/src/Assets/VISA.jpg",
      category: "Banca Movil",
    },
  ];

  //Cambiar esto por la recepción de datos que me den en el API
  const data = [
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 15,
      count: 2,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 15,
      count: 2,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 15,
      count: 2,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
      price: 15,
      count: 2,
    },
    {
      name: "Pan Blanco",
      img: "/src/Assets/PanBlanco.jpg",
      id_category: "Panaderia",
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
            <div className=" flex-col gap-5 max-h-[424px] overflow-y-auto scroll hidden md:flex">
              {data.map((d) => (
                <div className="bg-white text-black rounded-md w-fit flex mr-3">
                  <div className="flex">
                    <img src={d.img} className="rounded-s-md w-64 h-32 " />
                    <div className=" bg-yellow-200 h-full w-2"></div>
                  </div>

                  <div className="flex flex-col mt-2 justify-between p-3 px-5">
                    <div className="flex flex-col">
                      <span className="font-bold">{d.name}</span>
                      <span className="text-sm">Producto de {d.id_category}</span>
                    </div>
                    <div className="flex gap-3 ml-40">
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
              <div className="bg-white px-10 py-7 ">
                <div className="border-b border-b-black">
                  <span className="text-xl font-bold ">Datos Generales</span>
                </div>
                <div className="flex flex-col text-sm py-3 border-b border-b-black">
                  <span>
                    <b>Subtotal: </b>S/100.00
                  </span>
                  <span>
                    <b>IGV 18%: </b>S/18.00
                  </span>
                </div>
                <div className="flex flex-col text-sm py-3 border-b border-b-black">
                  <span>
                    <b>Coins Ganadas: </b>12
                  </span>
                  <span>
                    <b>Lugar de Recepción: </b>UTP Sede Chiclayo
                  </span>
                </div>
                <div className="flex flex-col text-sm py-3 border-b border-b-black">
                  <span>
                    <b>Total a pagar: </b>S/112.00
                  </span>
                </div>
              </div>

              <div className="flex mt-3">
                <input
                  type="text"
                  placeholder="UTP-CIX-24"
                  className="py-2 md:p-2 px-3 outline-none border"
                />
                <div className="flex items-center px-2 md:p-2 md:px-4 bg-slate-300 text-slate-500 font-bold border">
                  Canjear cupón
                </div>
              </div>
              <button
                className="w-full bg-[#000f37] text-white mt-3 p-2 rounded font-bold text-sm"
                onClick={handleButtonClick}
              >
                PROCESAR COMPRA
              </button>
            </div>
          </div>
        </div>
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
                <div className="hidden lg:block">
                  <img src="/src/Assets/FondoLoader.webp" className=" w-72" />
                </div>
                <div className="flex flex-col ml-4">
                  <div className="bg-white p-3 text-lg md:p-3 md:text-2xl gap-2 flex font-bold">
                    <span>|</span> Métodos de Pago
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {pago.map((p) => (
                      <div className="bg-white text-black rounded-md w-fit flex flex-col m-3">
                        <div className="flex flex-col">
                          <img
                            src={p.img}
                            className="rounded-t-md w-full h-32 "
                          />
                          <div className=" bg-yellow-200 w-full h-2"></div>
                        </div>

                        <div className="flex mt-2 justify-between p-3">
                          <div className="flex flex-col">
                            <span className="font-bold">{p.name}</span>
                            <span className="text-sm">{p.category}</span>
                          </div>
                          <div className="self-end">
                            <button className=" p-1 px-3 rounded text-white text-sm bg-[#000f37] ">
                              Elegir
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="bg-white text-black rounded-md w-fit flex flex-col m-3">
                      <div className="flex flex-col">
                        <img
                          src="/src/Assets/Logo.webp"
                          className="rounded-t-md w-56 h-32 "
                        />
                        <div className=" bg-yellow-200 w-full h-2"></div>
                      </div>

                      <div className="flex mt-2 justify-between p-3">
                        <div className="flex flex-col">
                          <span className="font-bold">CODE</span>
                          <span className="text-sm">Pago en Caja</span>
                        </div>
                        <div className="self-end">
                          <button className=" p-1 px-3 rounded text-white text-sm bg-[#000f37] ">
                            Elegir
                          </button>
                        </div>
                      </div>
                    </div>

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

export default Carrito;
