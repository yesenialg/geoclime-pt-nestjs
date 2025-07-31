# Prueba técnica 07/2025

## Tecnologías usadas
- Nest.js
- Postgres
- Docker

## Iniciar proyecto

Se requiere docker en el equipo para poder correr el proyecto

1. Clonar proyecto
2. Hacer `npm i` en la consola en la raíz del proyecto
3. Agregar en la raíz del proyecto un archivo `.env` con las siguientes líneas
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=geoclime

JWT_SECRET=hardcoded_secret
API_KEYS=key123

APP_PORT=3000
```
4. Ingresar a la carpeta `src/local-environment` y lanzar el comando `docker-compose up`

5. Correr el comando `npm run start` en la raíz del proyecto para iniciar el proyecto

6. Ingresar a la url [API Swagger](http://localhost:3000/api)

7. Primero se debe hacer el logueo en el endpoint `auth/login`, y copiar el token para la autorización

8. En el botón superior de **Authorize**, agregar el token del logueo en el campo **bearer**, y en el campo **apiKey** escribir `key123`.

9. Ya con esto se pueden crear zones y tomar el id de estos para crear los records.