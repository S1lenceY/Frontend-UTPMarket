import React from "react";
import SwipeCarousel from "./Utils/SwipeCarousel";
import BestProducts from "./Utils/BestProducts";

const Inicio = () => {
  
  return (
    <>
      <div className="flex flex-col">
        <SwipeCarousel />
        <div className="bg-bgtitle w-fit p-2 text-lg md:p-3 lg:pr-80 md:text-2xl text-bgtexttitle gap-1 md:gap-2 flex">
          <span>|</span><b>Regalos</b>que harán<b>sonreír</b>a<b className="text-[#FF395C]">Mamá</b>
        </div>
        <BestProducts />
      </div>
    </>
  );
};

export default Inicio;
