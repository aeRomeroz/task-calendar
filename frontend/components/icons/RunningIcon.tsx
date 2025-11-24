import { useState } from "react";
import { IoIosAddCircle, IoMdPerson } from "react-icons/io"; // Ejemplo de ícono de persona

export default function RunButton() {
  const [active, setActive] = useState(false);

  const toggleActive = () => setActive(!active);

  return (
    <button
      onClick={toggleActive}
      className="absolute right-10 top-2 rounded-full transition-all focus:outline-none"
    >
      {/* Círculo */}
      <IoIosAddCircle
        size={40}
        className={`transition-colors duration-200 ${
          active ? "text-green-500" : "text-green-500/50" // lleno o delineado
        }`}
      />
      {/* Personita */}
      <IoMdPerson
        size={20}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
          active ? "text-white" : "text-green-500"
        }`}
      />
    </button>
  );
}
