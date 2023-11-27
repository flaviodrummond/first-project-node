const express = require('express')
const app = express()
const port = 3000


app.get('/users/:id', (request, response) =>{
    
    const {id} = request.params
    console.log(id)
    return response.json('hello')
})

app.listen(port, () => {
    console.log(`🚀server started on port ${3000}`)
})