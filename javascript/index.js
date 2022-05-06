import {loginActual, actualizaLoginActual, actualizaIdLibroEditar} from './LocalStorage.js';
import {librosEnPosesionDelUsuario, librosSinPosesionDelUsuario, devuelveLibro, eliminaLibro, asignaUsuarioALibro, prestarLibroAUsuario} from '../BackEndSimulation/index.js';
import {esAdministrador, esUsuario} from '../BackEndSimulation/Validaciones.js';
import {GET} from '../BackEndSimulation/Verbos.js';

let user;
if (loginActual()) {
    user = {
        Username: String(loginActual().name),
        Password: String(loginActual().password),
    }
}
const mostrarListaLibrosPosesion = async () => {
    const librosEnPosesion = await librosEnPosesionDelUsuario(user);
    let listaLibrosEnPosesion = document.getElementById('listaLibrosEnPosesion');
    let JSONHTML = "";
    //Solo los administradores pueden editarLibro y eliminarLibro
    if (await esAdministrador(user)) {
        for (let index = 0; index < librosEnPosesion.length; index++) {
            JSONHTML += `
                <div class="libroEnLista">
                    <div class="libroEnListaReturn"><button onclick="reproducirPop();devolverLibro(${librosEnPosesion[index].id})"><img src="./images/devolver.png" alt="return"></button></div>
                    <div class="libroEnListaPrestar"><button onclick="reproducirClick();prestarLibro(${librosEnPosesion[index].id})"><img src="./images/prestar.png" alt="lend"></button></div>
                    <div class="libroEnListaEditar"><button onclick="reproducirClick();editarLibro(${librosEnPosesion[index].id})"><img src="./images/editar.png" alt="edit"></button></div>
                    <div class="libroEnListaEliminar"><button onclick="reproducirPop();eliminarLibro(${librosEnPosesion[index].id})"><img src="./images/eliminar.png" alt="delete"></button></div>
                    <div>Title: ${librosEnPosesion[index].Title}</div>
                    <div>Year: ${librosEnPosesion[index].Year}</div>
                    <div class="libroEnListaCoverImage"><img src="${librosEnPosesion[index].CoverImage}" alt="Book Cover of ${librosEnPosesion[index].Title}"></div>
                    <div>Category: ${librosEnPosesion[index].Category}</div>
                    <div>Author: ${librosEnPosesion[index].Author}</div>
                </div>
            `;
        }
    } else if (await esUsuario(user)) {
        for (let index = 0; index < librosEnPosesion.length; index++) {
            JSONHTML += `
                <div class="libroEnLista">
                    <div class="libroEnListaReturn"><button onclick="reproducirPop();devolverLibro(${librosEnPosesion[index].id})"><img src="./images/devolver.png" alt="return"></button></div>
                    <div class="libroEnListaPrestar"><button onclick="reproducirClick();prestarLibro(${librosEnPosesion[index].id})"><img src="./images/prestar.png" alt="lend"></button></div>
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
const mostrarListaLibrosLibres = async () => {
    let librosLibres = await librosSinPosesionDelUsuario();
    let listaLibrosDisponibles = document.getElementById('listaLibrosDisponibles');
    let JSONHTML = "";
    for (let index = 0; index < librosLibres.length; index++) {
        JSONHTML += `
        <div class="libroEnLista">
            <div class="libroEnListaReturn"><button onclick="reproducirPop();tomarLibro(${librosLibres[index].id})"><img src="./images/devolver.png" alt="take up"></button></div>
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
const mostrarListaLibrosAPI = async () => {
    let libros = await GET('booksJson'); //Todos los libros
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
const prestaLibroAUsuario = async(idLibro) => {
    const nombreUsuario =  prompt("Please enter the user name", "");
    if (nombreUsuario) {
        //Ejecuta y de una vez evalúa si se ejecutó, puedo hacer esto con todos los métodos del servidor (devuelvan true o false)
        if (await prestarLibroAUsuario(idLibro, nombreUsuario)) {
            alert('Thank you');
            mostrarListaLibrosPosesion();
        } else {
            alert('User not found');
        }
    } else {
        alert('Please write a user name');
    }
}

//---------Ejecución
//Ejecuta según la pantalla
if (document.getElementById('index')) { //Limpia el login actual
    actualizaLoginActual(null, null);
}else if (document.getElementById('indexUsuario')) {
    document.getElementById('nombreUsuario').innerHTML = user.Username;
    mostrarListaLibrosPosesion(user);
} else if(document.getElementById('librosDisponibles')){
    document.getElementById('nombreUsuario').innerHTML = user.Username;
    mostrarListaLibrosLibres();
}else if(document.getElementById('indexApi')){
    mostrarListaLibrosAPI();
}
//-------Ejecución (Add event Listener)
//Eventos ocurren en botones del html
document.addEventListener("devolverLibro",async (detail)=> {
    await devuelveLibro(detail.detail);
    mostrarListaLibrosPosesion(user);
})
document.addEventListener("eliminarLibro",async (detail)=> {
    await eliminaLibro(detail.detail, user);
    mostrarListaLibrosPosesion(user);
})
document.addEventListener("tomarLibro",async (detail)=> {
    console.log('Tomar Libro Front');
    await asignaUsuarioALibro(detail.detail, user);
    mostrarListaLibrosLibres();
})
document.addEventListener("prestarLibro",(detail)=> {
    prestaLibroAUsuario(detail.detail);
})
document.addEventListener("editarLibro",async (detail)=> {
    await actualizaIdLibroEditar(detail.detail);
    //Hay una pantalla para eso
    window.location.href = "editarLibro.html";
})