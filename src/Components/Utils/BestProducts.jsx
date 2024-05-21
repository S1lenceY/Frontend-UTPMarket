import React, { useState, useEffect } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import imagenes from "../../Path/Imagenes";

const BestProducts = () => {

  //Cambiar esto por la recepción de datos que me den en el API
  const data = useLoaderData();

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
  const handleAddToCart = (d) => {
    const quantityInput = document.getElementById(`quantity_${d.id}`);
    let quantity = parseFloat(quantityInput.value);

    // Verificar si el valor ingresado es válido
    if (isNaN(quantity) || quantity <= 0) {
      quantity = 1; // Establecer la cantidad en 1 por defecto
      quantityInput.value = 1; // Actualizar el valor del input
    }

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id_producto === d.id
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      // Si el producto ya está en el carrito, actualizar su cantidad
      updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, cantidad: item.cantidad + quantity }
          : item
      );
    } else {
      // Si el producto no está en el carrito, agregarlo
      const newItem = {
        id_comprobante: "", // Cambiar esto por el ID real
        id_producto: d.id,
        nombre: d.name,
        id_category: d.id_category,
        cantidad: quantity,
        precio: d.price,
        coin: d.coin,
        estado_entrega: false,
        estado_pago: false,
      };
      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    updateTotalPrice(updatedCart);
    updateTotalCoins(updatedCart);
  };


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

  

  return (
    <>
      <div className="mt-5 w-72 sm:w-[610px] lg:w-[910px] xl:w-full flex overflow-x-auto scroll self-center sm:self-start">
        <div className="flex mb-2">
          {data.map((d, index) => {
            // Buscar la imagen correspondiente al nombre del producto
            const imagen = imagenes.find((img) => img.name === d.name);
            return (
              <div
                key={index}
                className="bg-white text-black rounded-md w-72 mr-5"
              >
                <img
                  src={imagen ? imagen.url : ""}
                  alt={d.name}
                  className="rounded-t-md w-full h-32"
                />
                <div className=" bg-[#F9CA29] w-full h-3"></div>
                <div className="flex mt-2 justify-between px-5 items-center">
                  <div className="flex flex-col">
                    <span className="font-bold">{d.name}</span>
                    <span className="text-sm">{d.id_category}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-[#EFF5FE] p-1.5 text-sm text-[#434A5D]">
                      S/ {d.price}
                    </span>
                    <span className="text-sm bg-[#EFF5FE] p-1.5 flex items-center gap-1 text-[#434A5D]">
                      {d.coin}
                      <AiOutlineDollar />
                    </span>
                  </div>
                </div>
                <div className="flex justify-between p-4">
                  <input
                    type="number"
                    id={`quantity_${d.id}`}
                    className="w-12 outline-none p-1.5 bg-[#EFF5FE] rounded-md "
                    min={1} // Establece el valor mínimo como 1
                    placeholder="1"
                  />
                  <button className="bg-[#000F37] border-2 border-[#3e3e3e] rounded-lg text-white px-3 py-1 text-xs hover:border-[#fff] cursor-pointer transition" onClick={() => handleAddToCart(d)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BestProducts;
