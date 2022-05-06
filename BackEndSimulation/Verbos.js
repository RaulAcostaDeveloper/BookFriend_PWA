import {actualizaListaLocalStorage, actualizaContadorLocalStorage, recuperaListaLocalStorage, recuperaContadorLocalStorage} from './Database/LocalStorage.js';
import { esAdministrador } from "./Validaciones.js";
//Datos de la sesión actuál
export let booksJson = [];
export let adminsJson = [ //Administrador por default, solo se puede añadir así
    {
        id:1,
        Username: "Admin1",
        Password: "1Admin",
        Books:[
            {
                id:null
            }
        ]
    }
];
export let usersJson = [];

export let booksCount = 0;
export let adminsCount = 0;
export let usersCount = 0;

export const GET = (type, admin) =>{
    console.log('GET');
    //El get debe validar que sea administrador
    //Solo el desarrollador debe poder ver la lista de usuarios y administradores
    //Un usuario puede ver la lista de libros
    switch (type) {
        case "booksJson":
            return booksJson;
        case "adminsJson":
            if (esAdministrador(admin)) { //Aquí no va la validación
                return adminsJson;
            }
            break;
        case "usersJson":
            if (esAdministrador(admin)) {//Aquí no va la validación
                return usersJson;
            }
            break;
        default:
            return "No Type";
    }
}
export const GETONE = (type, ID, admin) =>{
    console.log('GET(ONE)');
    //El get debe validar que sea administrador
    //Solo el desarrollador debe poder ver la lista de usuarios y administradores
    //Un usuario puede ver la lista de libros
    switch (type) {
        case "booksJson":
            for (let index = 0; index < booksJson.length; index++) {
                if (booksJson[index].id == ID) {
                    return booksJson[index];
                }
            }
            return false;
        case "adminsJson":
            if (esAdministrador(admin)) {//Aquí no va la validación
                for (let index = 0; index < adminsJson.length; index++) {
                    if (adminsJson[index].id == ID) {
                        return adminsJson[index];
                    }
                }
                return false;
            }
            break;
        case "usersJson":
            if (esAdministrador(admin)) {
                for (let index = 0; index < usersJson.length; index++) {
                    if (usersJson[index].id == ID) {
                        return usersJson[index];
                    }
                }
                return false;
            }
            break;
        default:
            return "No Type";
    }
}
export const POST = (type, data, admin)=>{
    console.log('POST');
    //El post debe validar que sea administrador
    //Solo un administrador puede añadir un libro
    //No se requiere usuario para añadir un usuario
    switch (type) {
        case "booksJson":
            if (esAdministrador(admin)) {// Aquí no va la validación
                booksCount++;
                actualizaContadorLocalStorage('booksCount', booksCount);
                booksJson.push(data);
                actualizaListaLocalStorage('booksJson', booksJson);
            }
            break;
        case "usersJson":
            usersCount++;
            actualizaContadorLocalStorage('usersCount', usersCount);
            usersJson.push(data);
            actualizaListaLocalStorage('usersJson', usersJson);
            break;
        default:
            return "No Type";
    }
}
export const PATCH = (type, ID, data)=>{
    console.log('PATCH');
    switch (type) {
        case "booksJson":
            for (let index = 0; index < booksJson.length; index++) {
                if (booksJson[index].id == ID) {
                    booksJson[index] = data;
                }
            }
            actualizaListaLocalStorage('booksJson', booksJson);
            return false;
            // booksJson.push(data);
            break;
        case "usersJson":
            for (let index = 0; index < usersJson.length; index++) {
                if (usersJson[index].id == ID) {
                    usersJson[index] = data;
                }
            }
            actualizaListaLocalStorage('usersJson', usersJson);
            break;
        default:
            return "No Type";
    }
}
export const DELETE = (type, ID) => {
    console.log('DELETE');
    switch (type) {
        case "booksJson":
            for (let index = 0; index < booksJson.length; index++) {
                if (ID == booksJson[index].id) {
                    booksJson.splice(index, 1);
                }
            }
            actualizaListaLocalStorage('booksJson', booksJson);
            break;
        case "usersJson":
            for (let index = 0; index < usersJson.length; index++) {
                if (ID == usersJson[index].id) {
                    usersJson.splice(index, 1);
                }
            }
            actualizaListaLocalStorage('usersJson', usersJson);
            break;
        default:
            return "No Type";
    }
}

//Ejecución para el inicio del servidor
const recuperarDataLocalStorage = () => {
    if (recuperaListaLocalStorage('booksJson')) {
        booksJson = recuperaListaLocalStorage('booksJson');
    }
    if (recuperaListaLocalStorage('adminsJson')) {
        adminsJson = recuperaListaLocalStorage('adminsJson');
    }
    if (recuperaListaLocalStorage('usersJson')) {
        usersJson = recuperaListaLocalStorage('usersJson');
    }
    if (recuperaContadorLocalStorage('booksCount')) {
        booksCount = recuperaContadorLocalStorage('booksCount');
    }
    if (recuperaContadorLocalStorage('adminsCount')) {
        adminsCount = recuperaContadorLocalStorage('adminsCount');
    }
    if (recuperaContadorLocalStorage('usersCount')) {
        usersCount = recuperaContadorLocalStorage('usersCount');
    }
}
recuperarDataLocalStorage();