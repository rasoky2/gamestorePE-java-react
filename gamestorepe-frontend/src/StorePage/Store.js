import React from "react";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import SpecialOffer from "./components/SpecialOffer";
import Recomended from "./components/Recomended";

const Store = () => {
  return (
    <div className="min-h-screen bg-SteamBackground"> {/* Aplicar el color personalizado */}
      <Navbar />
      <Categories />
      <Recomended />
      <SpecialOffer />
    </div>
  );
};

export default Store;
