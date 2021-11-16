    const express = require('express');
    const app = express();
    require('dotenv').config();
    const bodyParser = require('body-parser');

    const messageStyle = process.env.MESSAGE_STYLE;

    app.use('/public', express.static(__dirname + "/public"));
    console.log(`Hello World`);

    app.use(bodyParser.urlencoded({extended: false}))

    app.use((req, res, next) => {
        const method = req.method;
        const path = req.path;
        const ip = req.ip;
        console.log(`${method} ${path} - ${ip}`);
        next();
    })

    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/views/index.html");
    })

    app.get('/json', (req, res) => {
        const message = "Hello json";
        if(messageStyle==="uppercase") {
            res.json({ "message": message.toUpperCase()});
            return;
        }
        res.json({"message": message.toLowerCase()});
    })

    app.get('/now', (req, res, next) => {
        const time = new Date().toString();
        req.time = time;
        next();
    }, (req, res) => {
        res.json({time: req.time});
    })

    app.get('/:word/echo', (req, res) => {
        const word = req.params.word;
        res.send({echo: word});
    })

    app.route('/name')
        .all((req, res, next) => {
            next();
        })
        .get((req, res) => {
            const firstName = req.query.first;
            const lastName = req.query.last;
            const fullName = `${firstName} ${lastName}`;
            res.send({ name: fullName });
        })
        .post((req, res) => {
            const firstName = req.body.first;
            const lastName = req.body.last;
            const fullName = `${firstName} ${lastName}`;
            res.send({name: fullName});
        })





































    module.exports = app;
