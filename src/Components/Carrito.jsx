import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import VISA from "../Assets/VISA.jpg";
import PayPal from "../Assets/PayPal.png";
import Caja from "../Assets/Caja.jpg";
import Logo from "../Assets/Logo.webp";
import imagenes from "../Path/Imagenes";
import PayModal from "./Utils/PayModal";
import { useCoins } from "../Auth/CoinsContext";
import { useLoaderData } from "react-router-dom";

const Carrito = () => {
  const cupon = useLoaderData();

  const { totalCoins: totalCoinsContext, updateTotalCoins } = useCoins();
  const [totalCoinsGanadas, setTotalCoinsGanadas] = useState(0);
  const totalCoinsLocalStorage =
    parseFloat(localStorage.getItem("totalCoins")) || 0;
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalPay, setShowModalPay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(
    parseFloat(localStorage.getItem("totalPrice")) || 0
  );
  const [iva, setIva] = useState(totalPrice * 0.18);
  const [totalPagar, setTotalPagar] = useState(totalPrice + iva);

  //Constantes para editar:
  // Estado para editar productos
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  useEffect(() => {
    setTotalCoinsGanadas(totalCoinsLocalStorage);
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProductos(storedCartItems);
  }, []);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleButtonPayClick = async () => {
    const newTotalCoins = totalCoinsContext + totalCoinsGanadas;
    updateTotalCoins(newTotalCoins);
    setShowModalPay(true);

    try {
      await axios.post(
        "http://localhost:8080/utp-market-api/usuarios/ActualizarCoins",
        {
          id: userId,
          coins: totalCoinsGanadas,
        }
      );
      console.log("Coins actualizadas con éxito");
    } catch (error) {
      console.error("Error al actualizar las coins:", error);
    }
  };

  const pago = [
    { id: 1, name: "VISA", img: VISA, category: "Banca Movil" },
    { id: 2, name: "PayPal", img: PayPal, category: "Banca Movil" },
  ];

  const userId = localStorage.getItem("userID");
  const currentDate = new Date().toISOString().split("T")[0];

  const handleEnviarComprobante = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/utp-market-api/comprobante",
        { fecha: currentDate, total: totalPagar, id_usuario: userId }
      );
      console.log("Comprobante enviado con éxito:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error al enviar el comprobante:", error);
    }
  };

  const enviarDetalleCompra = async (producto, idComprobante) => {
    try {
      const datos = {
        id_comprobante: idComprobante,
        id_producto: producto.id_producto,
        cantidad: producto.cantidad,
        precio: producto.precio,
        estado_entrega: true,
        estado_pago: false,
      };
      const response = await axios.post(
        "http://localhost:8080/utp-market-api/detallecompra",
        datos
      );
      console.log("Detalle de compra enviado con éxito:", response.data);
    } catch (error) {
      console.error("Error al enviar el detalle de compra:", error);
    }
  };

  const handleEnviarDetalleCompra = async (idComprobante) => {
    for (const producto of productos) {
      await enviarDetalleCompra(producto, idComprobante);
    }
  };

  const handlePurchase = async () => {
    setIsLoading(true); //Que está cargando en true
    const idComprobante = await handleEnviarComprobante();
    if (idComprobante) {
      await handleEnviarDetalleCompra(idComprobante);
      handleButtonPayClick();
      handleCloseModal();
    }
    setIsLoading(false); // Que se haga falso
  };

  //CanjearCupon:
  const handleCouponClick = () => {
    const coupon = cupon.find((c) => c.code === couponCode.trim());
    if (coupon) {
      const discountPercentage = coupon.discountPercentage;
      setDiscount(discountPercentage);
      calculateTotals(productos, discountPercentage);
    } else {
      setDiscount(0);
      calculateTotals(productos, 0);
    }
    setCouponCode(""); // Limpiar el campo de entrada después de aplicar el cupón
  };

  //Eliminar Producto
  useEffect(() => {
    calculateTotals(productos, discount);
  }, [productos]);

  const calculateTotals = (products, discountPercentage = 0) => {
    const total = products.reduce(
      (acc, product) => acc + product.precio * product.cantidad,
      0
    );
    const newIva = total * 0.18;
    let newTotalPagar = total + newIva - discountPercentage;
    if (newTotalPagar < 0) {
      newTotalPagar = 0;
    }

    // Calcula las coins ganadas
    const newTotalCoinsGanadas = products.reduce(
      (acc, product) => acc + product.cantidad * product.coin,
      0
    );

    setTotalPrice(total);
    setIva(newIva);
    setTotalPagar(newTotalPagar);
    setTotalCoinsGanadas(newTotalCoinsGanadas);

    localStorage.setItem("totalPrice", total.toFixed(2));
    localStorage.setItem("totalCoins", newTotalCoinsGanadas);
  };

  const handleRemoveProduct = (index) => {
    const newProductos = productos.filter((_, i) => i !== index);
    setProductos(newProductos);
    localStorage.setItem("cartItems", JSON.stringify(newProductos));
    calculateTotals(newProductos, discount);
  };

  //Para editar:
  const handleEditProduct = (index) => {
    setEditingProductIndex(index);
    setNewQuantity(productos[index].cantidad.toString());
  };

  const handleSaveEdit = (index) => {
    const newProductos = [...productos];
    newProductos[index].cantidad = parseInt(newQuantity, 10);
    setProductos(newProductos);
    localStorage.setItem("cartItems", JSON.stringify(newProductos));
    calculateTotals(newProductos, discount);
    setEditingProductIndex(null);
    setNewQuantity("");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white p-3 text-lg md:p-3 md:text-2xl gap-2">
          <span>|</span> Carrito de Compras
        </div>
        <div className="flex">
          <div className="flex flex-col-reverse md:flex-row gap-3 mt-4">
            <div className="flex flex-col gap-5 max-h-64 md:max-h-[424px] overflow-y-auto scroll self-center md:self-start mt-5 md:mt-0">
              {productos.map((producto, index) => {
                const imagen = imagenes.find(
                  (img) => img.name === producto.nombre
                );
                return (
                  <div
                    key={index}
                    className="bg-white text-black rounded-md w-fit flex flex-col lg:flex-row mr-3 relative group"
                  >
                    <div
                      className="absolute right-2 top-2 opacity-0 text-2xl group-hover:opacity-100 transition-all cursor-pointer text-[#000f37]"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <IoIosClose />
                    </div>
                    <div
                      className="absolute right-8 top-3 opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-[#000f37]"
                      onClick={() => handleEditProduct(index)}
                    >
                      <CiEdit />
                    </div>
                    <div className="flex flex-col lg:flex-row">
                      <img
                        src={imagen ? imagen.url : ""}
                        className="rounded-t-md md:rounded-s-md w-64 h-32"
                        alt={producto.nombre}
                      />
                      <div className="bg-yellow-200 h-2 w-full lg:h-full lg:w-2"></div>
                    </div>
                    <div className="flex flex-col mt-2 justify-between p-3 px-5 w-full lg:w-80">
                      <div className="flex flex-col">
                        <span className="font-bold">{producto.nombre}</span>
                        <span className="text-sm">
                          Producto de {producto.id_category}
                        </span>
                      </div>
                      <div className="flex gap-3 self-end mt-5">
                        {editingProductIndex === index ? (
                          <input
                            type="number"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(e.target.value)}
                            className="text-sm bg-slate-300 p-1.5 w-14 outline-none"
                            min={1}
                          />
                        ) : (
                          <span className="text-sm bg-slate-300 p-1.5 flex items-center gap-1">
                            {producto.cantidad} unidades
                          </span>
                        )}
                        <span className="bg-[#000f37] text-white rounded-sm p-1.5 text-sm">
                          S/ {producto.precio}
                        </span>
                        {editingProductIndex === index && (
                          <button
                            onClick={() => handleSaveEdit(index)}
                            className="bg-green-500 text-white rounded-sm p-1.5 text-sm"
                          >
                            ✔
                          </button>
                        )}
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
                  <span>
                    <b>Descuento por cupón: </b>S/{discount}
                  </span>
                </div>
                <div className="flex flex-col text-sm py-3 border-b border-b-black">
                  <span>
                    <b>Coins Ganadas: </b>
                    {totalCoinsGanadas}
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
                  className="py-2 md:p-2 px-3 outline-none border w-[197px] "
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <div
                  className="flex items-center px-2 md:p-2 md:px-4 bg-slate-300 text-slate-500 font-bold border cursor-pointer hover:bg-gray-300"
                  onClick={handleCouponClick}
                >
                  Canjear cupón
                </div>
              </div>
              <button
                className={`w-full bg-[#000f37] text-white mt-3 p-2 rounded font-bold text-sm ${
                  productos.length === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={handleButtonClick}
                disabled={productos.length === 0}
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
              className="flex w-fit h-fit bg-transparent text-white mt-56 sm:mt-32 mb-3 lg:mt-0 lg:mb-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-fit flex transform overflow-hidden rounded bg-background p-5 text-left align-middle shadow-xl transition-all text-black">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-3">
                    <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500"></div>
                    <h2 className="text-zinc-900 mt-4 font-bold text-xl">
                      Procesando...
                    </h2>
                    <p className="text-zinc-600 mt-1">
                      Porfavor no cierre esta ventana
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col lg:flex-row">
                    <div className="hidden lg:block">
                      <img src={Logo} className="w-72" />
                    </div>
                    <div className="flex flex-col ml-4">
                      <div className="bg-white p-3 text-lg md:p-3 md:text-2xl gap-2 flex font-bold">
                        <span>|</span> Métodos de Pago
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                        {pago.map((p, index) => (
                          <div
                            className="bg-white text-black rounded-md w-fit flex flex-col m-3"
                            key={index}
                          >
                            <div className="flex flex-col">
                              <img
                                src={p.img}
                                className="rounded-t-md w-full h-32"
                              />
                              <div className="bg-yellow-200 w-full h-2"></div>
                            </div>
                            <div className="flex mt-2 justify-between p-3">
                              <div className="flex flex-col">
                                <span className="font-bold">{p.name}</span>
                                <span className="text-sm">{p.category}</span>
                              </div>
                              <div className="self-end">
                                <button
                                  className="p-1 px-3 rounded text-white text-sm bg-[#000f37]"
                                  onClick={handlePurchase}
                                >
                                  Elegir
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="bg-white text-black rounded-md w-fit flex flex-col m-3">
                          <div className="flex flex-col">
                            <img
                              src={Caja}
                              className="rounded-t-md w-56 h-32"
                            />
                            <div className="bg-yellow-200 w-full h-2"></div>
                          </div>
                          <div className="flex mt-2 justify-between p-3">
                            <div className="flex flex-col">
                              <span className="font-bold">CODE</span>
                              <span className="text-sm">Pago en Caja</span>
                            </div>
                            <div className="self-end">
                              <button
                                className="p-1 px-3 rounded text-white text-sm bg-[#000f37]"
                                onClick={() => {
                                  handleButtonPayClick();
                                  handleCloseModal();
                                }}
                              >
                                Elegir
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <PayModal
        showModalPay={showModalPay}
        setShowModalPay={setShowModalPay}
        setProductos={setProductos}
        setTotalCoinsGanadas={setTotalCoinsGanadas}
        setDiscount={setDiscount}
      />
    </>
  );
};

export default Carrito;
