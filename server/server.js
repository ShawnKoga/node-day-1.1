const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const port = 8080;

// Controllers
const booksCtrl = require('./controllers/booksCtrl')

app.use((req, res, next)=>{
  console.log(req.url);
  next();
})
app.use(express.static(`${__dirname}/../build`))
app.use(bodyParser.json());

let books = require('./data/books.js');

app.get('/api/books', booksCtrl.getBooks)
app.post('/api/books', booksCtrl.createBook)
app.put('/api/books/:id', booksCtrl.updatebook)
app.delete('/api/books/:id', booksCtrl.deleteBook)
app.patch('/api/books/:id/upvote', booksCtrl.upvoteBook)

app.get('/*', (req, res)=>{
  res.sendFile(path.join(__dirname, '..','build','index.html'));
})

app.listen(port, ()=>{
  console.log(`Listening on port: ${port}` );
})
