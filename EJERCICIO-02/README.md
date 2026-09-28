# Ejercicio 02 · API de pizzas

Backend NestJS completo e independiente. No depende del ejercicio 01.

## Ejecutar

Requisitos: Node.js 24 y npm. Desde EJERCICIO-02:

```bash
cd backend
npm ci
npm run start:dev
```

Abrir http://localhost:3000/pizzas. Para ejecutarlo junto al ejercicio 01:

```bash
PORT=3012 npm run start:dev
```

En ese caso, abrir http://localhost:3012/pizzas.

## Qué he aprendido

El recorrido de una petición es: GET /pizzas → PizzasController →
PizzasService → array en memoria → respuesta JSON.

- `@Controller('pizzas')` define la ruta y `@Get()` atiende peticiones GET.
- El constructor del Controller recibe PizzasService mediante inyección de dependencias.
- `@Injectable()` permite que NestJS gestione e inyecte el Service.
- `AppModule` registra el Controller en controllers y el Service en providers.
- El array simula datos temporales; no es una base de datos y se reinicia al arrancar.

## Respuesta de comprensión

¿Por qué colocamos el array en el Service y no en el Controller?

Para separar responsabilidades: el Controller recibe la petición HTTP y delega;
el Service gestiona los datos y la lógica. Esto permite reutilizar esa lógica y,
más adelante, sustituir el array por una base de datos sin cambiar la ruta HTTP.

## Qué he modificado

Primero se comprobó el ejemplo original, que devolvía Margarita (9) y Pepperoni (11).
Después se añadió una tercera pizza, Cuatro quesos 🧀, con id 3 y precio 12.
Se conserva el endpoint GET /pizzas y las dos pizzas originales.

## Resultado

La petición GET /pizzas no requiere cuerpo ni parámetros y devuelve HTTP 200:

```json
[
  { "id": 1, "nombre": "Margarita", "precio": 9 },
  { "id": 2, "nombre": "Pepperoni", "precio": 11 },
  { "id": 3, "nombre": "Cuatro quesos 🧀", "precio": 12 }
]
```

## Archivos principales

- `backend/src/pizzas/pizzas.controller.ts`: recibe HTTP y delega.
- `backend/src/pizzas/pizzas.service.ts`: guarda y devuelve la lista.
- `backend/src/app.module.ts`: registra ambas clases.

## Entrega

Repositorio: https://github.com/gaabsito/C01-NEST-RN-CONEXION-API

Commit: `Ejercicio 02 - API de pizzas`.
