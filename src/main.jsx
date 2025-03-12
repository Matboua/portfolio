import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18next"; // Add this line to import the i18next configuration

createRoot(document.getElementById("root")).render(<App />);
