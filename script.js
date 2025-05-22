const express = require('express')
const PORTA = 8000
const fs = require('fs')

function adicionarMensagem (nome_aluno) {
    const mensagem = `${id_unico} - ${data_hora} - ${nome_aluno}\n`
    const data_hora = new Date().toISOString()
    const id_unico = Math.random().toString(36).substring(2, 10)

    fs.appendFile('logs.text', mensagem, (err) => {
        if (err) {
            console.error("Erro ao adcionar", err)
        }else{
            console.log("Log adcionado")
        }
    })
}

const server = express()
server.use(express.json())


server.listen(PORTA, ()=> {console.log("Servidor rodando na porta 8000.")})