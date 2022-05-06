//Todos los eventos detonados por botones en html
const devolverLibro = (idLibro) => {
    document.dispatchEvent(new CustomEvent("devolverLibro", {
        "detail": idLibro
      }))
}
const editarLibro = (idLibro) => { //Aún pendiente
    document.dispatchEvent(new CustomEvent("editarLibro", {
        "detail": idLibro
      }))
}
const eliminarLibro = (idLibro) => {
    document.dispatchEvent(new CustomEvent("eliminarLibro", {
        "detail": idLibro
      }))
}
const tomarLibro = (idLibro) => {
    document.dispatchEvent(new CustomEvent("tomarLibro", {
        "detail": idLibro
      }))
}
const prestarLibro = (idLibro) => {
  document.dispatchEvent(new CustomEvent("prestarLibro", {
      "detail": idLibro
    }))
}