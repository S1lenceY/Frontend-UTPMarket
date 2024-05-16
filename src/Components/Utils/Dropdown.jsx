import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../Path/Paths";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center text-xl mx-2 md:mr-10"
          id="options-menu"
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="true"
        >
          <IoIosArrowDown
            className={`w-5 h-5 ${isOpen ? "transform rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute w-32 right-2 md:right-8 mt-3 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            <Link
              to={LOGOUT}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
             
              Cerrar Sesión
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
