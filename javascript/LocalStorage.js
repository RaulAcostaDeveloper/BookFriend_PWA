// localStorage.clear(); //AQUI BORRA STORAGE
//Ojo, al ir hacia atras, podría recuperar el login del usuario (user y pass)
export const actualizaLoginActual = (name, password) => {
    const user = {
        name,
        password
    }
    localStorage.setItem("LoginActual", JSON.stringify(user));
}
export const loginActual = () => {
    return JSON.parse(localStorage.getItem('LoginActual'));
}

export const actualizaIdLibroEditar = (id) => {
    localStorage.setItem("idLibroEdita", Number(id));
}
export const idLibroEditar = () => {
    const id = Number(localStorage.getItem('idLibroEdita'));
    return id;
}