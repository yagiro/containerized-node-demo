import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT ?? 8000

app.use(bodyParser.json())

app.use((req, _res, next) => {
    console.debug(`${req.method} ${req.path}`)
    next()
})

app.get('/alive', (_req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send('yep')
})

app.get('/cat', (_req, res) => {
    res.send({
        voice: 'meow',
    })
})

app.get('/dog', (req, res) => {
    let voice = 'woof'
    const name = req.query.name
    if (name) voice += ', ' + name
    res.send({
        voice,
        name,
    })
})

/*
curl \
-H 'Content-Type: application/json' \
-d '{"name":"antonio"}' \
http://localhost:8000/greet
*/
app.post('/greet', (req, res) => {
    res.send({
        greeting: 'ciao, ' + req.body.name,
    })
})

app.use((_req, res) => {
    res.send({
        fallback: true,
    })
})

app.listen(port, () => {
    console.debug('demo-server listening on port ' + port + '.')
})
