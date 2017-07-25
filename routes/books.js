var express = require('express')
var router = express.Router();
var controller = require('../controller/booksController')

//findall
router.get('/', controller.findDocument)

//find one
router.get('/:id', controller.findbyIdDocument)

//update
router.put('/:id', controller.updateDocument)

// delete
router.delete('/:id', controller.deleteDocument)

// create
router.post('/', controller.insertDocument)


module.exports = router
