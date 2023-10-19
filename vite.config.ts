import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import { defineConfig } from "vite";

// Get current tag/commit and last commit date from git
const version = execSync("./scripts/get-version.sh").toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __VERSION_CHECK_INTERVAL__: 1000 * 10, // 10 seconds
  },
});
