import {editarLibro} from '../BackEndSimulation/index.js';
import {GET, GETONE} from '../BackEndSimulation/Verbos.js';
import {loginActual, idLibroEditar} from './LocalStorage.js';
import {esAdministrador, esLibroValido} from '../BackEndSimulation/Validaciones.js';

const user = {
    Username: String(loginActual().name),
    Password: String(loginActual().password)
}
console.log(Number(idLibroEditar()));
const libroActual = GETONE('booksJson', Number(idLibroEditar()));
document.getElementById('editBookTitle').value = libroActual.Title;
document.getElementById('editBookYear').value = libroActual.Year;
document.getElementById('editBookAuthor').value = libroActual.Author;
document.getElementById('editBookCategory').value = libroActual.Category;

const tryEditBook = async() => {
    const dataNewLibro = {
        id: libroActual.id,
        Title: document.getElementById('editBookTitle').value ,
        Year: document.getElementById('editBookYear').value,
        Author: document.getElementById('editBookAuthor').value,
        Category: document.getElementById('editBookCategory').value,
        UserAsignedID:libroActual.UserAsignedID,//Mantienen el mismo
        AdminAsignedID:libroActual.AdminAsignedID,//Se debe mejor añadir en backend
        CoverImage: "",
    }

    //Así debe ser cuando es backend
    if (esLibroValido(dataNewLibro)) {
        await editarLibro(idLibroEditar(), dataNewLibro, user);
        alert('Edited')
        window.history.back();
    }
}
let botonEditBook = document.getElementById('botonEditBook');
botonEditBook.addEventListener("click", tryEditBook, false);