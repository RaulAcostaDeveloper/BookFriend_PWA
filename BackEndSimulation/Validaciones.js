import {adminsJson, usersJson} from  './Verbos.js';
//------Validación para usuarios y administradores
export const esAdministrador = (data)=> {
    for (let index = 0; index < adminsJson.length; index++) {        
        if (data.Username == adminsJson[index].Username && data.Password == adminsJson[index].Password) {//
            return true;
        }
    }
    return false;
}
export const esUsuario = (data)=> {
    for (let index = 0; index < usersJson.length; index++) {        
        if (data.Username == usersJson[index].Username && data.Password == usersJson[index].Password) {//
            return true;
        }
    }
    return false;
}
//------Validación para registros y editar
export const esUsuarioValido = (data) => {
    if (!existeUsuario(data.Username) && userNameValido(data.Username) && passwordValido(data.Password) && numeroValido(data.Number)) {
        return true;
    } else {
        return false;
    }
}
export const esLibroValido = (data) => {
    if (categoriaValida(data.Categoria) && tipoArchivoImagenValido(data.Imagen) && tituloValido(data.Titulo) && anioValido(data.Anio) && autorValido(data.Autor)) {
        console.log('Es libro valido');
        return true;
    } else {
        console.log('Es libro invalido');
        return false;
    }
}

//----Validaciones para Usuario
const existeUsuario = (Username) => {
    let usuarios = usersJson;
    for (let index = 0; index < usuarios.length; index++) {
        if (Username == usuarios[index].Username) {
            console.log('Ya Existe el Usuario');//Se debería poder mandar por lo menos esta validación
            return true;
        }
    }
    return false;

}
const userNameValido = (Username) => {
    //Falta ver que no esté ya el nombre de usuario registrado
    if( Username == null || Username.length < 5 || Username.length > 10 || /\s/.test(Username) || !(/\w+([-+.']\w+)*/.test(Username)) ) {
        return false;
    } else {
        return true;
    }
}
const passwordValido = (Password) => {
    if( Password == null || Password.length < 5 || Password.length > 15 || /\s/.test(Password) || !(/\w+([-+.']\w+)*/.test(Password)) ) {
        return false;
    } else {
        return true;
    }

}
const numeroValido = (Number) => {
    if( (typeof Number) == "number" && Number > 12 && Number < 9) {
        return false;
    } else {
        return true;
    }

}
//----Validaciones para Libro
const tipoArchivoImagenValido = (Imagen) => {
    return true;
}
const tituloValido = (Titulo) => {
    if( Titulo == null || Titulo.length < 5 || Titulo.length > 20 || !(/\w+([-+.']\w+)*/.test(Titulo)) ) {
        return false;
    } else {
        return true;
    }
}
const anioValido = (Anio) => {
    if (Anio > 1000 && Anio < 2199) {
        return true;
    } else {
        return false;
    }
}
const autorValido = (Autor) => {
    if( Autor == null || Autor.length < 5 || Autor.length > 20 || !(/\w+([-+.']\w+)*/.test(Autor)) ) {
        return false;
    } else {
        return true;
    }
}
const categoriaValida = (Categoria) => {
    if (Categoria == 'Novel' || Categoria == 'Essay' || Categoria == 'Poetry' || Categoria == 'Textbook' || Categoria == 'Reader' || Categoria == 'Non-fiction' || Categoria == 'Mistery' || Categoria == 'Historical' || Categoria == 'Cookery' || Categoria == 'Short' || Categoria == 'Crime' || Categoria == 'Romantic') {
        return true;
    } else {
        return false;
    }
}