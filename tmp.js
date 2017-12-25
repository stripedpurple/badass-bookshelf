let db = require('level')('/opt/dev/bookshelfdb');
let books = [];

db.put('1235',JSON.stringify({
    isCat: true,
    age: 60
}), function(err){
    if (err) console.log('put error:',err);
    db.get('1235', function(err, data){
        if (err) console.log('get error:',err);
    });
});

let t = (cb) => {
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
            cb();
        });
};

t(() => console.log(books));
