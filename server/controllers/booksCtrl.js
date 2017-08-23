let books = require('./../data/books')



module.exports = {
    getBooks: function(req, res) {
        res.send(books);
    },

    createBook:function(req, res) {
        if (!req.body.title){
          return res.status(400).send("All books must have a title");
        }
        req.body.votes = 0;
        req.body.id = (books.length?books[books.length -1].id+1:1)
        books.push(req.body);
        res.send(req.body);
      },

    updateBook:function(req, res){      
        let bookToUpdate = books.find((book)=>book.id === req.params.id * 1);
          if (!bookToUpdate){
            return res.status(404).send("No book found with that ID");
          }
        
          delete req.body.votes;
          delete req.body.id;
          Object.assign(bookToUpdate, req.body),

    deleteBook: function(req, res){
        let bookToDelete = books.find((book)=>book.id === req.params.id * 1);
        if (!bookToDelete){
          return res.status(404).send(`No book with id ${req.params.id} to delete`);
        }
        res.send({
          message:`Deleteing book id ${req.params.id} (${bookToDelete.title})`,
          book:bookToDelete
        })
      },

    upvoteBook:function(req, res){
        let bookToUpvote = books.find((book)=>book.id === req.params.id * 1);
        if (!bookToUpvote){
          return res.status(404).send("No book by that ID to update");
        }
        bookToUpvote.votes +=1;
        res.send(`${bookToUpvote.title} now has ${bookToUpvote.votes} votes`);
      }
}