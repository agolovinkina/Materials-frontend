import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendUrl = "http://localhost:8080";

export default defineConfig({
  plugins: [react()],
  base: "/Materials-frontend",
  server: {
    proxy: {
      "/api": {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
