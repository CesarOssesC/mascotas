const { leerArchivo, escribirArchivo } = require('./datos')
const path = require('path')

const archivo = path.join(__dirname, 'data', 'mascotas.json')

const listarMascotas = async () => {
    return await leerArchivo(archivo)
}



module.exports = { listarMascotas }