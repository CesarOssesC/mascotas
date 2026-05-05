const fs = require('fs')
const path = require('path')

const archivoContador = path.join(__dirname, 'data', 'contadorId.json')

function leerUltimoId() {
    const data = JSON.parse(fs.readFileSync(archivoContador, 'utf-8'))
    return data.ultimoId
}

function guardarUltimoId(nuevoId) {
    fs.writeFileSync(archivoContador, JSON.stringify({ultimoId: nuevoId}))
}

function generarId() {
    const ultimoId = leerUltimoId()
    const nuevoId = ultimoId + 1
    guardarUltimoId(nuevoId)
    return nuevoId
}

module.exports = { generarId }
