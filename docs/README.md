# API Llevedetodo
Esta api te permite interactuar correctamente con la base
de datos de la aplicación de comercio electrónico llevedetodo.com

## Comprobar funcionamiento de la API

GET `/health`

retorna el estado de la API.

## Posibles Errores generales

Status code 401 - "No autorizado" Se omitió el header Authorization con
el respectivo token. Asegúrate de establecer el token en el header
Athorization siguiendo este formato: `Bearer <Token>`

Status code 403 - "Token inválido" El token de autenticación ya expiró.
Genera otro al iniciar sesión y vuelve a intentarlo.

Status code 500 - "Error del servidor" Error inesperado en el servidor.