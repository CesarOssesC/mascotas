const express = require('express')
const exphbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
const { Jimp } = require('jimp')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs.engine())
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

    res.render('index', { mascotas })
})

app.listen(PORT, () => console.log(`Servidor inicializado en http://localhost:${PORT}`))