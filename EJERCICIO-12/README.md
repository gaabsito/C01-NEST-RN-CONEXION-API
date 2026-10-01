# Ejercicio 12 · Creature Lab

GET /criaturas lista las criaturas. GET /criaturas/:id busca por ID. PATCH /criaturas/:id/like suma un like y devuelve la criatura actualizada.

Backend: `cd backend && npm ci && npm run start:dev` (puerto 3022).
Frontend, en otra terminal: `cd frontend && npm ci && npm run web`.

Los datos viven en memoria y se reinician con el backend. Para móvil, configura EXPO_PUBLIC_API_URL con la IP del Mac y el puerto del backend.
