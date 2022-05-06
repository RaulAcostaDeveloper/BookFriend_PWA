import {esUsuarioValido} from '../BackEndSimulation/Validaciones.js';
import {aniadirUsuarioNuevo} from '../BackEndSimulation/index.js';

const tryRegister = async() => {
    const user = {
        Username: document.getElementById('registerUsername').value,
        Password: document.getElementById('registerPassword').value,
        Number: document.getElementById('registerNumber').value,
    }
    if (await esUsuarioValido(user)) {//Doble validación
        if (await aniadirUsuarioNuevo(user)) {
            alert('Successful Registration')
            window.history.back();
        } else {
            alert ('Can not add a new user');
        }
    } else{
        alert('Invalid User');
    }
}
let botonRegister = document.getElementById('botonRegister');
botonRegister.addEventListener("click", tryRegister, false);