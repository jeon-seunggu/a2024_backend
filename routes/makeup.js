const express = require('express')
const router = express.Router();

const makeup = require('../model/products.json')

app.get('/', (req,res)=> {
    res.send(makeup);

})

module.exports = router