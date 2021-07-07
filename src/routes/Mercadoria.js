const express = require("express");
const Router = express.Router();
const Mercadoria = require("../models/Mercadoria");
const autenticacao = require("../config/Autenticacao");
const sequelize = require("../config/database");
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const fs = require("fs")

Router.get("/", async (req, res) => {
    const mercadorias = await Mercadoria.findAll();
    res.json({ success: true, mercadorias: mercadorias })
})

Router.get('/busca/:nome/:token', autenticacao, async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findAll({ where: { nome: { [Op.like]: req.params.nome + '%' } } });
        res.json({ mercadorias: mercadoria, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
})

Router.get("/porid", async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findOne({ where: { id: req.query.id } });
        if (mercadoria) {
            res.json({ sucess: true, mercadoria: mercadoria })
        } else {
            res.json({ success: false })
        }
    } catch (error) {
        res.json({ erro: error })
    }
})

Router.get("/porcodigo", async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findOne({ where: { codigoBarras: req.query.codigoBarras } });
        if (mercadoria) {
            res.json({ sucess: true, mercadoria: mercadoria })
        } else {
            res.json({ success: false })
        }
    } catch (error) {
        res.json({ erro: error })
    }
})

Router.get("/porcodigolike", async (req, res) => {
    try {
        const mercadoria = await Mercadoria.findAll({ where: { codigoBarras: { [Op.like]: req.query.codigoBarras + '%' } } })
        if (mercadoria) {
            res.json({ sucess: true, mercadoria: mercadoria })
        } else {
            res.json({ success: false })
        }
    } catch (error) {
        res.json({ erro: error })
    }
})

Router.get("/limite", async (req, res) => {
    const mercadorias = await sequelize.query("SELECT * FROM mercadorias LIMIT 10 OFFSET " + req.query.pulos);
    res.json({ mercadorias: mercadorias })
})

Router.post("/", autenticacao, async (req, res) => {
    const isMercadoria = await Mercadoria.findOne({ where: { codigoBarras: req.body.codigoBarras } })

    if (!isMercadoria) {
        try {
            if (req.file) {
                const mercadoria = await Mercadoria.create({ nome: req.body.nome, precoCompra: req.body.precoCompra, precoVenda: req.body.precoVenda, nomeImg: req.file.filename, codigoBarras: req.body.codigoBarras });
                if (mercadoria) {
                    res.json({ success: true, mercadoria: mercadoria })
                } else {
                    res.json({ success: false })
                }
            } else {
                const mercadoria = await Mercadoria.create({ nome: req.body.nome, precoCompra: req.body.precoCompra, precoVenda: req.body.precoVenda, codigoBarras: req.body.codigoBarras });
                if (mercadoria) {
                    res.json({ success: true, mercadoria: mercadoria })
                } else {
                    res.json({ success: false })
                }
            }
        } catch (error) {
            res.json({ erro: error.message })
        }
    } else {
        res.json({ success: false, message: "Produto ja cadastrado" })
    }


})

Router.post("/Addphoto", upload.single("img"), async (req, res) => {
    console.log(req.file)
})

Router.post("/alterarItem", upload.single("img"), async (req, res) => {
    if (req.file) {
        const mercadoria = await Mercadoria.findOne({ where: { id: req.body.id } });
        if (mercadoria) {
            if (mercadoria.nomeImg) {
                fs.unlinkSync("uploads/" + mercadoria.nomeImg)
            }
            const mercadoriaUpdate = await mercadoria.update({
                nome: req.body.nome,
                precoCompra: req.body.precoCompra,
                precoVenda: req.body.precoVenda,
                nomeImg: req.file.filename
            })
            if (mercadoriaUpdate) {
                res.json({ success: true, message: "Item alterado com sucesso" })
            } else {
                res.json({ success: false })
            }
        }

    } else {
        const mercadoria = await Mercadoria.findOne({ where: { id: req.body.id } });
        if (mercadoria) {
            const mercadoriaUpdate = await mercadoria.update({
                nome: req.body.nome,
                precoCompra: req.body.precoCompra,
                precoVenda: req.body.precoVenda,
                nomeImg: req.body.nomeImg
            })
            if (mercadoriaUpdate) {
                res.json({ success: true, message: "Item alterado com sucesso" })
            } else {
                res.json({ success: false })
            }
        }

    }
})

Router.delete("/:id", async (req, res) => {
    const mercadoria = await Mercadoria.findOne({ where: { id: req.params.id } });
    if (mercadoria) {
        if (mercadoria.nomeImg) {
            fs.unlinkSync("uploads/" + mercadoria.nomeImg)
        }
        const deleteMercadoria = await Mercadoria.destroy({ where: { id: req.params.id } });
        if (deleteMercadoria) {
            res.json({ success: true, message: "Item deletado com successo" });
        } else {
            res.json({ success: false })
        }
    } else {
        res.json({ success: false, message: "Item nao encontrado" })
    }
})

module.exports = Router;
