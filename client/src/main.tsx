import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./shared/context";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
);
