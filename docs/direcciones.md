# Addresses

Esta parte de la API se encarga de todo lo que tiene que ver con las
direcciones del usuario.

### Asignar dirección

POST `/api/users/me/addresses`

Crea un registro de dirección y la asigna al usuario del correspondiente id.

el cuerpo de la petición necesita estar en un formato JSON e incluir todos los
siguientes campos:

* `neighborhood` - String. Barrio del municipio, debe tener por lo menos 5
caracteres.

* `exactAddress` - String. Dirección exacta de la residencia. Debe tener por
lo menos 10 caracteres.

* `zipCode` - String. Código postal correspondiente al sector en el que está
ubicada la residencia. Debe tener 6 digitos numéricos.

* `municipalityId` - String. Código del municipio seleccionado. Debe de
coincidir con un código de un municipio previamente registrado en la base de
datos.

Ejemplo:

```bash
    {
        "neighborhood": "Las américas",
        "exactAddress": "Cra 4 #36-42 5A",
        "zipCode": "110110",
        "municipalityId": "05001"
    }
```

**Posibles errores**

Status code 400 - "Nombre de barrio inválido". El campo `neighborhood` no
cumple con el formato solicitado.

Status code 400 - "La dirección proporcionada es inválida". El campo
`exactAddress` no cumple con el formato solicitado.

Status code 400 - "código de postal inválido". El campo `zipCode` no cumple
con el formato solicitado.

Status code 400 - "El código del municipio no existe". El id del municipio
proporcionado en el campo `municipalityId` no está registrado.

Status code 404 - "Datos incompletos". No se envió ningún dato. Debes de
incluir todos los campos descritos anteriormente en el cuerpo de la petición.

Status code 409 - "La dirección ya existe". La dirección proporcionada en
`exactAddress` ya existe y por tanto no es posible crear la dirección.

### Obtener direcciones del usuario

GET `/api/users/me/addresses`

El cuerpo de la respuesta contiene todas las direcciones asignadas al usuario.

### Obtener una dirección en específico

GET `/api/users/me/addresses/:id`

El cuerpo de la respuesta contiene la información completa sobre la dirección
con el id proporcionado.

**Posibles errores**

Status code 404 - "No existe una dirección con el código proporcionado". el id
proporcionado no pertenece a ninguna dirección registrada. Intenta con otro
valor.

### Actualizar dirección

PATCH `/api/users/me/addresses/:id`

Permite actualizar la dirección con el id proporcionado:

el cuerpo de la petición necesita estar en un formato JSON e incluir UNA
de las siguientes propiedades:

* `neighborhood` - String. Barrio del municipio, debe tener por lo menos 5
caracteres.

* `exactAddress` - String. Dirección exacta de la residencia. Debe tener por
lo menos 10 caracteres.

* `zipCode` - String. Código postal correspondiente al sector en el que está
ubicada la residencia. Debe tener 6 digitos numéricos.

* `municipalityId` - String. Código del municipio seleccionado. Debe de
coincidir con un código de un municipio previamente registrado en la base de
datos.

Ejemplo:

```bash
    {
        "neighborhood": "Santa fé",
        "exactAddress": "Cra 5 #63-42 5A",
        "zipCode": "63001",
        "municipalityId": "05001"
    }
```

**Posibles errores**

Status code 400 - "Nombre de barrio inválido". El campo `neighborhood` no
cumple con el formato solicitado.

Status code 400 - "La dirección proporcionada es inválida". El campo
`exactAddress` no cumple con el formato solicitado.

Status code 400 - "código de postal inválido". El campo `zipCode` no cumple
con el formato solicitado.

Status code 400 - "El código del municipio no existe". El id del municipio
proporcionado en el campo `municipalityId` no está registrado.

Status code 404 - "Datos incompletos". No se envió ningún dato. Debes de
incluir al menos un campo descrito anteriormente en el cuerpo de la petición.

Status code 404 - "No existe una dirección con el código proporcionado". El id
proporcionado no corresponde a ninguna dirección registrada. Intenta con otro.

Status code 409 - "La dirección ya existe". La dirección proporcionada en
`exactAddress` ya existe y por tanto no es posible crear la dirección.

### Eliminar dirección

DELETE `/api/users/me/addresses/:id`

Elimina la dirección a la que le corresponde el id proporcionado.

Status code 404 - "No existe una dirección con el código proporcionado". El id
proporcionado no corresponde a ninguna dirección registrada. Intenta con otro.