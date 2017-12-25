// Variables
let router = require('express').Router();
let db = require('level')('/opt/dev/bookshelfdb');
let books = [];

// Functions
let bookUpdateService = (cb) => {
  let tmp = [];
  db.createReadStream()
      .on('data', function (data) {
          let tvar = JSON.parse(data.value);
          tvar.id = data.key;
          tmp.push(tvar);
      })
      .on('error', function (err) {
          console.log('Oh my!', err);
      })
      .on('close', function () {
          // console.log('Stream closed');
      })
      .on('end', function () {
          books = tmp;
          console.log("Updated books list");
          if (cb != null) cb();
      });
};

// Populates books for 
bookUpdateService();
console.log(books);

/* GET home page. */
router.get('/', (req, res) => {
  console.log(typeof books);
  res.render('index',  books); 
});

module.exports = router;

setInterval(bookUpdateService, 60000);