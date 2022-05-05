const devolverLibro = (idLibro) => {
    document.dispatchEvent(new CustomEvent("devolverLibro", {
        "detail": idLibro
      }))
}
const editarLibro = (idLibro) => {
    document.dispatchEvent(new CustomEvent("editarLibro", {
        "detail": idLibro
      }))
}
const eliminarLibro = (idLibro) => {
    document.dispatchEvent(new CustomEvent("eliminarLibro", {
        "detail": idLibro
      }))
}
const asignarLibro = (idLibro) => {
    document.dispatchEvent(new CustomEvent("asignarLibro", {
        "detail": idLibro
      }))
}