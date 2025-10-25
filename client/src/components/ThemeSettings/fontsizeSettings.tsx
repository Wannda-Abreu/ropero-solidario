import "./fontSizeSettings.css";

const FONT_SIZE_OPTIONS = [
  {
    id: "compact",
    label: "Compacto",
    size: "0.95rem",
    description: "Más información en pantalla manteniendo legibilidad.",
    preview: "Texto de muestra",
  },
  {
    id: "comfortable",
    label: "Cómodo",
    size: "1rem",
    description: "Equilibrio entre espacio y lectura fluida.",
    preview: "Texto de muestra",
  },
  {
    id: "expanded",
    label: "Amplio",
    size: "1.12rem",
    description: "Prioriza la accesibilidad con un tamaño mayor.",
    preview: "Texto de muestra",
  },
];

const FontSizeToggle = ({ changePageFont, selectedSize = "1rem" }) => {
  const handleFontSelection = (fontSize) => {
    changePageFont(fontSize);
  };

  return (
    <section className="font-size-settings">
      <div className="font-size-settings__header">
        <h5 className="font-size-settings__title">Tamaño de texto</h5>
        <p className="font-size-settings__subtitle">
          Elige el estilo que se adapte mejor a tu forma de trabajar.
        </p>
      </div>
      <div className="font-size-options" role="list">
        {FONT_SIZE_OPTIONS.map((option) => {
          const isActive = option.size === selectedSize;

          return (
            <button
              key={option.id}
              type="button"
              role="listitem"
              aria-pressed={isActive}
              className={`font-size-card${isActive ? " is-active" : ""}`}
              onClick={() => handleFontSelection(option.size)}
            >
              <span className="font-size-card__label">{option.label}</span>
              <span
                className="font-size-card__preview"
                style={{ fontSize: option.size }}
              >
                {option.preview}
              </span>
              <span className="font-size-card__description">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default FontSizeToggle;





