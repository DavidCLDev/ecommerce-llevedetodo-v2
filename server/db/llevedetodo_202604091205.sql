/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: llevedetodo
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id_producto` int(11) NOT NULL COMMENT 'Representa el número único identificador del producto guardado por el usuario',
  `id_usuario` int(11) NOT NULL COMMENT 'Representa el número único identificador del usuario que guarda el producto',
  `cantidad` int(11) NOT NULL COMMENT 'Representa la cantidad deseada del producto a guardar',
  `precio_unitario` int(11) NOT NULL COMMENT 'valor monetario del producto guardado',
  PRIMARY KEY (`id_producto`,`id_usuario`),
  KEY `fk_Producto_has_Usuario_Usuario1_idx` (`id_usuario`),
  KEY `fk_Producto_has_Usuario_Producto1_idx` (`id_producto`),
  CONSTRAINT `fk_Producto_has_Usuario_Producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Producto_has_Usuario_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Representa el número único identificador de la categoría',
  `nombre` varchar(30) NOT NULL COMMENT 'el nombre de la categoría',
  `descripcion` varchar(150) DEFAULT NULL COMMENT 'La descripción de dicha categoría',
  `id_padre` int(11) NOT NULL COMMENT 'La categoría padre de la categoría',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  UNIQUE KEY `descripcion_UNIQUE` (`descripcion`),
  KEY `fk_Categoria_Categoria1_idx` (`id_padre`),
  CONSTRAINT `fk_Categoria_Categoria1` FOREIGN KEY (`id_padre`) REFERENCES `categoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Representa el número único identificador del departamento',
  `nombre` varchar(45) NOT NULL COMMENT 'El nombre del departamento',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES
(29,'AMAZONAS'),
(1,'ANTIOQUIA'),
(25,'ARAUCA'),
(2,'ATLÁNTICO'),
(3,'BOGOTÁ, D.C.'),
(4,'BOLÍVAR'),
(5,'BOYACÁ'),
(6,'CALDAS'),
(7,'CAQUETÁ'),
(26,'CASANARE'),
(8,'CAUCA'),
(9,'CESAR'),
(12,'CHOCÓ'),
(10,'CÓRDOBA'),
(11,'CUNDINAMARCA'),
(30,'GUAINÍA'),
(31,'GUAVIARE'),
(13,'HUILA'),
(14,'LA GUAJIRA'),
(15,'MAGDALENA'),
(16,'META'),
(17,'NARIÑO'),
(18,'NORTE DE SANTANDER'),
(27,'PUTUMAYO'),
(19,'QUINDIO'),
(20,'RISARALDA'),
(28,'SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA'),
(21,'SANTANDER'),
(22,'SUCRE'),
(23,'TOLIMA'),
(24,'VALLE DEL CAUCA'),
(33,'VAUPÉS'),
(32,'VICHADA');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `id_factura` int(11) NOT NULL COMMENT 'Representa el número único identificador de una factura',
  `id_producto` int(11) NOT NULL COMMENT 'Representa el número único identificador de un producto',
  `cantidad` int(11) NOT NULL,
  `precio_unitario` int(11) NOT NULL,
  `precio_total` int(11) NOT NULL,
  PRIMARY KEY (`id_factura`,`id_producto`),
  KEY `fk_factura_has_producto_producto1_idx` (`id_producto`),
  KEY `fk_factura_has_producto_factura1_idx` (`id_factura`),
  CONSTRAINT `fk_factura_has_producto_factura1` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_has_producto_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion`
--

DROP TABLE IF EXISTS `direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador de la dirección',
  `barrio` varchar(40) NOT NULL COMMENT 'El barrio en el que se ubica la dirección',
  `direccion_exacta` varchar(100) DEFAULT NULL COMMENT 'La dirección exacta suministrada por el usuario',
  `codigo_postal` varchar(6) NOT NULL COMMENT 'El código postaEl código postal de la direcciónl de la dirección',
  `es_principal` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Variable que identifica si la dirección es la preferida del usuario o es secundaria',
  `id_municipio` int(11) NOT NULL COMMENT 'El municipio en el que se encuentra ubicado la dirección',
  `id_usuario` int(11) NOT NULL COMMENT 'El usuario al que pertenece la dirección',
  PRIMARY KEY (`id`),
  KEY `fk_Direccion_Municipio1_idx` (`id_municipio`),
  KEY `fk_Direccion_Usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_Direccion_Municipio1` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Direccion_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador de la empresa',
  `nombre` varchar(50) NOT NULL COMMENT 'El nombre o razón social de la empresa',
  `descripcion` varchar(200) NOT NULL COMMENT 'Pequeña descripción sobre a lo que se dedica la empresa',
  `fecha_registro` date NOT NULL COMMENT 'La fecha en la que se registró la empresa',
  `logo` varchar(255) NOT NULL COMMENT 'Ruta en la que se encuentra la Imagen o slogan representativa de la empresa',
  `id_direccion` int(11) NOT NULL COMMENT 'Dirección en la que se encuentra ubicada la empresa',
  `id_vendedor` int(11) NOT NULL COMMENT 'Cuenta de usuario de la empresa\n',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  KEY `fk_Empresa_Direccion1_idx` (`id_direccion`),
  KEY `fk_empresa_usuario1_idx` (`id_vendedor`),
  CONSTRAINT `fk_Empresa_Direccion1` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_empresa_usuario1` FOREIGN KEY (`id_vendedor`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa_rubro`
--

DROP TABLE IF EXISTS `empresa_rubro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa_rubro` (
  `id_empresa` int(11) NOT NULL COMMENT 'Representa el número único identificador de una empresa',
  `id_rubro` int(11) NOT NULL COMMENT 'Representa el número único identificador del rubro al que se dedica la empresa',
  PRIMARY KEY (`id_empresa`,`id_rubro`),
  KEY `fk_Empresa_has_Rubro_Rubro1_idx` (`id_rubro`),
  KEY `fk_Empresa_has_Rubro_Empresa_idx` (`id_empresa`),
  CONSTRAINT `fk_Empresa_has_Rubro_Empresa` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Empresa_has_Rubro_Rubro1` FOREIGN KEY (`id_rubro`) REFERENCES `rubro` (`id_rubro`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa_rubro`
--

LOCK TABLES `empresa_rubro` WRITE;
/*!40000 ALTER TABLE `empresa_rubro` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresa_rubro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador del estado',
  `nombre` varchar(30) NOT NULL COMMENT 'Representa el nombre del estado en el que se encuentra la factura',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `etiqueta` (
  `idEtiqueta` int(11) NOT NULL COMMENT 'Representa el número único identificador de la etiqueta',
  `nombre` varchar(50) NOT NULL COMMENT 'Nombre de la etiqueta',
  PRIMARY KEY (`idEtiqueta`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
/*!40000 ALTER TABLE `etiqueta` DISABLE KEYS */;
/*!40000 ALTER TABLE `etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador de la factura',
  `fecha` timestamp NOT NULL COMMENT 'Fecha en la que se generó la compra',
  `total` int(11) NOT NULL COMMENT 'El costo total de la compra',
  `id_estado` int(11) NOT NULL COMMENT 'El estado en el que actualmente está la compra',
  `id_tarjeta` int(11) NOT NULL COMMENT 'La tarjeta con la que pagó la todos los productos',
  `id_usuario` int(11) NOT NULL COMMENT 'El Usuario que realizó la compra',
  PRIMARY KEY (`id`),
  KEY `fk_Factura_Estado1_idx` (`id_estado`),
  KEY `fk_Factura_Tarjeta1_idx` (`id_tarjeta`),
  KEY `fk_Factura_Usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_Factura_Estado1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Factura_Tarjeta1` FOREIGN KEY (`id_tarjeta`) REFERENCES `tarjeta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Factura_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador de la imagen',
  `ruta` varchar(255) NOT NULL COMMENT 'Ruta en la que se encuentra la Imagen o slogan representativa del producto',
  `es_principal` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Variable que identifica si la imagen del producto es la que más lo identifica',
  `id_producto` int(11) NOT NULL COMMENT 'Producto al que pertenece la imagen',
  PRIMARY KEY (`id`),
  KEY `fk_Imagen_Producto1_idx` (`id_producto`),
  CONSTRAINT `fk_Imagen_Producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador de la marca',
  `nombre` varchar(25) NOT NULL COMMENT 'nombre de la marca que expide una tarjeta',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipio`
--

DROP TABLE IF EXISTS `municipio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipio` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador del municipio',
  `nombre` varchar(40) NOT NULL COMMENT 'El nombre del municipio',
  `id_departamento` int(11) NOT NULL COMMENT 'El departamento en el que se encuentra ubicado el municipio',
  PRIMARY KEY (`id`),
  KEY `fk_Municipio_Departamento1_idx` (`id_departamento`),
  CONSTRAINT `fk_Municipio_Departamento1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipio`
--

LOCK TABLES `municipio` WRITE;
/*!40000 ALTER TABLE `municipio` DISABLE KEYS */;
/*!40000 ALTER TABLE `municipio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opinion`
--

DROP TABLE IF EXISTS `opinion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `opinion` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador de la opinion',
  `fecha` date NOT NULL COMMENT 'La fecha en la que se expresó la opinión',
  `texto` varchar(400) NOT NULL COMMENT 'La opinión que expresa el usuario respecto al producto',
  `puntuacion` int(11) DEFAULT NULL COMMENT 'Este atributo representa que tan útil resulta ser para los usuarios y es medido por votación',
  `id_usuario` int(11) NOT NULL COMMENT 'El Usuario que expresa la opinión',
  `id_producto` int(11) NOT NULL COMMENT 'El producto al que va dirigido la opinión',
  PRIMARY KEY (`id`),
  KEY `fk_Opinion_Usuario1_idx` (`id_usuario`),
  KEY `fk_Opinion_Producto1_idx` (`id_producto`),
  CONSTRAINT `fk_Opinion_Producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Opinion_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opinion`
--

LOCK TABLES `opinion` WRITE;
/*!40000 ALTER TABLE `opinion` DISABLE KEYS */;
/*!40000 ALTER TABLE `opinion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador de la pregunta',
  `texto` varchar(400) NOT NULL COMMENT 'La pregunta que realizó el cliente sobre el producto',
  `fecha` date NOT NULL COMMENT 'La fecha en la que el cliente realizó la pregunta',
  `texto_respuesta` varchar(400) DEFAULT NULL COMMENT 'La respuesta que dio el vendedor ante la pregunta del cliente',
  `fecha_respuesta` date DEFAULT NULL COMMENT 'La fecha en la que respondió el vendedor',
  `id_cliente` int(11) NOT NULL COMMENT 'El Cliente que realizó la pregunta',
  `id_producto` int(11) NOT NULL COMMENT 'El producto al que va dirigido la pregunta',
  PRIMARY KEY (`id`),
  KEY `fk_Pregunta_Usuario1_idx` (`id_cliente`),
  KEY `fk_Pregunta_Producto1_idx` (`id_producto`),
  CONSTRAINT `fk_Pregunta_Producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pregunta_Usuario1` FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Representa el número único identificador del Producto',
  `nombre` varchar(100) NOT NULL COMMENT 'Es el nombre con el que se conoce al producto',
  `precio` int(11) NOT NULL COMMENT 'El valor monetario del producto',
  `descuento` decimal(3,2) NOT NULL COMMENT 'Pequeño porcentaje que se le resta al valor del producto si tiene descuento',
  `costo_envio` int(11) NOT NULL DEFAULT 0 COMMENT 'El valor que costará distribuir el producto',
  `stock` int(11) NOT NULL COMMENT 'Cantidad de unidades disponibles del producto en inventario',
  `marca` varchar(30) NOT NULL COMMENT 'La marca que comercializa el producto',
  `calificacion` decimal(3,2) NOT NULL DEFAULT 0.00 COMMENT 'El promedio de la puntuación que dan los usuarios al producto',
  `descripcion` varchar(150) NOT NULL COMMENT 'Descripción del producto a vender en la que se detallan sus características',
  `id_categoria` int(11) NOT NULL COMMENT 'La categoría a la que pertenece el producto',
  `id_vendedor` int(11) NOT NULL COMMENT 'El vendedor del producto',
  PRIMARY KEY (`id`),
  KEY `fk_Producto_Categoria1_idx` (`id_categoria`),
  KEY `fk_Producto_Usuario1_idx` (`id_vendedor`),
  CONSTRAINT `fk_Producto_Categoria1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Producto_Usuario1` FOREIGN KEY (`id_vendedor`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_etiqueta`
--

DROP TABLE IF EXISTS `producto_etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_etiqueta` (
  `id_producto` int(11) NOT NULL COMMENT 'Representa el número único identificador de un producto',
  `id_etiqueta` int(11) NOT NULL COMMENT 'Representa el número único identificador de una etiqueta',
  PRIMARY KEY (`id_producto`,`id_etiqueta`),
  KEY `fk_Producto_has_Etiqueta_Etiqueta1_idx` (`id_etiqueta`),
  KEY `fk_Producto_has_Etiqueta_Producto1_idx` (`id_producto`),
  CONSTRAINT `fk_Producto_has_Etiqueta_Etiqueta1` FOREIGN KEY (`id_etiqueta`) REFERENCES `etiqueta` (`idEtiqueta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Producto_has_Etiqueta_Producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_etiqueta`
--

LOCK TABLES `producto_etiqueta` WRITE;
/*!40000 ALTER TABLE `producto_etiqueta` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubro`
--

DROP TABLE IF EXISTS `rubro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubro` (
  `id_rubro` int(11) NOT NULL COMMENT 'Representa el número único identificador del rubro',
  `nombre` varchar(50) NOT NULL COMMENT 'Representa el nombre que lleva el rubro o campo al que se dedica la empresa',
  PRIMARY KEY (`id_rubro`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro`
--

LOCK TABLES `rubro` WRITE;
/*!40000 ALTER TABLE `rubro` DISABLE KEYS */;
/*!40000 ALTER TABLE `rubro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjeta`
--

DROP TABLE IF EXISTS `tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjeta` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador de la tarjeta',
  `titular` varchar(60) NOT NULL COMMENT 'El nombre del usuario que es titular de la tarjeta',
  `numero` varchar(20) NOT NULL COMMENT 'El número enmascarado de la tarjeta',
  `vencimiento` date NOT NULL COMMENT 'La fecha de vencimiento de la tarjeta',
  `id_tipo_tarjeta` int(11) NOT NULL COMMENT 'Tipo al que pertenece la tarjeta',
  `id_marca` int(11) NOT NULL COMMENT 'Representa la marca de la tarjeta en cuestión',
  `id_usuario` int(11) NOT NULL COMMENT 'Usuario al que le pertenece la tarjeta',
  PRIMARY KEY (`id`),
  KEY `fk_Tarjeta_TipoTarjeta1_idx` (`id_tipo_tarjeta`),
  KEY `fk_Tarjeta_Marca1_idx` (`id_marca`),
  KEY `fk_Tarjeta_Usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_Tarjeta_Marca1` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tarjeta_TipoTarjeta1` FOREIGN KEY (`id_tipo_tarjeta`) REFERENCES `tipo_tarjeta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tarjeta_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjeta`
--

LOCK TABLES `tarjeta` WRITE;
/*!40000 ALTER TABLE `tarjeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_tarjeta`
--

DROP TABLE IF EXISTS `tipo_tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_tarjeta` (
  `id` int(11) NOT NULL COMMENT 'Representa el número único identificador del tipo de tarjeta',
  `nombre` varchar(10) NOT NULL COMMENT 'nombre del tipo de tarjeta ("CREDITO", "DEBITO", ...)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_tarjeta`
--

LOCK TABLES `tipo_tarjeta` WRITE;
/*!40000 ALTER TABLE `tipo_tarjeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Representa el número único identificador del Usuario',
  `nombre` varchar(30) NOT NULL COMMENT 'Es el nombre de nacimiento del Usuario',
  `apellido` varchar(40) NOT NULL COMMENT 'Es el apellido de nacimiento del usuario',
  `nombre_de_usuario` varchar(20) NOT NULL COMMENT 'Es el nombre por el que el usuario quiere identificarse en la página web',
  `correo` varchar(45) NOT NULL COMMENT 'Es el correo electrónico del usuario',
  `celular` varchar(10) NOT NULL COMMENT 'Representa el número de celular que posee el usuario',
  `contrasena` varchar(255) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'La fecha en la que se registró la cuenta del usuario',
  `verificado` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT ' Indica si el correo electrónico está correctamente asignado a la cuenta',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreDeUsuario_UNIQUE` (`nombre_de_usuario`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  UNIQUE KEY `celular_UNIQUE` (`celular`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'llevedetodo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-09 12:05:50
