var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// connection
// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert')
// var url = 'mongodb://localhost:27017/library';
// // connect method to connect to the server
// MongoClient.connect(url, function(err, db){
//   assert.equal(null,err);
//   console.log("Connected to server");
//   insertDocuments(db, function(){
//     updateDocument(db, function(){
//       deleteDocument(db, function(){
//         findDocuments(db, function(){
//             db.close();
//         })
//       })
//     })
//   })
// })
// OK sudah connected to server

//=====================================================
// now inseting some docs for us
// var insertDocuments = function(db, callback) {
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

// utk manggil nya =
  // konek diatas.. trus tinggal dilanjutin ( sudah ada diatas manggil
// function insertDocuments e)

//=====================================================

// now update!!

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

//=====================================================

// now Delete
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

//=====================================================
// Find ALL
// var findDocuments = function(db, callback){
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


//=====================================================
var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/books', books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
