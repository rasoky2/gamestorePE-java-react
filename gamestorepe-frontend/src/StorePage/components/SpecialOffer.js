import React from "react";
import Card from "./Card";
import one from "../assets/1.jpg";
import two from "../assets/2.jpg";
const SpecialOffer = () => {
  const cards = [
    { wallpaper: one, title: "Gaming room" },
    { wallpaper: two, title: "Gaming room" },
    { wallpaper: one, title: "Gaming room" },
    { wallpaper: two, title: "Gaming room" },
    { wallpaper: one, title: "Gaming room" },
    { wallpaper: two, title: "Gaming room" },
    { wallpaper: one, title: "Gaming room" },
    { wallpaper: two, title: "Gaming room" },
    { wallpaper: one, title: "Gaming room" },
    { wallpaper: two, title: "Gaming room" },
  ];
  return (
    <div className="mx-[2rem]  ">
      <p className="pt-6 text-white">Games on Discount</p>

      <div className="grid grid-cols-2 gap-4 pt-3 md:grid-cols-3">
        {cards.map((card) => (
          <Card wallpaper={card.wallpaper} title={card.title} />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;