
const express = require("express");
const Router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

Router.post("/", async (req, res) => {
    const adminCheck = await Admin.findOne({ where: { usuario: req.body.usuario } });
    if (!adminCheck) {
        const hash = bcrypt.hashSync(req.body.senha, 8);
        const createAdmin = await Admin.create({ usuario: req.body.usuario, senha: hash, nome: req.body.nome });
        if (createAdmin) {
            res.json({ success: true, admin: createAdmin })
        } else {
            res.json({ success: false })
        }
    } else {
        res.json({ success: false, message: "Administrador ja cadastrado" })
    }
})

Router.get("/", async (req, res) => {
    const admins = await Admin.findAll();
    res.json({ success: true, admins: admins })
})

Router.get("/:id", async (req, res) => {
    const admin = await Admin.findOne({ where: { id: req.params.id } })
    res.json({ success: true, admin: admin })
})

module.exports = Router;