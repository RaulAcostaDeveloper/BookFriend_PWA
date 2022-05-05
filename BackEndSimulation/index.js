import {GET, GETONE, POST, PATCH, DELETE, booksCount, adminsCount, usersCount} from './Verbos.js';
import {esAdministrador, esUsuario} from './Validaciones.js';
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
        //Aqui
        return librosAsociados;

    } else if(esUsuario(usuario)){
        let idUsuario = obtenIdUsuario(usuario);
        for (let index = 0; index < libros.length; index++) {
            if (idUsuario == libros[index].UserAsignedID) {
                librosAsociados.push(libros[index]);
            }
        }
        return librosAsociados;

    } else{
        return {};
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
    //Validaciones deberían ser aquí en lugar de en el front
    //Cover Image por ahora es lo mismo por que no hay donde guardar imagenes
    const nuevoLibro = {
            id:booksCount,
            CoverImage: "./BackEndSimulation/Database/CoverImages/portadaLibro.png",
            Title: data.Titulo,
            Year:data.Anio,
            Author: data.Autor,
            Category: data.Categoria,
            UserAsignedID:null,
            AdminAsignedID:null,
    }
    POST('booksJson', nuevoLibro, usuario);
}
export const editarLibro = (idLibro, data, usuario) => {
    //Validaciones deberían ser aquí en lugar de en el front
    //Cover Image por ahora es lo mismo por que no hay donde guardar imagenes
    const nuevoLibro = {
            id:data.id,
            CoverImage: "./BackEndSimulation/Database/CoverImages/portadaLibro.png",
            Title: data.Titulo,
            Year:data.Anio,
            Author: data.Autor,
            Category: data.Categoria,
            UserAsignedID:data.UserAsignedID,
            AdminAsignedID:data.AdminAsignedID,
    }
    if (esAdministrador(usuario)) {
        PATCH('booksJson', idLibro, nuevoLibro);
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
const obtenIdUsuario = (usuario) =>{
    const usuarios = GET('usersJson',{
        Username: 'Admin1',
        Password: '1Admin',
    });
    for (let index = 0; index < usuarios.length; index++) {
        if (usuario.Username == usuarios[index].Username) {
            return usuarios[index].id;
        }
    }
}
export const devuelveLibro = (idLibro) => {
    let libroLimpio = GETONE('booksJson', idLibro);
    libroLimpio.UserAsignedID = null;
    libroLimpio.AdminAsignedID = null;
    PATCH('booksJson', idLibro, libroLimpio);
}
export const eliminaLibro = (idLibro, admin) => {
    if (esAdministrador(admin)) {//Así deben ir las validaciones
        DELETE('booksJson', idLibro);
    }
}
const asignaUsuarioALibro = (idLibro, Usuario) => {

}