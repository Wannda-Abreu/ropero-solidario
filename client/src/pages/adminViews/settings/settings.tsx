import FontSizeToggle from "@/components/ThemeSettings/fontsizeSettings";
import "./settings.css";
import { useTheme } from "@/context/ThemeContext";

function SettingsPage() {
  const { fontSize, setFontSize } = useTheme();

  return (
    <section className="settings-page">
      <header>
        <h4>Ajustes</h4>
        <p>Personaliza cómo ves el panel de administración.</p>
      </header>
      <FontSizeToggle
        changePageFont={setFontSize}
        selectedSize={fontSize}
      />
      <div className="settings-page__preview" style={{ fontSize }}>
        <h5>Vista previa</h5>
        <p>
          Este ejemplo refleja cómo se verá el dashboard con el tamaño de texto
          que elijas.
        </p>
        <ul>
          <li>Accesos rápidos con acciones prioritarias.</li>
          <li>Listados de citas más legibles.</li>
          <li>Indicaciones claras para nuevos usuarios.</li>
        </ul>
      </div>
    </section>
  );
}

export default SettingsPage;

