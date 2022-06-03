const express = require('express');
const router = express.Router();
const Product = require('../models/Produto');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET = 'secretkey'
const validate = require('../middleware/auth');

router.get('/', (req, res) => {
    return res.status(200).json({Status: 'API funcionando'});
});

router.get('/usuarios/:id?', async (req, res) => {
    var user;
    if(typeof req.params.id === 'undefined') {
        user = await User.findAll();   
    } else {
        user = await User.findAll(
            {
                attributes: ['name', 'biografia'],
                where: {
                id: req.params.id
            }
        });
    }
    return res.status(200).json(user);
});

router.get('/produtos/:id?', async (req, res) => {
    var product;
    if(typeof req.params.id === 'undefined') {
        product = await Product.findAll();
    } else {
        product = await Product.findAll(
            {
                atributes: ['nome, preco'],
                where: {
                    id: req.params.id
                }
            }
        );
    }
    return res.status(200).json(product);
});

router.post('/produtos/novo', validate, async (req, res) => {
    const {nome, preco, status} = req.body;
    if(typeof nome === 'undefined' || typeof preco === 'undefined' || typeof status === 'undefined') {
        return res.status(400).json({message: 'Alguns campos nao foram informados'});
    }
    await Product.create({nome, preco, status});
    return res.status(201).json({message: 'Produto cadastrado com sucesso'});
});

router.post('/criarUsuario', validate, async (req, res) => {
    const {name,email,cpf,avatar,biografia,senha} = req.body;
    const user = await User.create({name, email, cpf, avatar, biografia, senha});

    return res.status(201).json({message: 'Usuario cadastrado com sucesso'});
})

router.post('/auth', async (req, res) => {
    const {name, email} =req.body;
    const user = await User.findOne({where: {email: email}});
    if(user) {
        const token = jwt.sign(
            {email},
            SECRET,
            {expiresIn: '1h'},
        );
        return res.status(200).send({usuario: name, email: email, token: token});
    }
    return res.status(401).json({message: 'Usuario inexistente'});

});

router.put('/produtos/update/:id', validate, async (req, res) => {
    const {nome, preco, status} = req.body;
    if(typeof nome === 'undefined' || typeof preco === 'undefined' || typeof status === 'undefined') {
        return res.status(400).json({message: 'Alguns campos nao foram informados'});
    }
    await Product.update(
        {
            nome: nome, 
            preco: preco, 
            status: status
        },
        {
            where: {
                id: req.params.id
            } 
        }
    );
    return res.status(201).json({message: 'Produto atualizado com sucesso'});
});

router.patch('/produtos/update/:id', validate, async (req, res) => {
    const {nome, preco} = req.body;
    if(typeof nome === 'undefined' || typeof preco === 'undefined') {
        return res.status(400).json({message: 'Alguns campos nao foram informados'});
    }
    await Product.update(
        {
            nome: nome, 
            preco: preco, 
        },
        {
            where: {
                id: req.params.id
            } 
        }
    );
    return res.status(201).json({message: 'Produto atualizado com sucesso'});
});

router.delete('/produtos/delete/:id', validate, async (req, res) => {
    console.log(req.params.id);
    await Product.destroy({where: {
        id: req.params.id
    }});

    return res.status(204).json({message: 'Produto deletado com sucesso'});
}); 


module.exports = router;