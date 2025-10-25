import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/Routes/router";
import { ThemeProvider } from "@/context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
