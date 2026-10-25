const Header = ({ quantidade, aba, mudarAba }) => {
  return (
    <header className="font-ManropeBlack">
      <div className="logo text-3xl">
        <h2>Pokedex</h2>
      </div>

      <div className="sections flex gap-4">
        <ul className="flex gap-4 sectionsAtivas">
          <li
            className={`${aba === "explorar" ? "text-[#ef4035]" : "text-[#0000008C]"} cursor-pointer`}
            onClick={() => mudarAba("explorar")}
          >
            Explorar
          </li>

          <li
            className={`${aba === "favoritos" ? "text-[#ef4035]" : "text-[#0000008C]"} cursor-pointer`}
            onClick={() => mudarAba("favoritos")}
          >
            Favoritos
          </li>
        </ul>

        <div className="filtro">
          <p>
            ❤️ <span>{quantidade}</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
