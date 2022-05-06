// localStorage.clear(); //CUIDADO!! AQUI BORRA STORAGE

//Local Storage es para recordar en la sesión la data
//Se supone que la data debe estar del lado del servidor cuando hay servidor
//Para proyectos Front, el Local storage es data que se guarda en el navegador
export const actualizaListaLocalStorage = (type, data) => {
    console.log('actualizaListaLocalStorage');
    switch (type) {
        case "booksJson":
            localStorage.setItem("booksJson", JSON.stringify(data));
            break;
        case "adminsJson":
            localStorage.setItem("adminsJson", JSON.stringify(data));
            break;
        case "usersJson":
            localStorage.setItem("usersJson", JSON.stringify(data));
            break;
        default:
            return "No Type";
    }
}
export const actualizaContadorLocalStorage = (type, data) => {
    switch (type) {
        case "booksCount":
            localStorage.setItem("booksCount", Number(data));
            break;
        case "adminsCount":
            localStorage.setItem("adminsCount", Number(data));
            break;
        case "usersCount":
            localStorage.setItem("usersCount", Number(data));
            break;
        default:
            return "No Type";
    }
}

export const recuperaListaLocalStorage = (type) => {
    switch (type) {
        case "booksJson":
            return JSON.parse(localStorage.getItem('booksJson'));
        case "adminsJson":
            return JSON.parse(localStorage.getItem('adminsJson'));
        case "usersJson":
            return JSON.parse(localStorage.getItem('usersJson'));
        default:
            return false;
    }
}
export const recuperaContadorLocalStorage = (type) => {
    switch (type) {
        case "booksCount":
            return Number(localStorage.getItem('booksCount'));
        case "adminsCount":
            return Number(localStorage.getItem('adminsCount'));
        case "usersCount":
            return Number(localStorage.getItem('usersCount'));
        default:
            return false;
    }
}