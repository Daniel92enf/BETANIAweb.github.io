const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.js');
const {validateLogin,validateRegister} = require('../validators')
//Rutas
router.get("/", loginController.loggedIn)
router.get("/Registro_usuario", loginController.Pagina_Registro_usuario)
router.get("/inicar_sesion", loginController.Pagina_iniciar_sesion)
router.get("/Chat_Linea", loginController.Pagina_chat_linea)
router.get("/Registro_trabajador", loginController.Pagina_Registro_trabajador)
router.get("/Stock", loginController.Pagina_stock)
router.get("/venta_cobro", loginController.Pagina_venta_cobro)
router.get("/Consultar_productos", loginController.Pagina_Consultar_producto)
router.get("/carrito_compras", loginController.Pagina_carrito_compras)
router.get("/PQRS", loginController.Pagina_PQRS)
router.get("/Cambio_contrasena", loginController.Pagina_Cambio_contrasena)
router.post("/Cambio_contrasena", loginController.Cambio_contrasena)
router.post("/Registro_usuario",validateRegister, loginController.Registro_usuario)
router.post("/inicar_sesion",validateLogin, loginController.login)
router.post("/Chat_Linea",validateLogin, loginController.login)
router.post("/Registro_trabajador",validateRegister, loginController.Pagina_Registro_trabajador)
router.post("/Chat_Linea",validateLogin, loginController.login)

router.get("/PQRS", loginController.logout)

module.exports = router;