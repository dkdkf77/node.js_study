const express = require('express');
const fs = require('fs');
// npm i jade

const jade = require('jade');



const app = express();
const port = 3000;

const router = express.Router();

//http://127.0.0.1:3000/about
router.route('/about').post((req, res) => {
    fs.readFile('./jade1.jade', 'utf-8', (err, data) => {
        if (!err) {
            const jd = jade.compile(data);
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(jd())// jade는 갈호를 붙여줘야 한다 ※규칙
        } else {
            console.log(err);
        }
    });
})



