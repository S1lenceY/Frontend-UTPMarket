import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AxiosHeader from "../Auth/AxiosHeader";
import VISA from "../Assets/VISA.jpg";
import PayPal from "../Assets/PayPal.png";
import Caja from "../Assets/Caja.jpg";
import Logo from "../Assets/Logo.webp";
import imagenes from "../Path/Imagenes";
import PayModal from "./Utils/PayModal";

const Carrito = () => {
  //Para obtener productos:
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProductos(storedCartItems);
  }, []);

  console.log(productos);

  //Para abrir modal de Método de Pago:
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Para abrir modal de Pago exitoso:
  const [showModalPay, setShowModalPay] = useState(false);

  const handleButtonPayClick = () => {
    setShowModalPay(true);
  };    

  //Definiendo los métodos de pago
  const pago = [
    {
      name: "VISA",
      img: VISA,
      category: "Banca Movil",
    },
    {
      name: "PayPal",
      img: PayPal,
      category: "Banca Movil",
    },
  ];

  // Obtener el precio total del localStorage
  const totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

  // Obtener las coins totales del localStorage
  const totalCoins = parseFloat(localStorage.getItem("totalCoins")) || 0;

  // Calcular el IGV
  const iva = totalPrice * 0.18;

  // Calcular el Total a Pagar
  const totalPagar = totalPrice + iva;

  //Haciendo POST:
  // Generar un id de usuario aleatorio (CORREGIR POR EL ID DE USUARIO VERDADERO)
  const userId = localStorage.getItem("userID");

  // Obtener la fecha actual en formato YYYY-MM-DD
  const currentDate = new Date().toISOString().split("T")[0];

  //Estableciendo variable para almacenar la respuesta del Backend:
  const [respuestaBackend, setRespuestaBackend] = useState(null);

  // Manejar el envío del comprobante
  const handleEnviarComprobante = async () => {
    AxiosHeader();
    try {
      const response = await axios.post(
        "https://apiutpmarket-production.up.railway.app/utp-market-api/comprobante",
        {
          fecha: currentDate,
          total: totalPagar,
          id_usuario: userId,
        }
      );
      console.log("Comprobante enviado con éxito:", response.data);

      // Almacenar la respuesta del backend en el estado
      setRespuestaBackend(response.data);
    } catch (error) {
      console.error("Error al enviar el comprobante:", error);
      // Aquí puedes manejar los errores de la solicitud, como mostrar un mensaje de error al usuario
    }
  };

  //Post Final
  // Post de detalle de compra por cada producto
  const enviarDetalleCompra = async (producto) => {
    AxiosHeader();
    try {
      // Construir el objeto de datos para enviar al backend
      const datos = {
        id_comprobante: respuestaBackend.id, // Usar el ID del comprobante del backend
        id_producto: producto.id_producto,
        cantidad: producto.cantidad,
        precio: producto.precio,
        estado_entrega: true,
        estado_pago: false,
      };

      // Hacer la solicitud POST
      const response = await axios.post(
        "https://apiutpmarket-production.up.railway.app/utp-market-api/detallecompra",
        datos
      );
      console.log("Detalle de compra enviado con éxito:", response.data);
    } catch (error) {
      console.error("Error al enviar el detalle de compra:", error);
      // Aquí puedes manejar los errores de la solicitud, como mostrar un mensaje de error al usuario
    }
  };

  // Manejar el envío de todos los detalles de compra(ITERACIÓN DE CADA PRODUCTO)
  const handleEnviarDetalleCompra = async () => {
    // Iterar sobre cada producto y enviar el detalle de compra
    for (const producto of productos) {
      await enviarDetalleCompra(producto);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white p-3 text-lg md:p-3 md:text-2xl gap-2 flex">
          <span>|</span> Carrito de Compras
        </div>
        <div className="flex">
          <div className="flex gap-10 mt-4">
            <div className="flex-col gap-5 max-h-[424px] overflow-y-auto scroll hidden md:flex">
              {productos.map((producto, index) => {
                // Encuentra la imagen correspondiente al producto
                const imagen = imagenes.find(
                  (img) => img.name === producto.nombre
                );

                return (
                  <div
                    key={index}
                    className="bg-white text-black rounded-md w-fit flex mr-3"
                  >
                    <div className="flex">
                      <img
                        src={imagen ? imagen.url : ""} // Si no se encuentra la imagen, se usa una de relleno
                        className="rounded-s-md w-64 h-32"
                        alt={producto.nombre}
                      />
                      <div className="bg-yellow-200 h-full w-2"></div>
                    </div>
                    <div className="flex flex-col mt-2 justify-between p-3 px-5">
                      <div className="flex flex-col">
                        <span className="font-bold">{producto.nombre}</span>
                        <span className="text-sm">
                          Producto de {producto.id_category}
                        </span>
                      </div>
                      <div className="flex gap-3 ml-40">
                        <span className="text-sm bg-slate-300 p-1.5 flex items-center gap-1">
                          {producto.cantidad} unidades
                        </span>
                        <span className="bg-[#000f37] text-white rounded-sm p-1.5 text-sm">
                          S/ {producto.precio}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col">
              <div className="bg-white px-10 py-7 ">
                <div className="border-b border-b-black">
                  <span className="text-xl font-bold ">Datos Generales</span>
                </div>
                <div className="flex flex-col text-sm py-3 border-b border-b-black">
                  <span>
                    <b>Subtotal: </b>S/{totalPrice.toFixed(2)}
                  </span>
                  <span>
                    <b>IGV 18%: </b>S/{iva.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col text-sm py-3 border-b border-b-black">
                  <span>
                    <b>Coins Ganadas: </b>
                    {totalCoins}
                  </span>
                  <span>
                    <b>Lugar de Recepción: </b>UTP Sede Chiclayo
                  </span>
                </div>
                <div className="flex flex-col text-sm py-3 border-b border-b-black">
                  <span>
                    <b>Total a pagar: </b>S/{totalPagar.toFixed(2)}
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
                onClick={() => {
                  handleButtonClick();
                  handleEnviarComprobante();
                }}
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
                  <img src={Logo} className=" w-72" />
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
                            <button
                              className=" p-1 px-3 rounded text-white text-sm bg-[#000f37] "
                              onClick={ ()=> { handleEnviarDetalleCompra(); handleButtonPayClick(); handleCloseModal(); }}
                            >
                              Elegir
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="bg-white text-black rounded-md w-fit flex flex-col m-3">
                      <div className="flex flex-col">
                        <img src={Caja} className="rounded-t-md w-56 h-32 " />
                        <div className=" bg-yellow-200 w-full h-2"></div>
                      </div>

                      <div className="flex mt-2 justify-between p-3">
                        <div className="flex flex-col">
                          <span className="font-bold">CODE</span>
                          <span className="text-sm">Pago en Caja</span>
                        </div>
                        <div className="self-end">
                          <button className=" p-1 px-3 rounded text-white text-sm bg-[#000f37] " onClick={()=> {handleButtonPayClick(); handleCloseModal();}}>
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
      <PayModal showModalPay={showModalPay} setShowModalPay={setShowModalPay}/>
    </>
  );
};

export default Carrito;
