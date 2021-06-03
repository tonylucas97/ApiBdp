
const express = require("express");
const Router = express.Router();
const Nota = require("../models/Nota");
const sequelize = require("../config/database");
const Sequelize = require("sequelize");
const Venda = require("../models/Venda");
const Op = Sequelize.Op;
const autenticacao = require("../config/Autenticacao");

Router.get("/porid",autenticacao,async (req,res) => {
    try {
        const vendas = await Venda.findAll({where:{notaId: req.query.id}})
        res.json({ success: true, vendas: vendas });
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

Router.post("/",autenticacao,async (req,res) => {
    try {
        const venda = await Venda.create({
            precoDia:req.body.precoDia,
            precoDesconto: req.body.precoDesconto,
            quantidade: req.body.quantidade,
            notaId:req.body.notaId,
            mercadoriaId:req.body.mercadoriaId
        })
        res.json({ success: true, venda: venda });
    } catch (error) {
        res.json({ success: false, erro: error.message })
    }
})

module.exports = Router;