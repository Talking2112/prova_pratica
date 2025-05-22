const express = require('express')
const fs = require('fs')

const PORTA = 8000
const server = express()
server.use(express.json())

function adicionarMensagem (nome_aluno) {
    const data_hora = new Date().toISOString()
    const id_unico = Math.random().toString(36).substring(2, 10)
    const mensagem = `${id_unico} - ${data_hora} - ${nome_aluno}\n`

    fs.appendFileSync('logs.txt', mensagem)

    return id_unico
}

function buscarMensagemId (id) { 

    try{
        const dados = fs.readFileSync('logs.txt', 'utf-8')
        const linhas = dados.split('\n')

        for (const linha of linhas){
            if (linhas.startsWith(id)){
                return linha
            }
        }
        return null
    } catch (error) {
        console.error('Erro em ler o arquivo: ', error)
        return null
    }
}
server.post('/logs', (req, res) => {
    const {nome_aluno} = req.body
        if(!nome_aluno){
            return res.status(400).json({erro: 'Você não colocou um nome!'})
        }
        const idGerado = adicionarMensagem(nome_aluno)
            res.status(200).json({mensagem: 'Log salvo', id: idGerado})
    
})

server.get('/logs/:id', (req, res) => {
    const {id} =req.params
    const mensagemPronta = buscarMensagemId(id)

    if(mensagemPronta){
        return res.status(200).json({mensagem: mensagemPronta})
    }else{
        return res.status(404).json({erro: 'Não encontrado!'})
    }
})

server.listen(PORTA, ()=> {console.log("Servidor rodando na porta 8000.")})