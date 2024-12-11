const express = require('express');
const login = require('../controllers/LoginController');
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Faz o login do usuário com o e-mail e senha fornecidos.
 *     operationId: loginUsuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login realizado com sucesso!"
 *       401:
 *         description: E-mail ou senha inválidos.
 *       500:
 *         description: Erro ao realizar login.
 */
router.post('/', login.login);

/**
 * @swagger
 * /login/enviaCodigo:
 *   post:
 *     summary: Envia código de reset de senha para o e-mail
 *     description: Envia um código de verificação para o e-mail fornecido para permitir a redefinição de senha.
 *     operationId: enviarCodigoReset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *     responses:
 *       200:
 *         description: Código enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Código enviado com sucesso!"
 *       404:
 *         description: E-mail não encontrado.
 *       500:
 *         description: Erro ao enviar código de reset.
 */
router.post('/enviaCodigo', login.enviarEmail);

/**
 * @swagger
 * /login/validaCodigo:
 *   post:
 *     summary: Valida o código de reset de senha
 *     description: Valida o código de verificação enviado para o e-mail para permitir a redefinição de senha.
 *     operationId: validarCodigoReset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               codigo:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Código válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Código válido!"
 *       400:
 *         description: Código inválido.
 *       500:
 *         description: Erro ao validar código.
 */
router.post('/validaCodigo', login.confirmarCodigo);

/**
 * @swagger
 * /login/atualizaSenha:
 *   post:
 *     summary: Atualiza a senha do usuário
 *     description: Atualiza a senha do usuário com o novo valor fornecido.
 *     operationId: atualizarSenhaUsuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               novaSenha:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Senha atualizada com sucesso!"
 *       500:
 *         description: Erro ao atualizar senha.
 */
router.post('/atualizaSenha', login.atualizaSenha);

module.exports = router;
