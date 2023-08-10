-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 10-08-2023 a las 00:04:58
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `deliciusrestaurant`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desayuno`
--

DROP TABLE IF EXISTS `desayuno`;
CREATE TABLE IF NOT EXISTS `desayuno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `img_id` varchar(250) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `desayuno`
--

INSERT INTO `desayuno` (`id`, `titulo`, `descripcion`, `img_id`) VALUES
(3, 'Cafe Express0', 'proba nuestro cafe ', 'gt91xcrbrvcvpkggwkei'),
(4, 'Vegan Brekfast', 'proba nuestro sandwich 100% vegano', 'ooayheyldvg3dcc4yjbo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menuprincipal`
--

DROP TABLE IF EXISTS `menuprincipal`;
CREATE TABLE IF NOT EXISTS `menuprincipal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `img_id` varchar(250) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `menuprincipal`
--

INSERT INTO `menuprincipal` (`id`, `titulo`, `descripcion`, `img_id`) VALUES
(39, 'Promocion Miercoles', 'todos los miercoles 15% de descuento ', 'ica8fquc38dfckabnujm'),
(41, 'Promo Finde', '10% de descuento en todas nuestras pizzas', 'izqasx9jq8w8dvijajuo'),
(42, 'Especial del mes', ' Ensalada burrata y procciutto caprese', 'ewd69nfkl6g1ozat1mqm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postres`
--

DROP TABLE IF EXISTS `postres`;
CREATE TABLE IF NOT EXISTS `postres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `img_id` varchar(250) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `postres`
--

INSERT INTO `postres` (`id`, `titulo`, `descripcion`, `img_id`) VALUES
(3, 'Nueva incorporacion', 'RED VELVET', 'lprju9q5vgghqnuixwsu'),
(6, 'Promocion', '10% de descuento en todos nustros muffins', 'ct3ekpx1m6de7h3unhvg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'florencia', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'maria', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
