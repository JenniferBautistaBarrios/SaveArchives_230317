import express from 'express';
import { obtenerMisArchivos, guardarArchivo, eliminarArchivo } from '../controllers/archivesController.js';

const router = express.Router();

// Ruta para obtener los archivos del usuario
router.get('/misArchivos', obtenerMisArchivos);

// Ruta para guardar un archivo subido por el usuario
router.post('/guardarArchivo', guardarArchivo);

// Ruta para eliminar un archivo
router.post('/eliminarArchivo', eliminarArchivo);

export default router;
