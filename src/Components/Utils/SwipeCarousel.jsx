import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Slide1 from "../../Assets/Slide1.png"
import Slide2 from "../../Assets/Slide2.png"
import Slide3 from "../../Assets/Slide3.png"

const imgs = [
  Slide1,
  Slide2,
  Slide3
];

const SwipeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplay) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imgs.length);
      }
    }, 20000); // Cambiar cada 20 segundos

    return () => clearInterval(interval);
  }, [autoplay]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: -currentIndex * 33.4 + "%" });
  }, [currentIndex, controls]);

  return (
    <div className="relative w-full h-28 sm:h-40 md:h-48 lg:h-72 overflow-hidden">
      <motion.div
        className="flex"
        style={{ width: `${imgs.length * 100}%`, x: 0 }}
        animate={controls}
      >
        {imgs.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ))}
      </motion.div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imgs.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SwipeCarousel;
