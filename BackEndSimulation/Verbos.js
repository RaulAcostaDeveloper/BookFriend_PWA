import { esAdministrador } from "./Validaciones.js";
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
    //El get debe validar que sea administrador
    //Solo el desarrollador debe poder ver la lista de usuarios y administradores
    //Un usuario puede ver la lista de libros
    switch (type) {
        case "booksJson":
            return booksJson;
        case "adminsJson":
            if (esAdministrador(admin)) {
                return adminsJson;
            }
            break;
        case "usersJson":
            if (esAdministrador(admin)) {
                return usersJson;
            }
            break;
        default:
            return "No Type";
    }
}

export const POST = (type, data, admin)=>{
    //El post debe validar que sea administrador
    //Solo un administrador puede añadir un libro
    //No se requiere usuario para añadir un usuario
    switch (type) {
        case "booksJson":
            if (esAdministrador(admin)) {
                booksCount++;
                booksJson.push(data);
            }
            break;
        case "usersJson":
            usersCount++;
            usersJson.push(data);
            break;
        default:
            return "No Type";
    }
}
//PATCH pendiente
export const PATCH = (type, data)=>{
    switch (type) {
        case "booksJson":
            // booksJson.push(data);
            break;
        case "adminsJson":
            // adminsJson.push(data);
            break;
        case "usersJson":
            // usersJson.push(data);
            break;
        default:
            return "No Type";
    }
}