# Products

Esta parte de la API se encarga de todo lo que tiene que ver con los productos
comercializados en el sitio web.

## Endpoints

### Obtener categorías

GET `/api/products/categories`

Retorna una lista de todas las categorías a las que puede pertenecer un
producto.

### Obtener productos recomendados

GET `/api/products/recomendados`

Te permite obtener los datos básicos de varios productos.

### Crear un producto

POST `/api/products/create`

Crea un registro de un producto que es ofrecido por una empresa. Requiere
autenticación.

el cuerpo de la petición necesita estar en un formato JSON e incluir todos los
siguientes campos:

* `name` - String. Nombre del producto.

* `price` - Int. precio del producto. Debe ser mayor a 50.

* `discount` - Double o Float. Descuento del producto. Representa un
porcentaje y el valor debe estar entre 0 y 1. Opcional.

* `shippingCost` - Int. Costo de envío del producto. Debe ser mayor o igual a
0\. Opcional.

* `stock` - Int. Cantidad de unidades disponibles del producto. Debe ser mayor
o igual a 0.

* `brand` - String. Marca del producto.

* `descr` - String. Descripción del producto.

* `catId` - Int. identificador de la categoría a la cual pertenece el producto.

Ejemplo:

```bash
    {
        "name": "Audífonos Pro max",
        "price": 320000,
        "discount": 0.3,
        "shippingCost": 15000,
        "stock": 10,
        "brand": "Soundpeats",
        "descr": "Audífonos de alta calidad. El formato perfecto para tí!",
        "catId": 1
    }
```

**Posibles errores**

Status code 401 - "el usuario no tiene asignada a ninguna empresa". El usuario
no tiene una empresa registrada en su cuenta. Asegúrate de tener registrada la
empresa antes de intentar eliminarla.

Status code 409 - "el precio debe ser mayor o igual a 50". El formato del
precio es incorrecto, asegúrate de que el campo "price" sea un número a 50.

Status code 409 - "el descuento debe estar entre 0 y 1". El formato del
descuento es incorrecto, asegúrate de que el campo "discount" sea un número
entre 0 y 1.

Status code 409 - "el stock debe ser mayor o igual a 0". El formato del stock
es incorrecto, asegúrate de que el campo "stock" sea un número mayor o igual a
0.

Status code 409 - "el costo de envío debe ser mayor o igual a 0". El formato
del costo de envío es incorrecto, asegúrate de que el campo "shippingCost" sea
un número mayor o igual a 0.

### Obtener un producto en específico

GET `/api/products/:id`

Retorna la información específica de un producto

**Posibles errores**

Status code 404 - "No existe ningún producto con el id proporcionado".
Asegúrate de que el id que se proporciona en el parámetro de la ruta esté
enlazado a un producto que esté previamente registrado.

### Actualizar datos de un producto

PATCH `/api/products/:id`

Actualiza los datos de un producto. Requiere autenticación.

el cuerpo de la petición necesita estar en un formato JSON e incluir por lo
menos uno de los siguientes campos:

* `name` - String. Nombre del producto.

* `price` - Int. precio del producto. Debe ser mayor a 50.

* `discount` - Double o Float. Descuento del producto. Representa un
porcentaje y el valor debe estar entre 0 y 1.

* `shippingCost` - Int. Costo de envío del producto. Debe ser mayor o igual a
0\.

* `stock` - Int. Cantidad de unidades disponibles del producto. Debe ser mayor
o igual a 0.

* `brand` - String. Marca del producto.

* `descr` - String. Descripción del producto.

* `catId` - Int. identificador de la categoría a la cual pertenece el producto.

Ejemplo:

```bash
    {
        "name": "Audífonos Pro",
        "price": 300000,
        "discount": 0.2,
        "shippingCost": 7500,
        "stock": 15,
        "brand": "Sony",
        "descr": "Audífonos de muy alta calidad. El formato perfecto para usted!",
        "catId": 2
    }
```

**Posibles errores**

Status code 401 - "el usuario no tiene asignada a ninguna empresa". El usuario
no tiene una empresa registrada en su cuenta. Asegúrate de tener registrada la
empresa antes de intentar eliminarla.

Status code 404 - "No se pudo actualizar el producto.". Asegúrate de que tanto
el id de la empresa como el id del producto estén debidamente registrados.

Status code 409 - "el precio debe ser mayor o igual a 50". El formato del
precio es incorrecto, asegúrate de que el campo "price" sea un número a 50.

Status code 409 - "el descuento debe estar entre 0 y 1". El formato del
descuento es incorrecto, asegúrate de que el campo "discount" sea un número
entre 0 y 1.

Status code 409 - "el stock debe ser mayor o igual a 0". El formato del stock
es incorrecto, asegúrate de que el campo "stock" sea un número mayor o igual a
0.

Status code 409 - "el costo de envío debe ser mayor o igual a 0". El formato
del costo de envío es incorrecto, asegúrate de que el campo "shippingCost" sea
un número mayor o igual a 0.

### Eliminar un producto

DELETE `/api/products/:id`

Elimina el producto que posee el id indicado por parámetro.

**Posibles errores**

Status code 401 - "el usuario no tiene asignada a ninguna empresa". El usuario
no tiene una empresa registrada en su cuenta. Asegúrate de tener registrada la
empresa antes de intentar eliminarla.

Status code 404 - "El producto con el identificador proporcionado, no existe".
El id pasado por parámetro no le corresponde a ningún producto registrado.
Asegúrate de que el producto registrado en la empresa tenga el mismo id que el
que se proporciona por parámetro.

