const express = require('express');
const knex = require('./db');

const app = express();

app.get('/list', (req, res) => {
    knex("pessoa").select().then((ret) => res.send(ret).status(200));
});

app.get('/save', (req, res) => {
    let pessoa = { nome_pessoa: req.query.nome_pessoa, telefone_pessoa: req.query.telefone_pessoa }
    knex("pessoa").insert(pessoa, 'id_pessoa')
        .then((ret) => {
            pessoa.id_pessoa = ret[0];
            console.log(pessoa);
            res.send("Salvo com sucesso!!\n Id:" + pessoa.id_pessoa).status(200);
        }).catch((err) => {
            console.log(err);
            res.send().status(500);
        });
});

knex.migrate.latest();

module.exports = app;