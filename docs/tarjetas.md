# Cards

Esta parte de la API se encarga de todo lo que tiene que ver con la gestión
de tarjetas de pago del usuario.

## Endpoints

### Crear una tarjeta

POST `/api/users/me/cards`

Crea una tarjeta asignándosela al usuario autenticado. Requiere autenticación.

el cuerpo de la petición necesita estar en un formato JSON e incluir todos los
siguientes campos:

* `holder` - String. nombre del titular de la tarjeta, debe tener por lo menos
3 caracteres.

* `cardNumber` - String. Número de la tarjeta. Debe tener entre 13 y 19
caracteres.

* `expiry` - String. fecha de vencimiento de la tarjeta. Debe cumplir con el
formato mm/yy.

Ejemplo:

```bash
{
    "holder": "Freyler Grisales",
    "cardNumber": "012345678912345678",
    "expiry": "06/26"
}
```

**Posibles errores**

Status code 400 - "Datos incompletos". No se envió ningún dato. Debes de
incluir todos los campos descritos anteriormente en el cuerpo de la petición.

Status code 400 - "Número de tarjeta inválido". El campo `cardNumber` no
cumple con el formato solicitado.

Status code 400 - "Titular inválido". El campo `holder` no cumple con el
formato solicitado.

Status code 400 - "Formato de fecha inválido". El campo `expiry` no cumple
con el formato solicitado.

### Obtener tarjetas

GET `/api/users/me/cards`

El cuerpo de la respuesta contiene una lista con los datos de todas las
tarjetas registradas por el usuario.

### Eliminar tarjeta

DELETE `/api/users/me/cards/:id`

Permite eliminar la tarjeta con el id proporcionado

**Posibles errores**

Status code 404 - "No existe una tarjeta con el código proporcionado". El id
proporcionado no está asignado a ninguna tarjeta. Prueba con otro id.