// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//   }
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",               // for https://humwooter.github.io/ (user site)
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});