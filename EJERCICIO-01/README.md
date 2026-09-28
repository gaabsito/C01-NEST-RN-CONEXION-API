# Ejercicio 01 · Hello Backend

Proyecto NestJS independiente con el endpoint `GET /hola`.

## Ejecutar

Requisitos: Node.js 24 y npm.

Desde esta carpeta:

```bash
cd backend
npm ci
npm run start:dev
```

Abrir http://localhost:3000/hola. Si el puerto está ocupado, ejecutar
`PORT=3011 npm run start:dev` y abrir http://localhost:3011/hola.

## Conceptos trabajados

- Un endpoint combina un método HTTP y una ruta: `GET /hola`.
- `@Controller('hola')` define la ruta base del controlador.
- `@Get()` conecta las peticiones GET de esa ruta con `saludar()`.
- El método devuelve un objeto que NestJS serializa como JSON.
- `AppModule` registra `HolaController` para que NestJS lo utilice.

## Respuesta de comprensión

¿Qué función cumple `@Get()` en este Controller?

Indica que `saludar()` atiende las peticiones HTTP GET. Como el controlador
usa la ruta `hola` y `@Get()` no añade otra ruta, el endpoint es `GET /hola`.

## Modificación

Primero se ejecutó el ejemplo original y se comprobó una respuesta HTTP 200
con `{"mensaje":"¡Hola desde NestJS! 🚀"}`.
Después se personalizó el mensaje y se añadió `curso: 'DAM'`, conservando GET /hola.

## Resultado esperado

```json
{
  "mensaje": "¡Hola! Este es mi primer backend con NestJS 🚀",
  "curso": "DAM"
}
```

La petición no necesita cuerpo ni parámetros. Sale un objeto JSON con mensaje y curso.
El archivo principal del ejercicio es `backend/src/hola/hola.controller.ts`.

## Entrega

Repositorio: https://github.com/gaabsito/C01-NEST-RN-CONEXION-API

Ejercicio subido a la rama `main` con el commit `Ejercicio 01 - Hello Backend`.
Compilación y comprobaciones del proyecto correctas; `GET /hola` devuelve HTTP 200
con el mensaje personalizado y `curso: "DAM"`.
