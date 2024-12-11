const express = require('express');
const cadastros = require('../controllers/CadastroController');
const router = express.Router();

/**
 * @swagger
 * /cadastros/cadastroUsuario:
 *   post:
 *     summary: Cadastro de usuário
 *     description: Cria um novo usuário com as informações fornecidas, incluindo dados pessoais e de contato.
 *     operationId: cadastroUsuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@email.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *               rg:
 *                 type: string
 *                 example: "MG1234567"
 *               sexo:
 *                 type: string
 *                 example: "M"
 *               passaporte:
 *                 type: string
 *                 example: "AB1234567"
 *               nacionalidade:
 *                 type: string
 *                 example: "Brasileiro"
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Usuário cadastrado com sucesso!"
 *       400:
 *         description: Dados inválidos ou ausentes.
 *       500:
 *         description: Erro ao cadastrar usuário.
 */
router.post('/cadastroUsuario', cadastros.cadastroUsuario);

/**
 * @swagger
 * /cadastros/tornaHost:
 *   post:
 *     summary: Tornar usuário um host
 *     description: Transforma um usuário comum em host, vinculando-o a uma propriedade registrada.
 *     operationId: tornaHost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: integer
 *                 example: 1
 *               idHost:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Usuário transformado em host com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Seu perfil foi atualizado para Host!"
 *       400:
 *         description: Dados inválidos ou ausentes.
 *       404:
 *         description: Usuário ou Host não encontrado.
 *       500:
 *         description: Erro ao transformar o usuário em host.
 */
router.post('/tornaHost', cadastros.cadastroHost);

module.exports = router;
