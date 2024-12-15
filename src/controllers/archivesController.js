import { CrearArchivos } from '../models/archivos.js';
import { usuariosManager } from './userController.js';

const listaArchivos = new CrearArchivos();  // Instancia global de los archivos

// authMiddleware.js (puede estar en la carpeta de middlewares o utils)
export const verificarAutenticacion = (req, res, next) => {
    if (req.session && req.session.usuario) {
        return next();  // Si el usuario está autenticado, continúa con la siguiente función
    }
    res.redirect('/');  // Si no está autenticado, redirige a la página de login
};


// Función para obtener los archivos del usuario
export const obtenerMisArchivos = [verificarAutenticacion, (req, res) => {
    const usuario = req.session.usuario; // Usuario autenticado
    if (!usuario) {
        console.error('Sesión no contiene información del usuario.');
        return res.status(401).send('Usuario no autenticado.');
    }

    console.log(usuario.correo);
    // Buscar el usuario en la lista de usuarios
    const usuarioExistente = usuariosManager.buscar(usuario.correo);
    
    if (!usuarioExistente) {
        console.error('Usuario no encontrado en la lista.');
        return res.status(404).send('Usuario no encontrado.');
    }
    
    // Obtener la lista de archivos asociados al usuario
    const archivosUsuario = usuarioExistente.obtenerArchivo();

    // Renderizar la vista de archivos del usuario
    res.render('archivos', { 
        archivos: archivosUsuario,
        usuario: usuarioExistente // Envía la información del usuario a la vista
    });
}];

export const guardarArchivo = [verificarAutenticacion, (req, res) => {
    const usuario = req.session.usuario;
    const { filename: nombre, filetype: tipo, descripcion } = req.body;
    const tamanio = Math.floor(Math.random() * 10000);

    listaArchivos.agregar(nombre, tipo, tamanio, descripcion);

    const archivo = { nombre, tipo, tamanio, descripcion };
    const usuarioExistente = usuariosManager.buscar(usuario.correo);

    if (usuarioExistente) {
        usuarioExistente.agregarArchivo(archivo);
        req.session.usuario = usuarioExistente;
    }

    // Verificamos el rol del usuario y redirigimos a la página correspondiente
    if (usuarioExistente.rol === 'admin') {
        return res.redirect('/auth/lista');  // Redirigir a la página de administrador
    } else {
        return res.redirect('/archivos/misArchivos');  // Redirigir a la página de usuario
    }
}];


export const eliminarArchivo = [verificarAutenticacion, (req, res) => {
    const { nombre } = req.body;

    const archivoEliminado = listaArchivos.borrar(nombre);

    if (!archivoEliminado) {
        return res.status(404).json({ exito: false, mensaje: 'Archivo no encontrado.' });
    }

    const usuario = req.session.usuario;
    const usuarioExistente = usuariosManager.buscar(usuario.correo);

    if (usuarioExistente) {
        usuarioExistente.eliminarArchivo(nombre);
        req.session.usuario = usuarioExistente;
    }

    // Verificamos el rol del usuario y redirigimos a la página correspondiente
    if (usuarioExistente.rol === 'admin') {
        return res.redirect('/auth/lista');  // Redirigir a la página de administrador
    } else {
        return res.redirect('/archivos/misArchivos');  // Redirigir a la página de usuario
    }
}];
