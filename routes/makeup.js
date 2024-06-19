const express = require('express')
const app = express();
const router = express.Router();

const makeup = require('../model/products.json')

app.get('/', (req,res)=> {
    res.send(makeup);

})

module.exports = router