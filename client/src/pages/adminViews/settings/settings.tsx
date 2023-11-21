import  { useState } from "react";
import FontSizeToggle from "../../../components/ThemeSettings/fontsizeSettings";

function SettingsPage() {
  const [fontSize, setFontSize] = useState("1rem");

  const changePageFont = (newSize) => {
    setFontSize(newSize);
  };

  return (
    <div>
      <h4>Ajustes</h4>
      <FontSizeToggle changePageFont={changePageFont} />
    </div>
  );
}

export default SettingsPage;

