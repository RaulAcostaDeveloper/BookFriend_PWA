import {esAdministrador, esLibroValido} from '../BackEndSimulation/Validaciones.js';
import {aniadirLibroNuevo} from '../BackEndSimulation/index.js';
import {loginActual} from './LocalStorage.js';

const user = {
    Username: String(loginActual().name),
    Password: String(loginActual().password)
}

const tryAddBook = async () => {
    const dataNewLibro = {
        Title: document.getElementById('addBookTitle').value,
        Year:document.getElementById('addBookYear').value,
        Author: document.getElementById('addBookAuthor').value,
        Category: document.getElementById('addBookCategory').value,
        CoverImage: "",
    }
    if (await esAdministrador(user)) {//Doble validación
        if (await esLibroValido(dataNewLibro)){
            if (await aniadirLibroNuevo(dataNewLibro, user)) {                
                alert('Successful Registration')
                window.history.back();
            } else {
                alert('Cant Add Book');
            }
        } else {
            alert('Not Valid Book');
        }
    } else{
        alert('Not Admin Found')
    }
}
let botonAddBook = document.getElementById('botonAddBook');
botonAddBook.addEventListener("click", tryAddBook, false);