import express from 'express'

import { paginaRegistro, registrarUsuario, listaUsuarios, eliminarUsuario, iniciarSesion, paginaInicioSesion } from '../controllers/userController.js'

const router = express.Router();

// Ruta para mostrar la página de registro
router.get('/registro', paginaRegistro);

// Ruta para registrar un nuevo usuario
router.post('/registro', registrarUsuario);

// Ruta para mostrar los usuarios en una lista (solo accesible por administradores)
router.get('/lista', listaUsuarios);

// Ruta para eliminar un usuario (solo accesible por administradores)
router.post('/eliminar', eliminarUsuario);

// Ruta para mostrar la página de inicio de sesión
router.get('/inicioSesion', paginaInicioSesion); 

// Ruta para iniciar sesión
router.post('/inicioSesion', iniciarSesion);

export default router;
