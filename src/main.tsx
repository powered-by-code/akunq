import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import App from "./App.tsx";
import "./index.css";

if (window.location.hostname !== "localhost") {
  posthog.init("phc_ay2mNbUTujRuE0756cu5X3wpvX8BI9QnOb32ZFqlOu0", {
    api_host: "https://us.i.posthog.com",
    session_recording: {
      maskAllInputs: false,
    },
  });
}

createRoot(document.getElementById("root")!).render(<App />);
