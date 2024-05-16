import React, { useState, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import imagenes from "../Path/Imagenes"

const Productos = () => {
  //Añadir precio total al carrito:
  const [totalPrice, setTotalPrice] = useState(0);

  // Añadir coins totales al carrito:
  const [totalCoins, setTotalCoins] = useState(0);

  // Obtener datos del localStorage al cargar la página
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    updateTotalPrice(storedCartItems);
  }, []);

  //Logica para añadir los datos del carrito al local storage
  const [cartItems, setCartItems] = useState([]);

  // Manejar clic en "Agregar al carrito"
  const handleAddToCart = (product) => {
    const quantity = parseFloat(
      document.getElementById(`quantity_${product.id_producto}`).value
    );

    const newItem = {
      id_comprobante: "", // Cambiar esto por el ID real
      id_producto: product.id,
      nombre: product.name,
      id_category: product.id_category,
      cantidad: quantity,
      precio: product.price,
      coin: product.coin,
      estado_entrega: false,
      estado_pago: false,
    };
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    updateTotalPrice(updatedCart);
    updateTotalCoins(updatedCart);
  };

  console.log(cartItems);

  // Actualizar el precio total
  const updateTotalPrice = (cart) => {
    const total = cart.reduce(
      (acc, item) => acc + item.cantidad * item.precio,
      0
    );
    setTotalPrice(total);
    localStorage.setItem("totalPrice", total);
  };

  // Actualizar los coins totales
  const updateTotalCoins = (cart) => {
    const coins = cart.reduce(
      (acc, item) => acc + item.cantidad * item.coin,
      0
    );
    setTotalCoins(coins);
    localStorage.setItem("totalCoins", coins);
  };

  //Cambiar esto por la recepción de datos que me den en el API
  const data = useLoaderData();

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
        <div key={category} className="flex flex-col mb-4">
          <div className="bg-white p-3 text-lg md:p-3 md:text-2xl gap-2 flex font-bold">
            <span>|</span> {category}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-8">
            {products.map((product, index) => {
              // Buscar la imagen correspondiente al nombre del producto
              const imagen = imagenes.find((img) => img.name === product.name);
              return (
                <div
                  key={index}
                  className="bg-white text-black rounded-md w-72"
                >
                  <img
                    src={imagen ? imagen.url : ""}
                    alt={product.name}
                    className="rounded-t-md w-full h-32"
                  />
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
                      id={`quantity_${product.id_producto}`}
                      className="w-20 outline-none p-1.5 bg-slate-300 rounded-md "
                    />
                    <button
                      className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-3 py-1 text-xs hover:border-[#fff] cursor-pointer transition"
                      onClick={() => handleAddToCart(product)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="bg-[#000f37] p-3 md:p-4 rounded-full md:rounded-sm text-white flex items-center gap-2 text-sm font-bold fixed right-3 md:right-6">
        S/ {totalPrice.toFixed(1)}
        <MdOutlineShoppingCart className="text-lg" />
      </div>
    </>
  );
};

export default Productos;
