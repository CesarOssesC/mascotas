const { leerArchivo, escribirArchivo } = require('./datos')
const path = require('path')

const archivo = path.join(__dirname, 'data', 'mascotas.json')

const listarMascotas = async () => {
    return await leerArchivo(archivo)
}

const agregarMascota = async (mascota) => {
    const mascotas = await listarMascotas(archivo)
    mascotas.push(mascota)
    await escribirArchivo(archivo, mascotas)
}

const actualizarMascota = async (id, mascotaActualizada) => {
    const mascotas = await leerArchivo(archivo)
    const index = mascotas.findIndex(m => m.id === id)
    mascotas[index] = {...mascotas[index], ...mascotaActualizada}
    await escribirArchivo(archivo, mascotas)
}

const eliminarMascota = async (id) => {
    let mascotas = await leerArchivo(archivo)
    mascotas = mascotas.filter(m => m.id !== id)
    await escribirArchivo(archivo, mascotas)
}


module.exports = { listarMascotas, agregarMascota, actualizarMascota, eliminarMascota }