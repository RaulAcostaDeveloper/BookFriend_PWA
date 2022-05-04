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
    if (tipoArchivoImagenValido(data.Imagen) && tituloValido(data.Titulo) && anioValido(data.Anio) && autorValido(data.Autor)) {
        return true;
    } else {
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
        console.log('Username Invalido');
        return false;
    } else {
        console.log('Username Valido');
        return true;
    }
}
const passwordValido = (Password) => {
    if( Password == null || Password.length < 5 || Password.length > 15 || /\s/.test(Password) || !(/\w+([-+.']\w+)*/.test(Password)) ) {
        console.log('Password Invalido');
        return false;
    } else {
        console.log('Password Valido');
        return true;
    }

}
const numeroValido = (Number) => {
    if( !(/^\d{9}$/.test(Number)) ) {
        console.log('Number Invalido');
        return false;
    } else {
        console.log('Number Valido');
        return true;
    }

}
//----Validaciones para Libro
const tipoArchivoImagenValido = () => {
    console.log('imagen aún no validado');

    return true;
}
const tituloValido = (Titulo) => {
    if( Titulo == null || Titulo.length < 5 || Titulo.length > 20 || /\s/.test(Titulo) || !(/\w+([-+.']\w+)*/.test(Titulo)) ) {
        console.log('Titulo Invalido');
        return false;
    } else {
        console.log('Titulo Valido');
        return true;
    }
}
const anioValido = () => {
    console.log('año aún no validado');
    return true;
}
const autorValido = (Autor) => {
    if( Autor == null || Autor.length < 5 || Autor.length > 15 || /\s/.test(Autor) || !(/\w+([-+.']\w+)*/.test(Autor)) ) {
        console.log('Autor Invalido');
        return false;
    } else {
        console.log('Autor Valido');
        return true;
    }
}