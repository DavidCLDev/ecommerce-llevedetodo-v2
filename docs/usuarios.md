# Users

Esta parte de la API se encarga de todo lo que tiene que ver con la gestión
de los datos básicos de la cuenta del usuario.

## Endpoints

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