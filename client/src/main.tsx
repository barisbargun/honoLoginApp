import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { QueryProvider } from "@/lib/react-query/QueryProvider.tsx";
import { DataProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </QueryProvider>
  </React.StrictMode>,
);
