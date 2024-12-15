class Archivo {
    constructor(nombre, tipo, tamanio, descripcion = '') {
        this.nombre = nombre;
        this.tipo = tipo;
        this.tamanio = tamanio;
        this.descripcion = descripcion; 
        this.siguiente = null; 
    }
}

export { Archivo };