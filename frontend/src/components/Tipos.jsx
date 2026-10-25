import { nomesTipos } from "./modules/dados.js";

function Etiquetas({ tipos }) {
  return (
    <>
      {tipos.map((tipo) => (
        <span key={tipo} className={`type-pill tipo-${tipo}`}>
          {nomesTipos[tipo] || tipo}
        </span>
      ))}
    </>
  );
}

export default Etiquetas;
