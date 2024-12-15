import { CrearUsuarios } from '../models/usuario.js';

// Instancia de la clase para manejar usuarios
export const usuariosManager = new CrearUsuarios();

// Función para renderizar la página de registro
export const paginaRegistro = (req, res) => {
    res.render('register');
}

// Función para renderizar la página de inicio de sesión
export const paginaInicioSesion = (req, res) => {
    res.render('login');
}

// Función para registrar un nuevo usuario
export const registrarUsuario = (req, res) => {
    const { nombre, correo, contrasenia } = req.body;

    // Verificar si el correo ya existe
    const usuarioExistente = usuariosManager.buscar(correo);
    if (usuarioExistente) {
        return res.status(400).send('El correo ya está registrado');
    }

    // Si el correo no existe, agregar el nuevo usuario
    usuariosManager.agregar(nombre, correo, contrasenia);
    res.redirect('/auth/inicioSesion'); // Redirigir a la página de inicio o donde desees
}

// Función para iniciar sesión
export const iniciarSesion = (req, res) => {
    const { correo, contrasenia } = req.body;
    const usuario = usuariosManager.buscar(correo);
    
    if (usuario && usuario.contrasenia === contrasenia) {
        req.session.usuario = usuario;
        if (usuario.rol === 'admin') {
            return res.redirect('/auth/lista');
        } else {
            return res.redirect('/archivos/misArchivos');
        }
    } else {
        return res.status(401).send('Correo o contraseña incorrectos');
    }
}

// Función para eliminar un usuario
export const eliminarUsuario = (req, res) => {
    const { correo } = req.body;
    const usuario = req.session.usuario;

    if (!usuario || usuario.rol !== 'admin') {
        return res.status(403).send('No tienes permisos para eliminar usuarios');
    }

    if (!correo) {
        return res.status(400).send('Correo no proporcionado');
    }

    usuariosManager.eliminar(correo);
    res.redirect('/auth/lista');
};

// Obtener la lista de usuarios (solo admin puede acceder)
export const listaUsuarios = (req, res) => {
    const usuario = req.session.usuario;
    if (!usuario || usuario.rol !== 'admin') {
        return res.status(403).send('No tienes permisos para acceder a esta página');
    }

    const usuariosConArchivos = [];  // Lista de usuarios con sus archivos
    let actual = usuariosManager.inicio;
    let archivosTotales = [];  // Aquí almacenamos todos los archivos para la vista

    while (actual != null) {
        const archivos = actual.obtenerArchivo();  // Obtener los archivos del usuario actual
        const estadisticas = {
            totalArchivos: archivos.length,
            imagenes: archivos.filter(archivo => archivo.tipo === 'imagen').length,
            documentos: archivos.filter(archivo => archivo.tipo === 'documento').length,
            carpetasComprimidas: archivos.filter(archivo => archivo.tipo === 'carpeta_comprimida').length
        };

        // Agregar usuario con sus archivos a la lista
        usuariosConArchivos.push({
            nombre: actual.nombre,
            correo: actual.correo,
            rol: actual.rol, // Asegúrate de pasar el rol
            estadisticas,
            archivos  // Archivos asociados al usuario
        });

        // Almacenar los archivos totales
        archivosTotales = [...archivosTotales, ...archivos];

        actual = actual.siguiente;
    }

    // Ahora pasamos tanto los usuarios como sus archivos a la vista, incluyendo el usuario administrador
    res.render('admin', {
        usuarios: usuariosConArchivos,  // Lista de usuarios con archivos
        usuario: usuario,  // El usuario administrador actual
        archivos: archivosTotales  // Archivos de todos los usuarios
    });
};
