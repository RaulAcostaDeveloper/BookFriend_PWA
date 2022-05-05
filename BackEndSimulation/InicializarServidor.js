import {GET, POST, PATCH, booksCount, adminsCount, usersCount} from './Verbos.js';
//--------Datos de prueba
const aniadirDatosPruebaUsers = (cuantos) => {
    for (let index = 0; index < cuantos; index++) {
        POST("usersJson", {
            id:usersCount,
            Username: "User"+usersCount,
            Password: usersCount+"User",
        });
    }
}
const aniadirDatosPruebaBooks = (cuantos) => {
    for (let index = 0; index < cuantos; index++) {
        POST("booksJson", {
            id:booksCount,
            CoverImage: "./BackEndSimulation/Database/CoverImages/portadaLibro.png",
            Title: "The comunist of Da Vinci Code" + booksCount,
            Year:"2003",
            Author: "Dan Brown",
            Category: "Mistery",
            UserAsignedID:null,
            AdminAsignedID:1,
        },
        {
            Username: 'Admin1',
            Password: '1Admin',
        });
    }
}
//-----------Ejecución
aniadirDatosPruebaBooks(10);
aniadirDatosPruebaUsers(10);
//Para ver en todo momento la data se requiere el administrador como parámetro
console.log(GET("adminsJson", {
    Username: "Admin1",
    Password: "1Admin",
}));
console.log(GET("booksJson"));
console.log(GET("usersJson", {
    Username: "Admin1",
    Password: "1Admin",
}));