import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
import { sassPlugin } from "esbuild-sass-plugin"; // Statik import

export default defineConfig({
    plugins: [svgr(), react()],
    optimizeDeps: {
        extensions: [".css"],
        esbuildOptions: {
            plugins: [
                sassPlugin({ type: "style" }) // To'g'ridan-to'g'ri chaqirish
            ],
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        }
    },
    server: {
        host: true,
        port: 3737
    },
    preview: {
        allowedHosts: ["hard.agro-net.uz"]
    }
});
