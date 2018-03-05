import * as express from 'express'
import * as path from "path"

const app: express.Express = express()

app.use(
  express.static(path.join(__dirname, "../dist"), { maxAge: 31557600000 })
);
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
