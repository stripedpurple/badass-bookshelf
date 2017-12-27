// Variables
let router = require('express').Router();
let db = require('level')('/opt/dev/db/bookshelfdb');


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {title: "Home | Textbook Bay"});
});

// Gets Books
router.get('/api/v1/books', (req, res) => {
    let books = [];
    db.createReadStream()
        .on('data', function (data) {
            let tvar = JSON.parse(data.value);
            tvar.id = data.key;
            books.push(tvar);
        })
        .on('error', function (err) {
            console.log('Oh my!', err);
        })
        .on('close', function () {
            console.log('Stream closed');
        })
        .on('end', function () {
            console.log(books);
            res.send(books);
        });
});


module.exports = router;
