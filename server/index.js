import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'


// Falls ihr multer oder den express validator nutzt, importiert diese einfach auch
const PORT = process.env.PORT
const app = express()

app.use(morgan('dev'))
app.use(cors())

// hier ist genung Platz für alle eure Routen
app.get('/', (req,res) => {
    res.status(200).send('all runnin fine and stable..')
})



// dann werfen wir den Server mal an
app.listen(PORT, () => console.log('serving Ure stuff at..', PORT))
