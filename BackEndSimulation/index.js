import {GET, POST, PATCH, booksCount, adminsCount, usersCount} from './Verbos.js';
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