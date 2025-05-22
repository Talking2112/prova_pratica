const express = require('express')
const fs = require('fs')

const PORTA = 8000
const server = express()
server.use(express.json())

function adicionarMensagem (nome_aluno) {
    const data_hora = new Date().toISOString()
    const id_unico = Math.random().toString(36).substring(2, 10)
    const mensagem = `${id_unico} - ${data_hora} - ${nome_aluno}\n`

    fs.appendFile('logs.txt', mensagem, (err) => {
        if (err) {
            console.error("Erro ao adcionar", err)
        }else{
            console.log("Log adcionado")
        }
    })
}

server.post('/logs', (req, res) => {
    const {nome_aluno} = req.body
        if(nome_aluno){
            return res.status(400).json({erro: 'Você não colocou um nome!'})
        }
        adicionarMensagem(nome_aluno)
            res.status(200).json({mensagem: 'Log salvo'})
    
})

server.listen(PORTA, ()=> {console.log("Servidor rodando na porta 8000.")})