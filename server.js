const express = require('express')
const exphbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
const { Jimp } = require('jimp')
const path = require('path')
const fs = require('fs')
const { listarMascotas, agregarMascota, actualizarMascota } = require('./mascotas')
const { generarId } = require('./contadorId')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs.engine({
    partialsDir: path.join(path.join(__dirname, '/views/partials'))
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/bootstrap/css', express.static(path.join(__dirname + '/node_modules/bootstrap/dist/css')))
app.use('/bootstrap/js', express.static(path.join(__dirname + '/node_modules/bootstrap/dist/js')))
app.use(fileUpload())


app.get('/', async (req, res) => {

    let mascotas = await listarMascotas()
    console.log(mascotas)
    res.render('index', { mascotas })
})

app.get('/mascotas/:id/editar', async (req, res) => {
    
})

app.post('/mascotas', async (req, res) => {
    const { nombre, especie, raza, edad, dueno, ciudad } = req.body
    if (!req.files || !req.files.foto) return res.status(400).send("Debes subir una foto")
    const foto = req.files.foto
    const nombreFoto = `${nombre.trim().toLowerCase()}_${Date.now() + path.extname(foto.name)}`
    const rutaGuardar = path.join(__dirname, 'public', 'img', nombreFoto)

    const imagen = await Jimp.read(foto.data)
    await imagen.resize({ w: 300 }).write(rutaGuardar)

    const nuevaMascota = {
        id: generarId(),
        fecha: Date.now(),
        nombre,
        especie,
        raza,
        edad,
        dueno,
        ciudad,
        foto: nombreFoto
    }

    await agregarMascota(nuevaMascota)

    res.redirect('/')
})

app.put('/mascotas/:id', async (req, res) => {

})

app.listen(PORT, () => console.log(`Servidor inicializado en http://localhost:${PORT}`))