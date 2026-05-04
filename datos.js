const fs = require("fs/promises")

const leerArchivo = async (ruta) => {
    try {
        const contenido = await fs.readFile(ruta, 'utf-8')
        return JSON.parse(contenido)
    } catch (error) {
        return []
    }
}

const escribirArchivo = async (ruta, datos) => {
    await fs.writeFile(ruta, JSON.stringify(datos, null, 4))
}


module.exports = { leerArchivo, escribirArchivo }