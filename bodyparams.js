const express = require('express')
const app = express()
const port = 3000
app.use(express.json())


app.get('/users/', (request, response) =>{
    

    const {name, age} = request.body
    
    return response.json({name, age})
})

app.listen(port, () => {
    console.log(`🚀server started on port ${3000}`)
})