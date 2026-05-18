# Carts

Esta parte de la API se encarga de todo lo que tiene que ver con la gestión del
carrito asignado al usuario.

## Endpoints

### Crear item/producto en el carrito

POST `/api/carts/add/:id`

Asigna un registro de un producto a un registro de usuario. Requiere
autenticación

parámetro:

* `id` Número identificador del producto.

**Posibles errores**

Status code 404 - "el id proporcionado no está asignado a ningún producto". El
id proporcionado no está registrado. Asegúrate de que pertenezca a un producto
existente.

Status code 409 - "El producto ya está registrado en el carrito". No es posible
registrar 2 veces el mismo producto en referencia a un mismo usuario. Intenta
registrar otro producto o cambia de usuario.

### Obtener carrito

GET `/api/carts`

Retorna todos los productos que están registrados en el carrito del usuario.

### Actualizar cantidad del producto

PATCH `/api/carts/:id`

Actualiza la cantidad de un producto registrado.

parámetro:

* `id` Número identificador del producto.

La petición debe de incluir un cuerpo con el siguiente atributo:

* `quantity` Int. cantidad del producto a modificar. Debe ser mayor a 1.

Ejemplo:

```bash
{
    "quantity": 10
}
```

**Possibles errores**

Status code 400 - "No se incluyó un cuerpo en la petición". Debes de inlcuir
un cuerpo en la petición con los campos requeridos.

Status code 400 - "No se incluyó la cantidad". Debes de incluir el campo
requerido en el cuerpo de la petición

Status code 409 - "La cantidad debe ser un número entero". El atributo
"quantity" no cumple con el formato requerido. Debe ser un número entero.

Status code 409 - "La cantidad no puede ser menor a 1". El atributo "quantity"
no cumple con el formato requerido. Debe ser un número mayor a 1.

Status code 404 - "El producto no se encuentra registrado". El id proporcionado
en el parámetro de la ruta no pertenece a ningún producto registrado. Asegúrate
de que este esté presente en el carrito del usuario.

### Eliminar item/producto del carrito

DELETE `/api/carts/:id`

Elimina el registro del producto con el id proporcionado. Requiere
autenticación.

parámetro:

* `id` Número identificador del producto.

**Posibles errores**

Status code 404 - "El producto no está en el carrito". El producto con el id
propocionado no está registrado en el carrito. Asegúrate de que el producto
esté en el carrito antes de intentar eliminarlo.