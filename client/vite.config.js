import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Entradas HTML para o build (MPA). Sem isso, o Vite só gera index.html e as outras rotas 404 na Vercel. */
const htmlEntries = [
	"index.html",
	"src/pages/agendamento.html",
	"src/pages/blog.html",
	"src/pages/contato.html",
	"src/pages/conteudo-blog.html",
	"src/pages/criar-login.html",
	"src/pages/galeria-salas.html",
	"src/pages/login.html",
	"src/pages/meus-agendamentos.html",
	"src/pages/nosso-espaco.html",
	"src/pages/planos.html",
	"src/pages/post1-blog.html",
	"src/pages/post2-blog.html",
	"src/pages/post3-blog.html",
];

const rollupInput = Object.fromEntries(
	htmlEntries.map((rel) => {
		const key = rel.replace(/\.html$/, "").replace(/\//g, "-");
		return [key, resolve(__dirname, rel)];
	}),
);

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		build: {
			rollupOptions: {
				input: rollupInput,
			},
		},
		server: {
			proxy: {
				"/api": {
					target: env.VITE_API_REAL_URL,
					changeOrigin: true,
					secure: false,
					rewrite: (p) => p.replace(/^\/api/, ""),
				},
			},
			cors: false,
		},
		preview: {
			proxy: {
				"/api": {
					target: env.VITE_API_REAL_URL,
					changeOrigin: true,
					secure: false,
					rewrite: (p) => p.replace(/^\/api/, ""),
				},
			},
			cors: false,
		},
	};
});