import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        svgr({
            svgrOptions: {
                ref: true,
            },
        }),
        react(),
    ],
    server: {
        port: 3000,
        host: true,
    },
    build: {
        outDir: "./build",
    },
});