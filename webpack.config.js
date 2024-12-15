import path from 'path'

export default {
    mode: 'development',
    entry: {
        eliminarArchivo: './src/js/eliminarArchivo.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}