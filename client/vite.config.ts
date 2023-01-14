import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("../../ScrabbleCerts/scrabble-key-np.key"),
      cert: fs.readFileSync("../../ScrabbleCerts/scrabble-cert-365.crt"),
    },
    host: true,
  },
  plugins: [react()],
});
