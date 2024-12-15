import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import session from 'express-session';
import userRoutes from './src/routes/userRoutes.js';
import archivesRoutes from './src/routes/archivesRoutes.js';

const app = express();
const port = 3004;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de EJS como el motor de vistas
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src', 'views'));

// Configuración de archivos estáticos en el servidor local
app.use(express.static('public'));

// Configuración del Body Parser para manejar formularios 
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

// Rutas para la autenticación de usuarios
app.use('/auth', userRoutes);

// Rutas para el manejo de archivos
app.use('/archivos', archivesRoutes);

// Ruta para la página principal
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});