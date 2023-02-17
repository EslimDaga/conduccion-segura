import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";

dns.setDefaultResultOrder("verbatim");

process.env.PORT = 3000;

export default defineConfig({
	plugins: [react()],
	server: {
		port: process.env.PORT,
	},
});
