const express = require('express');

const app = express();

app.use((requete, response, next) =>{
    console.log('requete recu')
    next();
});

app.use((req, res, next) =>{
    res.status(201);
next();
});

app.use((requete, response, next) =>{
    response.json({
        message: 'bien recu !'
    });
    next();
});

app.use((req, res) =>{
    console.log('envoyé avec succés')
});

module.exports = app;