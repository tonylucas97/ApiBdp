
const express = require("express");
const Router = express.Router();
const Nota = require("../models/Nota");
const sequelize = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const pdf = require('html-pdf');
const autenticacao = require("../config/Autenticacao");

Router.get("/limite", autenticacao, async (req, res) => {
    const notas = await sequelize.query("SELECT * FROM notas LIMIT 10 OFFSET " + req.query.pulos);
    res.json({ notas: notas })
})

Router.get("/porid", autenticacao, async (req, res) => {
    const nota = await Nota.findOne({ where: { id: req.query.id } });
    if (nota) {
        res.json({ success: true, nota: nota })
    } else {
        res.json({ success: false })
    }
})

Router.get('/:datainicial/:datafinal/:token', autenticacao, async (req, res) => {
    try {
        const notas = await Nota.findAll({ where: { data: { [Op.between]: [req.params.datainicial, req.params.datafinal] } }, order: [["data", "DESC"]] })
        res.json({ success: true, notas: notas })
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

Router.post("/pdf", autenticacao, (req, res) => {
    const documentHtml = req.body.corpo;
    pdf.create(documentHtml, {}).toFile("./uploads/pdfnota.pdf", (err, res) => {
        if (err) {

        }
    })
    res.json({ success: true });
})

Router.get("/pordata", autenticacao, async (req, res) => {
    try {
        const notas = await Nota.findAll({ where: { data: { [Op.between]: [req.query.datainicial, req.query.datafinal] } }, order: [["data", "DESC"]] })
        res.json({ success: true, notas: notas })
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

Router.post("/", autenticacao, async (req, res) => {
    try {
        const nota = await Nota.create({
            subtotal: req.body.subtotal,
            cliente: req.body.cliente,
            adminId: req.body.adminId,
            metodoPagamento: req.body.metodoPagamento,
            descontoPorcento: req.body.descontoPorcentagem
        });
        res.json({ success: true, nota: nota });
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

module.exports = Router;