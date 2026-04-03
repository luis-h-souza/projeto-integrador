/** Base URL da API Laravel (sem barra final). Configure em `.env`: VITE_API_URL */
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000/api"
).replace(/\/$/, "");
