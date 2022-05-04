import {esAdministrador, esUsuario} from '../BackEndSimulation/Validaciones.js';
import {actualizaLoginActual} from './LocalStorage.js';
const tryLogin = () => {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const user = {
        Username: loginUsername,
        Password: loginPassword
    }
    if (esAdministrador(user)) {
        actualizaLoginActual(user.Username, user.Password);
        window.location.href = "indexAdmin.html";
    } else if(esUsuario(user)){
        actualizaLoginActual(user.Username, user.Password);
        window.location.href = "indexUser.html";
    } else{
        console.log('Login Fallido');
        alert('User Not Found')
    }
}
let botonLogin = document.getElementById('botonLogin');
botonLogin.addEventListener("click", tryLogin, false);