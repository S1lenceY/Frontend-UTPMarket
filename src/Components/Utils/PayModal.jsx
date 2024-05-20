import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImHappy } from "react-icons/im";


const PayModal = ({ showModalPay, setShowModalPay, setProductos, setTotalCoinsGanadas, setDiscount  }) => {

  const handleCloseModalPay = () => {
    setShowModalPay(false);
    setProductos([]); // Limpiar la lista de productos al cerrar el modal de pago
    setTotalCoinsGanadas(0); // Limpiar los coins al cerrar el modal de pago
    setDiscount(0);
    // Eliminar los elementos del local storage al cerrar el modal de pago
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("totalCoins");
  };

  return (
    <AnimatePresence>
      {showModalPay && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center overflow-y-auto"
          onClick={handleCloseModalPay}
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
                  Ahora puedes reclamar tu compra en cualquier cafetería de UTP+
                  market brindando tu código UTP.
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
  );
};

export default PayModal;