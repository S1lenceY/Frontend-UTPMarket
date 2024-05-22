import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { ImHappy } from "react-icons/im";
import imagenes from "../Path/Imagenes";
import { useCoins } from "../Auth/CoinsContext";
import { useLoaderData, Link } from "react-router-dom";
import { useLinkContext } from "../Auth/LinkContext";
import { CARRITO } from "../Path/Paths";

const Canjear = () => {
  const { handleLinkClick } = useLinkContext();

  //Recibimos los datos de la API
  const data = useLoaderData();

  const { totalCoins, updateTotalCoins } = useCoins();
  //Para abrir modal
  const [showModal, setShowModal] = useState(false);

  const handleCanjear = (coinsToSubtract) => {
    // Lógica para restar las monedas canjeadas del total de monedas
    const newTotalCoins = totalCoins - coinsToSubtract;
    // Actualizar el total de monedas
    updateTotalCoins(newTotalCoins);
  };

  const handleButtonClick = async (index, d) => {
    // Obtener el valor del input correspondiente al índice
    const inputValueFloat = parseFloat(inputValues[index].trim());

    // Verificar si el valor del input es válido
    const quantity =
      !isNaN(inputValueFloat) && inputValueFloat > 0 ? inputValueFloat : 1;

    // Lógica para abrir modal u otras operaciones necesarias
    setShowModal(true);

    // Calcular las monedas a canjear
    const coinsToSubtract = quantity * d.coinCanje;

    // Llamar a la función para restar las monedas
    handleCanjear(coinsToSubtract);

    // Enviar las monedas actualizadas al backend
    const userId = localStorage.getItem("userID");

    try {
      await axios.post(
        "http://localhost:8080/utp-market-api/usuarios/ActualizarCoins",
        {
          id: userId,
          coins: `-${coinsToSubtract}`,
        }
      );
      console.log("Coins actualizadas con éxito");
    } catch (error) {
      console.error("Error al actualizar las coins:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [inputValues, setInputValues] = useState(Array(data.length).fill("")); // Estado para los valores de los inputs

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-bgtitle text-bgtexttitle p-3 text-lg md:p-3 md:text-2xl gap-2 flex font-bold">
          <span>|</span> Canjea tus UTP coins
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-8">
          {data.map((d, index) => {
            // Buscar la imagen correspondiente al nombre del producto
            const imagen = imagenes.find((img) => img.name === d.name);
            return (
              <div
                key={index}
                className="bg-bgcard text-textcard rounded-md w-72"
              >
                <img
                  src={imagen ? imagen.url : ""}
                  alt={d.name}
                  className="rounded-t-md w-full h-32"
                />
                <div className=" bg-yellow-200 w-full h-3"></div>
                <div className="flex mt-3 justify-between px-5 items-center">
                  <div className="flex flex-col">
                    <span className="font-bold">{d.name}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-sm bg-bgcardlabel p-1.5 flex items-center gap-1 text-textcard">
                      {d.coinCanje}
                      <AiOutlineDollar />
                    </span>
                  </div>
                </div>
                <div className="flex justify-between p-4">
                  <input
                    type="number"
                    className="w-12 outline-none p-1.5 bg-bgcardlabel rounded-md translate-x-2 text-center"
                    placeholder="1"
                    min={1}
                    value={inputValues[index]} // Usar el valor del estado correspondiente al índice
                    onChange={(e) => {
                      const newInputValues = [...inputValues];
                      newInputValues[index] = e.target.value;
                      setInputValues(newInputValues);
                    }}
                  />
                  <button
                    className="bg-bgbuttoncard border-2 border-borderbuttoncard rounded-md text-white px-7 py-1 text-xs hover:border-bgcard  cursor-pointer transition"
                    onClick={() => {
                      handleButtonClick(index, d); // Pasar el índice y el objeto d como argumento
                    }}
                  >
                    Canjear
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link
        to={CARRITO}
        className="bg-backgroundsidebar hover:brightness-150 p-4 rounded-full text-white flex items-center gap-2 text-sm font-bold fixed right-2 md:right-16"
        onClick={() => handleLinkClick(CARRITO)}
      >
        <MdOutlineShoppingCart className="text-lg" />
      </Link>

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
              className="flex w-fit h-fit bg-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className=" w-fit flex transform overflow-hidden rounded bg-bgmodal p-5 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center justify-center w-72 text-bgtexttitle">
                  <span className="text-2xl font-bold">¡Genial!</span>
                  <p className="text-center mt-1.5 mb-3">
                    Ahora puedes <b>reclamar</b> tu <b>producto</b> en cualquier{" "}
                    <b>cafetería</b> de UTP+ market brindando tu código{" "}
                    <b>UTP</b>.
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
