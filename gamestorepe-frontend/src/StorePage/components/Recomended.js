import React from "react";
import gaming from "../assets/gaming.jpg";
import { TbApps } from "react-icons/tb";

const Recomended = () => {
  return (
    <div className="mx-[2rem] mt-[2rem] text-white text-[14px] overflow-hidden">
      {/* Título de la sección */}
      <p className="text-white font-bold">DESTACADOS Y RECOMENDADOS</p>

      {/* Contenedor principal de la sección de juegos recomendados */}
      <div className="flex flex-col md:flex-row pt-3">
        
        {/* Contenedor de la imagen principal destacada */}
        <div className="w-full md:w-2/3 h-full bg-red-400">
          <img src={gaming} alt="Imagen de juego" className="object-cover w-full h-full" />
        </div>
        
        {/* Contenedor de la información del juego */}
        <div className="bg-[#0f1922] h-full w-full md:w-1/3 flex flex-col justify-between">
          
          {/* Información del juego */}
          <div className="flex flex-col items-center font-motivaSans px-4 py-2">
            <p className="text-[30px] mt-3">Gaming Room</p>
            <div className="w-full h-[15rem] pt-3">
              
              {/* Imágenes adicionales */}
              <div className="flex pb-1 gap-1">
                <img src={gaming} alt="Imagen de juego" className="object-cover w-1/2" />
                <img src={gaming} alt="Imagen de juego" className="object-cover w-1/2" />
              </div>
              <div className="flex pt-1 gap-1">
                <img src={gaming} alt="Imagen de juego" className="object-cover w-1/2" />
                <img src={gaming} alt="Imagen de juego" className="object-cover w-1/2" />
              </div>
              
              {/* Información de descuento */}
              <div className="flex flex-col items-center md:items-start mt-4">
                <p className="text-[22px]">Play Now</p>
                <div className="bg-[#8cc414] w-[6rem] rounded-[0.5rem] mt-1">
                  <p className="text-[15px] text-center">Discount</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Precio e icono */}
          <div className="flex items-center justify-between px-4 pb-2">
            <p className="text-[20px] md:text-[12px]">29.99$</p>
            <TbApps className="text-[25px] md:text-[19px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomended;
