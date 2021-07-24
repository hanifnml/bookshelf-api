const { nanoid } = require('nanoid')
const bookshelf = require('./bookshelf')

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(15)
  const finished = Boolean.filter((book) => pageCount === readPage)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }

  bookshelf.push(newBook)

  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
}

module.exports = { addBookHandler }
