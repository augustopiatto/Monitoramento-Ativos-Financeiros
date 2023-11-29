import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { FunnelsContextStorage } from "./contexts/FunnelsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FunnelsContextStorage>
    <App />
  </FunnelsContextStorage>
);
