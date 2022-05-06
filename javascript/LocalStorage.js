// localStorage.clear(); //AQUI BORRA STORAGE
export const actualizaLoginActual = (name, password) => {
    const user = {
        name,
        password
    }
    localStorage.setItem("LoginActual", JSON.stringify(user));
}
export const actualizaIdLibroEditar = (id) => {
    localStorage.setItem("idLibroEdita", Number(id));
}
export const loginActual = () => {
    return JSON.parse(localStorage.getItem('LoginActual'));
}
export const idLibroEditar = () => {
    return Number(localStorage.getItem('idLibroEdita'));
}