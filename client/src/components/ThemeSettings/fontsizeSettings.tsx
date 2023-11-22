const FontSizeToggle = ({ changePageFont }) => {
  const Sizes = ["1rem", "1.5rem", "5rem"];

  const changeFontSize = (fontSize) => {
    console.log("Changing font size to:", fontSize);
    changePageFont(fontSize);
  };

  return (
    <div>
      {Sizes.map((size) => (
        <button key={size} onClick={() => changeFontSize(size)}>
          {size}
        </button>
      ))}
    </div>
  );
};

export default FontSizeToggle;





