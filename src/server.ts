import express from 'express'


const app = express()

app.get('/', (req, res) => {
    return res.json({ message: "Bem vindo a API " })

})


app.listen(3000, () => {
    console.log('server rodando na porta 3000')
})