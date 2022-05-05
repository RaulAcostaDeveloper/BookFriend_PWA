import {loginActual, actualizaIdLibroEditar} from './LocalStorage.js';
import {librosEnPosesionDelUsuario, librosSinPosesionDelUsuario, devuelveLibro, eliminaLibro} from '../BackEndSimulation/index.js';
import {esAdministrador, esUsuario} from '../BackEndSimulation/Validaciones.js';
import {GET} from '../BackEndSimulation/Verbos.js';

const userName = String(loginActual().name);
const password= String(loginActual().password);

let user = {
    Username: userName,
    Password: password,
}
const mostrarListaLibrosPosesion = () => {
    const librosEnPosesion = librosEnPosesionDelUsuario(user);
    let listaLibrosEnPosesion = document.getElementById('listaLibrosEnPosesion');
    let JSONHTML = "";
    if (esAdministrador(user)) {
        for (let index = 0; index < librosEnPosesion.length; index++) {
            JSONHTML += `
                <div class="libroEnLista">
                    <div class="libroEnListaReturn"><button onclick="devolverLibro(${librosEnPosesion[index].id})"><img src="./images/devolver.png" alt="return"></button></div>
                    <div class="libroEnListaPrestar"><button><img src="./images/prestar.png" alt="lend"></button></div>
                    <div class="libroEnListaEditar"><button onclick="editarLibro(${librosEnPosesion[index].id})"><img src="./images/editar.png" alt="edit"></button></div>
                    <div class="libroEnListaEliminar"><button onclick="eliminarLibro(${librosEnPosesion[index].id})"><img src="./images/eliminar.png" alt="delete"></button></div>
                    <div>Title: ${librosEnPosesion[index].Title}</div>
                    <div>Year: ${librosEnPosesion[index].Year}</div>
                    <div class="libroEnListaCoverImage"><img src="${librosEnPosesion[index].CoverImage}" alt="Book Cover of ${librosEnPosesion[index].Title}"></div>
                    <div>Category: ${librosEnPosesion[index].Category}</div>
                    <div>Author: ${librosEnPosesion[index].Author}</div>
                </div>
            `;
        }
    } else if (esUsuario(user)) {
        for (let index = 0; index < librosEnPosesion.length; index++) {
            JSONHTML += `
                <div class="libroEnLista">
                    <div class="libroEnListaReturn"><button onclick="devolverLibro(${librosEnPosesion[index].id})"><img src="./images/devolver.png" alt="return"></button></div>
                    <div class="libroEnListaPrestar"><button><img src="./images/prestar.png" alt="lend"></button></div>
                    <div>Title: ${librosEnPosesion[index].Title}</div>
                    <div>Year: ${librosEnPosesion[index].Year}</div>
                    <div class="libroEnListaCoverImage"><img src="${librosEnPosesion[index].CoverImage}" alt="Book Cover of ${librosEnPosesion[index].Title}"></div>
                    <div>Category: ${librosEnPosesion[index].Category}</div>
                    <div>Author: ${librosEnPosesion[index].Author}</div>
                </div>
            `;
        }
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
            <div class="libroEnListaReturn"><button><img src="./images/devolver.png" alt="take up"></button></div>
            <div>Title: ${librosLibres[index].Title}</div>
            <div>Year: ${librosLibres[index].Year}</div>
            <div class="libroEnListaCoverImage"><img src="${librosLibres[index].CoverImage}" alt="Book Cover of ${librosLibres[index].Title}"></div>
            <div>Category: ${librosLibres[index].Category}</div>
            <div>Author: ${librosLibres[index].Author}</div>
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
//-------Ejecución (Add event Listener)
document.addEventListener("devolverLibro",async (detail)=> {
    await devuelveLibro(detail.detail);
    mostrarListaLibrosPosesion();
})
document.addEventListener("editarLibro",async (detail)=> {
    await actualizaIdLibroEditar(detail.detail);
    window.location.href = "editarLibro.html";
})
document.addEventListener("eliminarLibro",async (detail)=> {
    await eliminaLibro(detail.detail, user);
    mostrarListaLibrosPosesion();
})