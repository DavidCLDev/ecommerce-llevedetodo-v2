# Auth

Esta parte de la API se encarga de todo el proceso de autenticación del
usuario.

## Endpoints

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