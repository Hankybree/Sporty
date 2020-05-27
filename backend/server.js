const express = require('express')

const app = express()

app.listen({ port: 3000 }, () => {
    console.log('nu funkar det')
})

app.get('/', (request, response) => {
    response.send('get one')
})

app.get('/', (request, response) => {
    response.send('get many')
})

app.post('/', (request, response) => {
    response.send('post')
})

app.delete('/', (request, response) => {

})

