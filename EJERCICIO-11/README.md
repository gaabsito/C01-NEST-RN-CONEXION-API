# Ejercicio 11 · Mini tienda

GET /productos lista el catálogo. POST /productos recibe nombre y precio, crea un producto y la pantalla vuelve a consultar la lista.

Backend: `cd backend && npm ci && npm run start:dev` (puerto 3021).
Frontend, en otra terminal: `cd frontend && npm ci && npm run web`.

Los datos viven en memoria y se reinician con el backend. Para móvil, configura EXPO_PUBLIC_API_URL con la IP del Mac y el puerto del backend.
