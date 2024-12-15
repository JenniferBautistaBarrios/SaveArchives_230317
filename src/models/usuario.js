class Usuario {
    constructor(nombre, correo, contrasenia, rol = 'usuario') {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.rol = rol;
        this.archivos = [];
        this.siguiente = null;
    }

    agregarArchivo(archivo) {
        this.archivos.push(archivo);
    }

    obtenerArchivo() {
        return this.archivos;
    }

    esAdministrador() {
        return this.rol === 'admin';
    }


    // Método para eliminar un archivo en la lista de archivos del usuario
    eliminarArchivo(nombre) {
        this.archivos = this.archivos.filter(archivo => archivo.nombre !== nombre);
    }
}

class CrearUsuarios {
    constructor() {
        this.inicio = null;
        this.inicializarUsuarios();
    }

    inicializarUsuarios() {
        const usuariosPorDefecto = [
            { nombre: 'Admin', correo: 'admin@example.com', contrasenia: 'admin123', rol: 'admin' }
        ];
        usuariosPorDefecto.forEach(usuario => {
            this.agregar(usuario.nombre, usuario.correo, usuario.contrasenia, usuario.rol);
        });
    }

    agregar(nombre, correo, contrasenia, rol = 'usuario') {
        const nuevoUsuario = new Usuario(nombre, correo, contrasenia, rol);
        if (this.inicio == null) {
            this.inicio = nuevoUsuario;
        } else {
            let actual = this.inicio;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoUsuario;
        }
    }

    buscar(correo) {
        let actual = this.inicio;
        while (actual !== null) {
            if (actual.correo === correo) {
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    eliminar(correo) {
        if (this.inicio === null) return;

        if (this.inicio.correo === correo) {
            this.inicio = this.inicio.siguiente;
            return;
        }

        let actual = this.inicio;
        while (actual.siguiente !== null && actual.siguiente.correo !== correo) {
            actual = actual.siguiente;
        }

        if (actual.siguiente !== null) {
            actual.siguiente = actual.siguiente.siguiente;
        }
    }
}

export { CrearUsuarios };
