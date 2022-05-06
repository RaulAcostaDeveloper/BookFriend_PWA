import {editarLibro} from '../BackEndSimulation/index.js';
import {GET, GETONE} from '../BackEndSimulation/Verbos.js';
import {loginActual, idLibroEditar} from './LocalStorage.js';
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
        Titulo: document.getElementById('editBookTitle').value ,
        Anio: document.getElementById('editBookYear').value,
        Autor: document.getElementById('editBookAuthor').value,
        Categoria: document.getElementById('editBookCategory').value,
        UserAsignedID:libroActual.UserAsignedID,//Mantienen el mismo
        AdminAsignedID:libroActual.AdminAsignedID,
        Imagen: "",
    }

    //Así debe ser cuando es backend
    await editarLibro(idLibroEditar(), dataNewLibro, user);
    window.history.back();
}
let botonEditBook = document.getElementById('botonEditBook');
botonEditBook.addEventListener("click", tryEditBook, false);