# Ejercicio 10 · Likes

Backend: `cd backend && npm ci && npm run start:dev` (puerto 3020).
Frontend, en otra terminal: `cd frontend && npm ci && npm run web`.

GET /mascotas/1 consulta a Luna; PATCH /mascotas/1/like suma un like y devuelve el objeto actualizado. La pantalla muestra el contador recibido, bloquea pulsaciones durante la petición y permite recargar o reintentar.

Los likes viven en el array del servicio y se reinician al reiniciar NestJS.
Para Expo Go en un móvil, define EXPO_PUBLIC_API_URL con la IP local del Mac y el puerto 3020; localhost solo corresponde al dispositivo donde corre la app.
