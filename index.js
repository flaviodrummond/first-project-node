const express = require('express')
const app = express()
const port = 3000
app.use(express.json()) // Avisando o express que eu quero usar como padrão o Json
const uuid = require('uuid') // Criando uma variável para armazenar a biblioteca



const users = []

const ckeckUserId = (request, response, next) => { // Criamos um middleware

    const { id } = request.params // Pegando o id do usuário


    // Find e FindIndex -  nos permite encontrar informações no nosso array. O find, ele vai encontrar a informação dentro do array e me retornar a informação. Já o findIndex vai me retornar o local do array onde está minha informação (posição), Caso ele não encontre, vai me retornar o menos -1
    const index = users.findIndex(user => user.id === id) // Assim que ele encontrar o usuário dentro do meu array, que tem o id, igual o id que estou procurando na minha variável, ele vai retornar no meu index


    // Fazendo a verificação para que ao retornar e não encontar os dados, me retorne uma mensagem
    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {

    /* Essas variáveis acima posso também fazer desta forma
    const {name, age} = request.query esse padrão é chamado de destructuring assigment
    Que me dará o mesmo resultado */

    return response.json(users) // Quando os valores são o mesmo nome
})

app.post('/users', (request, response) => { // Criando uma nova rota tipo Post
try { // Tratamento de erro (Try Catch) Primeiro abraçamos o código com try, para que caso temos um erro dentro do nosso código, podemos tratar.
    const { name, age } = request.body // Vai chegar algumas informações no meu request.body


    const user = { id: uuid.v4(), name, age } // Montando meu usuário para que chegue as informações aqui. O uuid.v4() é uma biblioteca que gera id universal

    users.push(user) // add a informação dentro da nossa variável users

    return response.status(201).json(user)
} catch(err) { // Junto com o try, temos o catch, que podemos lhe dar respostas ao servidor, do jeito que quisermos.
    return response.status(500).json({error: err.message})
}
})

app.put('/users/:id', ckeckUserId, (request, response) => {

    const { name, age } = request.body // Pegando as informações novas do usuário

    const index = request.userIndex

    const id = request.userId

    const updateUser = { id, name, age } // montando meu usuário

    users[index] = updateUser // Pegando o array de usuário e caso ele pegue o número correto, pegue a posição do usuário e será assumida pelo usuário atualizado


    return response.json(updateUser) // retornando só o usuário atualizado
})

app.delete('/users/:id', ckeckUserId, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})