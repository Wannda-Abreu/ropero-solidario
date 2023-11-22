import { useState } from "react";
import FontSizeToggle from "../../components/ThemeSettings/fontsizeSettings";
import Dashboard from "../../pages/adminViews/Dashboard/dashboard";

const ThemeSettings = () => {
  const [fontSize, setFontSize] = useState("1rem");

  const changePageFont = (newSize) => {
    console.log("Changing font size to:", newSize);
    setFontSize(newSize);
  };

  return (
    <div>
      <FontSizeToggle changePageFont={changePageFont} />
      <Dashboard fontSize={fontSize} />
    </div>
  );
};

export default ThemeSettings;
