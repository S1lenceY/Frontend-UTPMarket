import React from "react";
import SwipeCarousel from "./Utils/SwipeCarousel";
import BestProducts from "./Utils/BestProducts";


const Inicio = () => {
  return (
    <>
      <div className="flex flex-col">
        <SwipeCarousel />
        <div className="bg-white w-fit p-2 text-lg md:p-3 lg:pr-80 md:text-2xl gap-2 flex">
          <span>|</span> Regalos que harán sonreír a Mamá
        </div>
        <BestProducts />
      </div>
    </>
  );
};

export default Inicio;
