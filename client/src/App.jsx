import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <AppRoutes />;
      <Toaster
        position="top-right"
        richColors
        expand={false}
        className="toaster-container"
      />
    </div>
  );
}

export default App;
