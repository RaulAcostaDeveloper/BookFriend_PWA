import {esAdministrador, esLibroValido} from '../BackEndSimulation/Validaciones.js';
import {aniadirLibroNuevo} from '../BackEndSimulation/index.js';
import {GET} from '../BackEndSimulation/Verbos.js'
import {loginActual} from './LocalStorage.js';
const tryAddBook = () => {
    const dataNewLibro = {
        Titulo: document.getElementById('addBookTitle').value,
        Anio:document.getElementById('addBookYear').value,
        Autor: document.getElementById('addBookAuthor').value,
        Categoria: document.getElementById('addBookCategory').value,
        Imagen: "",
    }
    const user = {
        Username: String(loginActual().name),
        Password: String(loginActual().password)
    }
    if (esAdministrador(user)) {
        if (esLibroValido(dataNewLibro)) {
            console.log('Nuevo Libro');
            //NO HACER POST DIRECTAMENTE, DEBE PASAR POR VALIDACIONES
            aniadirLibroNuevo(dataNewLibro, user);
            console.log(GET('booksJson'));
            alert('Successful Registration')
            window.history.back();
        }
    } else{
        console.log('No es Administrador');
        alert('Not Admin Found')
    }
}
let botonAddBook = document.getElementById('botonAddBook');
botonAddBook.addEventListener("click", tryAddBook, false);