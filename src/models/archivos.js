import { Archivo } from "./archivo.js";

class CrearArchivos {
    constructor() {
        this.inicio = null;
    }

    agregar(nombre, tipo, tamanio, descripcion = '') {
        const nuevoArchivo = new Archivo(nombre, tipo, tamanio, descripcion);
        if (this.inicio === null) {
            this.inicio = nuevoArchivo;
        } else {
            let actual = this.inicio;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoArchivo;
        }
    }


    buscar(nombre) {
        let actual = this.inicio;
        while (actual !== null) {
            console.log(`Comparando ${nombre} con ${actual.nombre}`);
            if (actual.nombre === nombre) {
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    }    

    borrar(nombre) {
        if (this.inicio == null) return null; // Lista vacía

        // Si el archivo a eliminar está al principio
        if (this.inicio.nombre === nombre) {
            const archivoEliminado = this.inicio;
            this.inicio = this.inicio.siguiente;
            return archivoEliminado; // Retorna el archivo eliminado
        }

        let actual = this.inicio;
        while (actual.siguiente !== null && actual.siguiente.nombre !== nombre) {
            actual = actual.siguiente;
        }

        if (actual.siguiente !== null) {
            const archivoEliminado = actual.siguiente;
            actual.siguiente = actual.siguiente.siguiente; // Salta el archivo a eliminar
            return archivoEliminado; // Retorna el archivo eliminado
        }

        return null; // Archivo no encontrado
    }

}

export { CrearArchivos }
