import {esUsuarioValido} from '../BackEndSimulation/Validaciones.js';
import {GET, POST} from '../BackEndSimulation/Verbos.js';

const tryRegister = () => {
    const registerUsername = document.getElementById('registerUsername').value;
    const registerPassword = document.getElementById('registerPassword').value;
    const registerNumber = document.getElementById('registerNumber').value;
    const user = {
        Username: registerUsername,
        Password: registerPassword,
        Number: registerNumber
    }
    if (esUsuarioValido(user)) {
        console.log('Registro Exitoso');
        //NO HACER POST DIRECTAMENTE, DEBE PASAR POR VALIDACIONES
        POST('usersJson', user);
        alert('Successful Registration')
        console.log(GET('usersJson', {
            Username: "Admin1",
            Password: "1Admin",
        }) );
        alert('wait');
        window.history.back();
    } else{
        console.log('Registro Fallido');
        alert('Invalid Input');
    }
}
let botonRegister = document.getElementById('botonRegister');
botonRegister.addEventListener("click", tryRegister, false);