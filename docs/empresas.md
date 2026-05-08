# Products

Esta parte de la API se encarga de todo lo que tiene que ver con los productos
comercializados en el sitio web.

## Endpoints

### Crear empresa

POST `/api/companies`

Crea una empresa, asignándole el id del usuario y creando una dirección en el
proceso. Requiere autenticación

el cuerpo de la petición necesita estar en un formato JSON e incluir todos los
siguientes campos:

* `name` - String. Nombre de la empresa, debe tener por lo menos 5
caracteres. Debe ser único.

* `description` - String. Párrafo descriptivo de la empresa.

* `address` - Object. Dirección de la empresa, Debe cumplir con las mismas
reglas establecida para la creación de direcciones (revisar **direcciones.md
 \- asignar direcciones**).

Ejemplo:

```bash
    {
        "name": "llevedetodo",
        "description": "La empresa llevedetodo, es una cadena de supermercados dedicados a comercializar productos de alta calidad..."
        "address": {
            "neighborhood": "Las américas",
            "exactAddress": "Cra 4 #36-42 5A",
            "zipCode": "110110",
            "municipalityId": "05001"
        }
    }
```

**Posibles errores**

Debido a que una empresa debe tener una dirección, se pueden obtener los mismos
errores que al crear una dirección (revisar **direcciones.md - asignar
direcciones**).

Status code 400 - "Datos incompletos". Falta algún dato en el cuerpo de la
petición. Asegúrate de que incluir todos los campos necesarios para la acción.

Status code 400 - "Nombre de empresa inválido". El campo `name` no cumple con
el formato solicitado.

Status code 409 - "El nombre ya está registrado". El nombre de la empresa
proporcionado en `name` pertenece a otra empresa y por tanto no es posible
registrar la empresa. Prueba con otro nombre.

Status code 409 - "el vendedor ya está asignado a otra empresa" . El usuario
está intentando registrar una empresa a su cuenta, aún cuando ya tiene una
registrada. Intenta eliminar la empresa que tienes asignada antes de registrar
una nueva.

Status code 409 - "la dirección ya está asignada a otra empresa". La dirección
proporcionada le pertenece a una empresa ya registrada. Prueba con otra.

### Obtener empresa

GET `/api/companies`

Retorna la información de la empresa que está a nombre del usuario. Requiere
autenticación.

**Posibles errores**

Status code 404 - "el usuario no tiene asignado a ninguna empresa". El usuario
no tiene una empresa registrada en su cuenta. Asegúrate de registrar la empresa
antes de intentar obtener su información.

### Actualizar datos de la empresa

PATCH `/api/companies`

Actualiza los datos básicos de la empresa. Requiere autenticación.

El cuerpo de la petición debe tener al menos UNO de estos campos a
actualizar:

* `name` - String. Nombre de la empresa. debe tener por lo menos 5
caracteres. Debe ser único.

* `description` - String. Párrafo descriptivo de la empresa.

Ejemplo:

```bash
    {
        "name": "llevedetodo",
        "description": "La empresa llevedetodo, es una cadena de supermercados dedicados a comercializar productos de alta calidad..."
    }
```

**Posibles errores**

Status code 400 - "Datos incompletos". Falta algún dato en el cuerpo de la
petición. Asegúrate de que incluir todos los campos necesarios para la acción.

Status code 400 - "Nombre de empresa inválido". El campo `name` no cumple con
el formato solicitado.

Status code 409 - "El nombre ya está registrado". El nombre de la empresa
proporcionado en `name` pertenece a otra empresa y por tanto no es posible
registrar la empresa. Prueba con otro nombre.

Status code 404 - "el usuario no tiene asignado a ninguna empresa". El usuario
no tiene una empresa registrada en su cuenta. Asegúrate de registrar la empresa
antes de intentar obtener su información.

### Eliminar empresa

DELETE `/api/companies`

Elimina la empresa asignada al usuario. Requiere autenticación.

**Posibles errores**

Status code 400 - "Datos incompletos". Falta algún dato en el cuerpo de la
petición. Asegúrate de que incluir todos los campos necesarios para la acción.

Status code 404 - "el usuario no tiene asignada a ninguna empresa". El usuario
no tiene una empresa registrada en su cuenta. Asegúrate de tener registrada la
empresa antes de intentar eliminarla.