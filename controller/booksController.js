var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/library';
var ObjectId = require('mongodb').ObjectId

//--------------
//add
// var insertDocument = function(db, callback) {
//   // get collection
//   var collection = db.collection('books');
//   // insert
//   collection.insertMany([
//     {a: 1}, {a: 2}, {a: 3}
//   ], function (err, result){
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 object to books collection");
//     callback(result)
//   })
// }

// v 2
var insertDocument = function(req,res) {
  MongoClient.connect(url, (err, db)=> {
    if(err) {
      res.send(err)
    } else {
      db.collection('books').insert({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: Number(req.body.stock)
      }, (err, result) => {
        if(err) {
          res.status(500).send(err)
        } else { res.send(result)}
      }
    )
    }
  })
}
// ok dah jln




//--------------
//update
// var updateDocument = function(db, callback){
//   // get collection
//   var collection = db.collection('books');
//   // update isi dimana a: 2, dan set b: 1
//   collection.updateOne({a: 2}
//     , { $set: {b: 1} }, function(err, result){
//       assert.equal(err, null);
//       assert.equal(1, result.result.n);
//       console.log("updated where a:2, set b:1");
//       callback(result);
//     })
// }

//v2
// var updateDocument = function(db, callback){
//   var collection = db.collection('books');
//   collection.updateOne({a: 2}
//     , { $set: {b: 1} }, function(err, result){
//       res.send('bla3')
//       callback(result);
//     })
// }
var updateDocument = function(req,res) {
  MongoClient.connect(url, (err, db)=> {
    if(err) {
      res.send(err)
    } else {
      db.collection('books').updateOne(
        {_id: ObjectId(req.params.id)},
        {
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: Number(req.body.stock)
        } , (err, result) => {
        if(err) {
          res.send(err)
        } else { res.send(result)}
      }
    )
    }
  })
}
// ok dah bisa,, testingnya pake id masukin ke url nya.. + pake put





//---------------
// delete
// var deleteDocument = function(db, callback) {
//   // get collection
//   var collection = db.collection('books');
//   // delete document
//   collection.deleteOne({
//     a : 3 }, function (err,result){
//       assert.equal(err, null);
//       assert.equal(1, result.result.n);
//       console.log('Delete doc a: 3');
//       callback(result);
//     });
// }

//v2
// var deleteDocument = function(db, callback) {
//   var collection = db.collection('books');
//   collection.deleteOne({
//     a : 3 }, function (err,result){
//     //  res.redirect.....
//       callback(result);
//     });
// }
var deleteDocument = function(req,res) {
  MongoClient.connect(url, (err, db)=> {
    if(err) {
      res.send(err)
    } else {
      db.collection('books').deleteOne(
        {_id: ObjectId(req.params.id)},
        (err, result) => {
        if(err) {
          res.send(err)
        } else { res.send(result)}
      }
    )
    }
  })
}
// ok sudah deleted jg..







//----------------
// var findDocument = function(db, callback){
//   // get doc collection
//   var collection = db.collection('books');
//   collection.find({}).toArray(function(err, docs){
//     // yup memang dijadiin array
//     assert.equal(err, null);
//   //  assert.equal(2, docs.length);
//     console.log("found the records");
//     console.dir(docs);
//     callback(docs)
//   })
// }

// v 2
// var findDocument = function(db, callback){
//   var collection = db.collection('books');
//   collection.find({}).toArray(function(err, docs){
//     res.send('..')
//     //console.dir(docs);
//     callback(docs)
//   })
// }
var findDocument = function(req,res) {
  MongoClient.connect(url, (err, db)=> {
    if(err) {
      res.send(err)
    } else {
      db.collection('books').find().toArray(function(err, result){
        if(err) {
          res.send(err)
        } else { res.send(result)}
      })
      }
    })
  }


  // find by id
    var findbyIdDocument = function(req,res) {
      MongoClient.connect(url, (err, db)=> {
        if(err) {
          res.send(err)
        } else {
          db.collection('books').findOne({
            _id: ObjectId(req.params.id)
          } ,(err, result)=>{
            if(err) {
              res.send(err)
            } else { res.send(result)}
          })
          }
        })
      }



//-----------------------

module.exports = {
  insertDocument,
  updateDocument,
  deleteDocument,
  findDocument,
  findbyIdDocument
}
