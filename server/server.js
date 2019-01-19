import path from 'path'
import express from 'express'
import ejs from 'ejs'

const PORT = process.env.PORT || 5000
const VIEWS_PATH = path.join(__dirname, '../client-dist')
const STATIC_PATH = path.join(__dirname, '../client-dist/static')

const app = express()

app.use('/static', express.static(STATIC_PATH))

app.engine('html', ejs.renderFile)
app.set('views', VIEWS_PATH)
app.set('view engine', 'html')

app.get('/', (req, res) => res.render('index'))

app
  .listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
  .on('error', (err) =>
    console.log(err)
)