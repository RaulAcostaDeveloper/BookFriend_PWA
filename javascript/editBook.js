import {editarLibro} from '../BackEndSimulation/index.js';
import {GETONE} from '../BackEndSimulation/Verbos.js';
import {esAdministrador, esLibroValido} from '../BackEndSimulation/Validaciones.js';
import {loginActual, idLibroEditar} from './LocalStorage.js';

const user = {
    Username: String(loginActual().name),
    Password: String(loginActual().password)
}

//Pone en los input la data del libro para facilitar la edición
let libroActual; //Pudiera ser un const, pero el await no lo permite
const colocarData = async () => {
    libroActual = await GETONE('booksJson', Number(idLibroEditar()));
    document.getElementById('editBookTitle').value = libroActual.Title;
    document.getElementById('editBookYear').value = libroActual.Year;
    document.getElementById('editBookAuthor').value = libroActual.Author;
    document.getElementById('editBookCategory').value = libroActual.Category;
}

const tryEditBook = async() => {
    const dataNewLibro = {
        id: libroActual.id,
        Title: document.getElementById('editBookTitle').value ,
        Year: document.getElementById('editBookYear').value,
        Author: document.getElementById('editBookAuthor').value,
        Category: document.getElementById('editBookCategory').value,
        UserAsignedID:libroActual.UserAsignedID,//Mantienen el mismo
        AdminAsignedID:libroActual.AdminAsignedID,//Es mejor añadirlo en backend
        CoverImage: "",//En backend se corrige
    }

    if (await esAdministrador(user)) {//Doble validación
        if (await esLibroValido(dataNewLibro)) {
            if (await editarLibro(idLibroEditar(), dataNewLibro, user)) {
                alert('Edited')
                window.history.back();   
            } else {
                alert ('Cant add a book');
            }
        } else {
            alert ('Not a valid book')
        }
    } else {
        alert('Not an administrator')
    }
}
//-----------Ejecución
colocarData();
let botonEditBook = document.getElementById('botonEditBook');
botonEditBook.addEventListener("click", tryEditBook, false);