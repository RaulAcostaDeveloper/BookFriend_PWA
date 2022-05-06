import {esUsuarioValido} from '../BackEndSimulation/Validaciones.js';
import {GET, POST, usersCount} from '../BackEndSimulation/Verbos.js';

const tryRegister = () => {
    const user = {
        Username: document.getElementById('registerUsername').value,
        Password: document.getElementById('registerPassword').value,
        Number: document.getElementById('registerNumber').value,
        id: usersCount
    }
    if (esUsuarioValido(user)) {
        console.log('Registro Exitoso');
        //ESTO ES FRONT; NO DEBE HABER VALIDACIONES AQUÍ
        POST('usersJson', user);
        alert('Successful Registration')
        window.history.back();
    } else{
        console.log('Registro Fallido');
        alert('Invalid Input');
    }
}
let botonRegister = document.getElementById('botonRegister');
botonRegister.addEventListener("click", tryRegister, false);