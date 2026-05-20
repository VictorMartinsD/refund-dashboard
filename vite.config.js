const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  base: "/refund-dashboard/",
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
