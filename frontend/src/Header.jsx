import React from "react";

const Header = () => {
  return (
    <header className="font-ManropeBlack">
      <div className="logo text-3xl">
        <h2>Pokedex</h2>
      </div>
      <div className="sections flex gap-4">
        <ul className="flex gap-4 sectionsAtivas">
          <li className="text-[#ef4035] cursor-pointer" id="sectionFull">
            Explorar
          </li>
          <li className="text-[#0000008C] cursor-pointer" id="sectionFav">
            Favoritos
          </li>
        </ul>
        <div className="filtro">
          <p>
            &#10084;&#65039;&#65039; <span id="qtdFavoritos">0</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
