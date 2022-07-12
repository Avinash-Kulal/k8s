const express = require("express")
const app = express();
const path = require("path")
const multer = require("multer")
const morgan = require("morgan")

require("dotenv-defaults").config();
const { env } = process;

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, path.join(__dirname, '/images'))
 },
 filename: function (req, file, cb) {
  cb(null, 'image.jpg');
 }
})

const upload = multer({ storage: storage })
app.use(express.static('images'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'))
app.get('/', (req, res) => {
 return res.render('home', { data: env.PORT });
})
app.use(morgan('tiny'));

app.get('/upload', (req, res) => {
 return res.render('upload');
})

app.get('/image', (req, res) => {
 return res.render('image')
})

app.post('/upload', upload.single('file'),(req, res) => {
 return res.redirect('/image')
})

app.listen(env.PORT, _ => {
 console.log(`App listen on prot ${env.PORT}`)
})