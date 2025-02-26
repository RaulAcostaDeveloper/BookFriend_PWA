import {GET, GETONE, POST, PATCH, DELETE, booksCount, adminsCount, usersCount} from './Verbos.js';
import {esAdministrador, esUsuario,esUsuarioValido, esLibroValido} from './Validaciones.js';
export const librosEnPosesionDelUsuario = (usuario) => {
    const libros = GET('booksJson');
    let librosAsociados = [];

    if (esAdministrador(usuario)) {
        let idUsuario = obtenIdAdmin(usuario);
        for (let index = 0; index < libros.length; index++) {
            if (idUsuario == libros[index].AdminAsignedID) {
                librosAsociados.push(libros[index]);
            }
        }
        return librosAsociados;

    } else if(esUsuario(usuario)){
        let idUsuario = obtenIdUsuario(usuario.Username);
        for (let index = 0; index < libros.length; index++) {
            if (idUsuario == libros[index].UserAsignedID) {
                librosAsociados.push(libros[index]);
            }
        }
        return librosAsociados;

    } else{
        return false;
    }
}
export const librosSinPosesionDelUsuario = () => {
    const libros = GET('booksJson');
    let librosSinAsociados = [];
    for (let index = 0; index < libros.length; index++) {
        if (libros[index].UserAsignedID == null && libros[index].AdminAsignedID == null) {
            librosSinAsociados.push(libros[index]);
        }
    }
    return librosSinAsociados;
    
}
export const aniadirLibroNuevo = (data, usuario) => {
    //Cover Image por ahora es lo mismo por que no hay donde guardar imagenes
    const nuevoLibro = {
            id:booksCount,
            CoverImage: "./BackEndSimulation/Database/CoverImages/portadaLibro.png",
            Title: data.Title,
            Year:data.Year,
            Author: data.Author,
            Category: data.Category,
            UserAsignedID:null,
            AdminAsignedID:null,
    }
    if (esAdministrador(usuario)) {        
        if (esLibroValido(nuevoLibro)) {
            POST('booksJson', nuevoLibro);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
export const aniadirUsuarioNuevo = (data) => {
    const nuevoUsuario = {
        Username: data.Username,
        Password: data.Password,
        Number: data.Number,
        id: usersCount
    }
    if (esUsuarioValido(nuevoUsuario)) {
        POST('usersJson', nuevoUsuario);
        return true;
    } else {
        return false;
    }
}
export const editarLibro = (idLibro, data, usuario) => {
    //Validaciones deberían ser aquí en lugar de en el front
    //Cover Image por ahora es lo mismo por que no hay donde guardar imagenes
    const nuevoLibro = {
            id:data.id,
            CoverImage: "./BackEndSimulation/Database/CoverImages/portadaLibro.png",
            Title: data.Title,
            Year:data.Year,
            Author: data.Author,
            Category: data.Category,
            UserAsignedID:data.UserAsignedID,
            AdminAsignedID:data.AdminAsignedID,
    }
    if (esAdministrador(usuario)) {
        if (esLibroValido(nuevoLibro)) {
            PATCH('booksJson', idLibro, nuevoLibro);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
const obtenIdAdmin = (admin) =>{
    const admins = GET('adminsJson',{
        Username: 'Admin1',
        Password: '1Admin',
    });
    for (let index = 0; index < admins.length; index++) {
        if (admin.Username == admins[index].Username) {
            return admins[index].id;
        }
    }
}
const obtenIdUsuario = (username) =>{
    const usuarios = GET('usersJson',{
        Username: 'Admin1',
        Password: '1Admin',
    });
    for (let index = 0; index < usuarios.length; index++) {
        if (username == usuarios[index].Username) {
            return usuarios[index].id;
        }
    }
}
export const devuelveLibro = (idLibro) => {
    let libroLimpio = GETONE('booksJson', idLibro);
    libroLimpio.UserAsignedID = null;
    libroLimpio.AdminAsignedID = null;
    PATCH('booksJson', idLibro, libroLimpio);
    return true;
}
export const eliminaLibro = (idLibro, admin) => {
    if (esAdministrador(admin)) {//Así deben ir las validaciones
        DELETE('booksJson', idLibro);
        return true;
    } else {
        return false;
    }
}
export const asignaUsuarioALibro = (idLibro, Usuario) => {
    const libro = GETONE('booksJson', idLibro);
    if (esAdministrador(Usuario)) {
        libro.AdminAsignedID = obtenIdAdmin(Usuario);
    } else if (esUsuario(Usuario)) {
        libro.UserAsignedID = obtenIdUsuario(Usuario.Username);
    } else {
        libro.UserAsignedID = null;
    }
    PATCH('booksJson', idLibro, libro);
    return true;
}
export const prestarLibroAUsuario = (idLibro, UserName) => {
    const libro = GETONE('booksJson', idLibro);
    //Pregunta si existe || 0 es false... si el usuario es 0 entonces daría false...
    if (obtenIdUsuario(UserName) || obtenIdUsuario(UserName) == 0) { 
        //Primero lo limpia
        devuelveLibro(idLibro)
        libro.UserAsignedID = obtenIdUsuario(UserName);
        PATCH('booksJson', idLibro, libro);
        return true;
    } else {
        return false;//Comprueba si existe
    }
}