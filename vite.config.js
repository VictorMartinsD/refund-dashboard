const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
