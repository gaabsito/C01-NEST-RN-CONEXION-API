# Ejercicio 03 · Busca mascota

Proyecto NestJS independiente con `GET /mascotas/:id`.

## Ejecutar

Requisitos comprobados: Node.js 24, npm y Nest CLI.

Desde EJERCICIO-03:

```bash
cd backend
npm ci
npm run start:dev
```

Abrir http://localhost:3000/mascotas/2. Para usar otro puerto:

```bash
PORT=3013 npm run start:dev
```

Entonces las pruebas se hacen en http://localhost:3013.

## Qué he aprendido

- `@Get(':id')` define una ruta con un segmento variable.
- `@Param('id')` recoge ese segmento como texto.
- El Controller convierte el ID y delega la búsqueda en el Service.
- `find()` devuelve el primer objeto cuyo ID coincide o `undefined` si no hay coincidencia.
- El Service guarda un array temporal en memoria, no una base de datos.

Recorrido: GET /mascotas/2 → Controller → Number('2') → Service → find() → respuesta.

## Respuesta de comprensión

¿Por qué convertimos id con Number(id)?

Porque el parámetro de la URL llega como texto y los IDs del array son números.
`Number('2')` produce `2`, lo que permite comparar con igualdad estricta (`===`).
Sin conversión, `2 === '2'` es falso y la búsqueda no encuentra la mascota.

## Qué he modificado

La pestaña del Service del cuadernillo contiene fragmentos, sin definir el array.
Se completaron los imports, la clase, la inyección y dos mascotas de ejemplo:
Luna (id 1, gato) y Toby (id 2, perro), conservando Number(id) y find().
Tras probar esa versión se añade Nube (id 3, conejo).

## Pruebas y resultado

- `/mascotas/1`: Luna.
- `/mascotas/2`: Toby.
- `/mascotas/3`: Nube, la mascota añadida.
- `/mascotas/999`: ID inexistente. `find()` devuelve undefined y la respuesta comprobada es HTTP 200 con cuerpo vacío.

Este ejemplo no implementa una excepción 404: que una búsqueda no encuentre un
objeto no genera un error HTTP automáticamente. Tampoco valida el formato del ID;
por ejemplo, Number('abc') produce NaN y la búsqueda no encuentra coincidencias.

## Archivos principales

- `backend/src/mascotas/mascotas.controller.ts`: ruta y parámetro.
- `backend/src/mascotas/mascotas.service.ts`: datos y búsqueda.
- `backend/src/app.module.ts`: registro del Controller y del Service.

## Entrega

Repositorio: https://github.com/gaabsito/C01-NEST-RN-CONEXION-API

Commit: `Ejercicio 03 - Busca mascota`.

Validación: compilación, test del proyecto y lint correctos. Peticiones HTTP
verificadas para IDs 1, 2, 3, 999 y abc; los dos últimos devuelven cuerpo vacío.
