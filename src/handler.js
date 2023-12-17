const books = require('./books');
const { nanoid } = require('nanoid');

// Menambahkan Buku
const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const bookNew = { id, name, year, author, summary, publisher, pageCount, readPage, finished: readPage == pageCount, reading, insertedAt, updatedAt };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  books.push(bookNew);

  const isSuccess = books.filter((books) => books.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal menambahkan buku',
  });

  response.code(500);
  return response;
};
// Menambahkan Buku

// Membaca Seluruh isi Bookshelf
const getAllBookHandler = () => ({
  status: 'success',
  data: {
    books: books.map((bookshelf) => ({
      id: bookshelf.id,
      name: bookshelf.name,
      publisher: bookshelf.publisher,
    })),
  },
});
// Membaca Seluruh isi Bookshelf

// Membaca Salah satu isi bookshelf
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];
  // console.log(book);

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};
// Membaca Salah satu isi bookshelf

// Memperbarui Isi Bookshelf
const updateBookHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const indexUpdated = books.findIndex((books) => books.id === id);

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  if (indexUpdated !== -1) {
    books[indexUpdated] = {
      ...books[indexUpdated],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};
// Memperbarui Isi Bookshelf

// Menghapus Isi Bookshelf
const deleteBookHandler = (request, h) => {
  const { id } = request.params;
  const indexBook = books.findIndex((books) => books.id === id);

  if (indexBook !== -1) {
    books.splice(indexBook, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};
// Menghapus Isi Bookshelf

module.exports = { addBookHandler, getAllBookHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler };
