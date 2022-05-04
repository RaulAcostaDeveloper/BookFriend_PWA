import {loginActual} from './LocalStorage.js';
import {librosEnPosesionDelUsuario, librosSinPosesionDelUsuario} from '../BackEndSimulation/index.js';
import {GET} from '../BackEndSimulation/Verbos.js';

const userName = String(loginActual().name);
const password= String(loginActual().password);

const mostrarListaLibrosPosesion = () => {
    let user = {
        Username: userName,
        Password: password,
    }
    const librosEnPosesion = librosEnPosesionDelUsuario(user);
    //aqui
    console.log(librosEnPosesion);
    let listaLibrosEnPosesion = document.getElementById('listaLibrosEnPosesion');

    let JSONHTML = "";
    for (let index = 0; index < librosEnPosesion.length; index++) {
        JSONHTML += `
        <div class="libroEnLista">
            <div class="libroEnListaDevolver"></div>
            <div class="libroEnListaEliminar"></div>
            <div class="libroEnListaPrestar"></div>
            <div class="libroEnListaEditar"></div>
            <div class="libroEnListaTitle">Title: ${librosEnPosesion[index].Title}</div>
            <div class="libroEnListaYear">Year: ${librosEnPosesion[index].Year}</div>
            <div class="libroEnListaCoverImage">CoverImage: ${librosEnPosesion[index].CoverImage}</div>
            <div class="libroEnListaCategory">Category: ${librosEnPosesion[index].Category}</div>
            <div class="libroEnListaAuthor">Author: ${librosEnPosesion[index].Author}</div>
        </div>
        `;
        
    }
    listaLibrosEnPosesion.innerHTML = JSONHTML;
}
const mostrarListaLibrosLibres = () => {
    console.log('mostrarListaLibrosLibres');
    let librosLibres = librosSinPosesionDelUsuario();
    let listaLibrosDisponibles = document.getElementById('listaLibrosDisponibles');
    let JSONHTML = "";
    for (let index = 0; index < librosLibres.length; index++) {
        JSONHTML += `
        <div class="libroEnLista">
            <div class="libroEnListaTomar"></div>
            <div class="libroEnListaTitle">Title: ${librosLibres[index].Title}</div>
            <div class="libroEnListaYear">Year: ${librosLibres[index].Year}</div>
            <div class="libroEnListaCoverImage"><img src="${librosLibres[index].CoverImage}" alt="Book Cover of ${librosLibres[index].Title}"></div>
            <div class="libroEnListaCategory">Category: ${librosLibres[index].Category}</div>
            <div class="libroEnListaAuthor">Author: ${librosLibres[index].Author}</div>
        </div>
        `;
        
    }
    listaLibrosDisponibles.innerHTML = JSONHTML;

}
const mostrarListaLibrosAPI = () => {
    console.log('mostrarListaLibrosAPI');
    let libros = GET('booksJson');
    let listaLibrosAPI = document.getElementById('listaLibrosAPI');
    let JSONHTML = "";
    for (let index = 0; index < libros.length; index++) {
        JSONHTML += `
        <div class="libroEnLista">
            <div></div>
            <div>Title: ${libros[index].Title}</div>
            <div>Year: ${libros[index].Year}</div>
            <div class="libroEnListaCoverImage"><img src="${libros[index].CoverImage}" alt="Book Cover of ${libros[index].Title}"></div>
            <div>Category: ${libros[index].Category}</div>
            <div>Author: ${libros[index].Author}</div>
            <div>Id: ${libros[index].id}</div>
            <div>UserAsignedID: ${libros[index].UserAsignedID}</div>
            <div>AdminAsignedID: ${libros[index].AdminAsignedID}</div>
        </div>
        `;
        
    }
    listaLibrosAPI.innerHTML = JSONHTML;

}
//---------Ejecución
if (document.getElementById('indexUsuario')) {
    document.getElementById('nombreUsuario').innerHTML = userName;
    mostrarListaLibrosPosesion();
} else if(document.getElementById('librosDisponibles')){
    document.getElementById('nombreUsuario').innerHTML = userName;
    mostrarListaLibrosLibres();
}else if(document.getElementById('indexApi')){
    mostrarListaLibrosAPI();
}
