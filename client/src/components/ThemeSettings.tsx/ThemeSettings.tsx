import FontSizeToggle from "@/components/ThemeSettings/fontsizeSettings";
import Dashboard from "@/pages/adminViews/Dashboard/dashboard";
import { useTheme } from "@/context/ThemeContext";

const ThemeSettings = () => {
  const { fontSize, setFontSize } = useTheme();

  const changePageFont = (newSize) => {
    console.log("Changing font size to:", newSize);
    setFontSize(newSize);
  };

  return (
    <div>
      <FontSizeToggle
        changePageFont={changePageFont}
        selectedSize={fontSize}
      />
      <Dashboard fontSize={fontSize} />
    </div>
  );
};

export default ThemeSettings;
