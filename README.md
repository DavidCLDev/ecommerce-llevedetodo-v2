# Ecommerce llevedetodo.com

## Descripción
Aplicación web fullstack de comercio electrónico desarrollada bajo una arquitectura
cliente-servidor. Permite autenticación de usuarios, gestión de productos y
flujo básico de compra, abarcando desde el modelado de la base de datos
hasta el diseño visual de una plataforma e-commerce.


## Estado
🚧 En desarrollo (Estructura inicial del proyecto)

## Tecnologías utilizadas

### Lenguajes
- HTML
- JavaScript
- CSS

### Frameworks y librerías
- React
- Express.js
- Tailwind CSS
- bcrypt (hash de contraseñas)
- jsonwebtoken (autenticación JWT)

### Entorno y herramientas
- Node.js
- Vite

### Base de Datos
- MariaDB

## Arquitectura del sistema

El proyecto sigue una arquitectura cliente-servidor:

- Frontend: SPA desarrollada con React y Vite.
- Backend: API REST construida con Node.js y Express.
- Base de datos: MariaDB relacional.

## Funcionalidades implementadas

- Inicio de sesión
- Registro de usuario
- Cierre de sesión.
- visualización de productos de prueba

---

## Cómo ejecutar el proyecto

### Requisitos previos
Antes de comenzar, asegúrate de tener instalado en tu sistema:
- **Node.js** >= 18 (incluye npm)
- **MariaDB** >= 10 (para base de datos)

---

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/ecommerce-llevedetodo-v2.git
cd ecommerce-llevedetodo-v2
```

### 2️⃣ Instalar las dependencias
```bash
npm install
```
### 3️⃣ Configurar la base de datos

1. Crear una base de datos en MariaDB.
2. Importar el script ubicado en:
   `/server/db/llevedetodo_202603041331.sql`

### 4️⃣ Crear variables de entorno

Cree un archivo `.env` en la carpeta raíz con la siguiente estructura:

DB_HOST=localhost

DB_USER=tu_usuario

DB_PASSWORD=tu_contraseña

DB_NAME=llevedetodo

DB_PORT=puerto_bd

JWT_SECRET=llave_secreta_autenticación

Ajuste las variables según la configuración de su sistema de base de datos.

### 5️⃣ Ejecutar el backend del proyecto
Abra una terminal y ejecute el siguiente comando para inicializar el backend:
```bash
node server/server.js
```

### 6️⃣ Ejecutar el frontend del proyecto en modo desarrollador
```bash
npm run dev
```

## Autores

### David Alejandro Camacho

- Fullstack developer
- Estudiante de ingeniería de sistemas
- Estudiante de Análisis y Desarrollo de Software

### Freyler Yesid Contrera

- Documentación
- Diseño UI
- Estudiante de Análisis y Desarrollo de Software

### Gustavo Grisales Soto
- Frontend Developer
- Diseño UI
- Estudiante de Análisis y Desarrollo de Software