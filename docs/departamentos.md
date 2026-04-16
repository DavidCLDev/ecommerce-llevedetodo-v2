# Departments

Esta parte de la API se encarga de todo lo que tiene que ver con los
departamentos y sus respectivos municipios registrados en la base de datos.

## Endpoints

### Listar departamentos

GET `/api/departaments`

Retorna una lista con todos los departamentos de Colombia.

Los IDs corresponden a códigos oficiales DIVIPOLA.

### Listar municipios

GET `/api/departments/:id/municipalities`

Retorna una lista con todos los municipios del departamento con el id
proporcionado.

Los IDs corresponden a códigos oficiales DIVIPOLA.

**Posibles errores**

Status code 404 - "No existe ningún departamento con el código
suministrado". El id proporcionado es inválido, inténtalo de nuevo con
un id existente.