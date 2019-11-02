const express = require('express')
const app = express()
app.use(express.json())

const users = ['isa', 'neusa', 'noe', 'giuliana', 'silvana']
const books = ['centeio', 'anne', 'por um fio', 'ensaio cegueira']

function checkUsersInArray(req, res, next) {
    const user = users[req.params.indexUser]
    if (!user) {
        return res.status(400).json({ error: `Index user does not exist` })
    }
    req.user = user
    return next()
}
function checkBooksInArray(req, res, next) {
    const book = books[req.params.indexBook]
    if (!book) {
        return res.status(400).json({ error: `Index book sumiu` })
    }
    req.book = book
    return next()
}

app.get('/', (req, res) => {
    return res.json('Ola povooo')
})

app.get('/users', (req, res) => {
    return res.json(users)
})

app.get('/users/:indexUser', checkUsersInArray, (req, res) => {
    return res.json(req.user)
})

app.get('/books', (req, res) => {
    return res.json(books)
})

app.get('/books/:indexBook', checkBooksInArray, (req, res) => {
    return res.json(req.book)
})

app.get('/users/:indexUser/books/:indexBook', checkUsersInArray, checkBooksInArray, (req, res) => {
    return res.json({ users: req.user, books: req.book })
})

app.get('/country', (req, res) => {
    return res.json(req.query)
})
app.listen(3000)