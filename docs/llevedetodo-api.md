# API Llevedetodo
Esta api te permite interactuar correctamente con la base
de datos de la aplicación de comercio electrónico llevedetodo.com

## Endpoints

### Health

GET `/health`

retorna el estado de la API.

### Registrar o crear un usuario

POST `/api/usuario/register`

Permite crear o registrar un usuario.

el cuerpo de la petición necesita estar en un formato JSON e incluir las
siguiente propiedades:

* `name` - String
* `lastname` - String
* `email` - String
* `phone` - int, debe ser por lo menos de 10 digitos y que empiece por 3
* `username` - String
* `password` - String, debe contener 1 mayúscula, 1 minúscula, un número y mínimo 8 caracteres.

Ejemplo:

```bash
{
    "name": "Freyler",
    "lastname": "Grisales",
    "email": "freyler@gmail.com",
    "phone": 3124321234,
    "username": "Freyler123",
    "password": "3J3mpl0@"
}
```

El cuerpo de la respuesta contendrá datos básicos del usuario y el token
de autenticación.

**Posibles errores**

Status code 400 - "El formato del número no concuerda con un número del
país" El número proporcionado en el campo phone no cumple con los
requerimientos. Debe empezar con 3 y contener 10 dígitos.

Status code 404 - "Datos incompletos" Asegúrate de incluir los valores
para todos los campos necesarios en sus formatos correctos.

Status code 409 - "Correo ya existente" El correo ya se registró
previamente. Prueba otro valor en el campo email.

Status code 409 - "Nombre de usuario ya existente" El nombre de usuario
ya se registró previamente. Prueba otro valor en el campo username.

Status code 409 - "El número de celular ya está registrado" El número de
celulr ya se registró previamente. Prueba otro valor en el campo phone.


### Iniciar sesión

POST `/api/auth/login`

Permite autenticar el usuario registrado

el cuerpo de la petición necesita estar en un formato JSON e incluir las
siguiente propiedades:

* `email` - String Debe coincidir con el correo de un usuario registrado.
* `password` - String Debe coincidir con la contraseña asignada al correo
de un usuario registrado.

Ejemplo:

```bash
{
    "email": "freyler@gmail.com",
    "password": "3J3mpl0@"
}
```

El cuerpo de la respuesta contendrá datos básicos del usuario y el token
de autenticación.

**Posibles errores**

Status code 401 - "Credenciales inválidas" Los datos están completos
pero no coinciden con los datos de ningún usuario registrado. Asegúrate
que tanto el correo esté correctamente registrado y tenga asignada la
contraseña que estableciste.

Status code 404 - "Datos incompletos" Asegúrate de incluir los valores
para todos los campos necesarios en sus formatos correctos.


### Obtener datos básicos del usuario

GET `/api/auth/login`

Te permite obtener los datos básicos del usuario autenticado. Requiere
autenticación.

### Obtener productos

GET `/api/productos/recomendados`

Te permite obtener los datos básicos de varios productos.

### Obtener datos adicionales del usuario

GET `/api/users/me`

retorna información detallada del usuario. Requiere autenticación.

### Actualizar datos del usuario

PATCH `/api/users/me`

Permite actualizar datos básicos del usuario. Requiere autenticación.

el cuerpo de la petición necesita estar en un formato JSON e incluir UNA
de las siguientes propiedades:

* `username` - String Debe coincidir con el nombre del usuario del
correspondiente `id`. Debe tener al menos 3 caracteres y no puede
contener espacios.
* `email` - String Debe coincidir con el correo del usuario del
correspondiente `id`.
* `phone` - int, Debe coincidir con el número de celular del usuario
del correspondiente `id`. Debe ser por lo menos de 10 digitos y que
empiece por 3.

Adicionalmente, es posible actualizar el nombre completo del usuario,
no obstante, el cuerpo debe especificar los valores para los siguientes
dos campos:

* `name` - String Debe coincidir con el primer nombre del usuario del
correspondiente `id`. Debe tener al menos 3 caracteres y no puede
contener espacios.
* `lastname` - String Debe coincidir con el apellido del usuario del
correspondiente `id`. Debe tener al menos 3 caracteres y no puede
contener espacios.

**Ejemplos:**

Actualizar correo:

```bash
{
    "email": "freyler123@gmail.com"
}
```

Actualizar número de celular:

```bash
{
    "phone": 3134324235
}
```

Actualizar nombre de usuario:

```bash
{
    "username": "Fr3yl3r123"
}
```

Actualizar nombre completo:

```bash
{
    "name": "Gustavo"
    "lastname": "Grisales"
}
```

El cuerpo de la respuesta contiene los datos básicos del usuario
actualizados.

**Posibles errores**

Status code 400 - "Los campos están vacíos". No se envío ningún dato.
Debes de enviar todos los datos requeridos que se describieron
anteriormente.

Status code 400 - "El campo debe tener al menos 3 caracteres y no puede
contener espacios". Asegúrate de que el nombre de usuario, el primer
nombre y/o apellido cumplan con el formato requerido.

Status code 400 - "El formato del número no concuerda con un número del
país". Asegúrate de que el número de celular cumpla con el formato
requerido.

Status code 409 - "nombre de usuario ya existente". El nombre de usuario
proporcionado ya está registrado, prueba con otro.

Status code 409 - "correo ya existente". El correo proporcionado ya está
registrado, prueba con otro.

Status code 409 - el número de celular ya está registrado". El número de
celular proporcionado ya está registrado, prueba con otro.

### Eliminar usuario

DELETE `/api/users/me`

Permite eliminar el usuario. Requiere autenticación.

el cuerpo de la petición necesita estar en un formato JSON e incluir el
siguiente campo:

* `confirmPass` - String, Debe coincidir con la contraseña del usuario con
el correspondiente `id`.

Ejemplo:

```bash
{
    "confirmPass": "3J3mpl0@"
}
```

**Posibles errores**

Status code 401 - "Contraseña inválida" La contraseña proporcionada no
coincide con la del usuario registrado.

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

### Errores adicionales

Status code 401 - "No autorizado" Se omitió el header Authorization con
el respectivo token. Asegúrate de establecer el token en el header
Athorization siguiendo este formato: `Bearer <Token>`

Status code 403 - "Token inválido" El token de autenticación ya expiró.
Genera otro al iniciar sesión y vuelve a intentarlo.

Status code 500 - "Error del servidor" Error inesperado en el servidor.