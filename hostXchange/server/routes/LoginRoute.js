const express = require('express');
const login = require('../controllers/LoginController');
const router = express.Router();

/**
 * @swagger
 * paths:
 *   /login:
 *     post:
 *       summary: Realiza o login do usuário.
 *       description: Endpoint para autenticar um usuário através do e-mail e senha.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário.
 *                   example: "usuario@example.com"
 *                 senha:
 *                   type: string
 *                   description: Senha do usuário.
 *                   example: "senha123"
 *       responses:
 *         '200':
 *           description: Login realizado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "Login bem-sucedido!"
 *         '401':
 *           description: E-mail ou senha inválidos.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "E-mail ou senha inválidos!"
 */
router.post('/', login.login);

/**
 * @swagger
 * paths:
 *   /login/enviaCodigo:
 *     post:
 *       summary: Envia o código de reset de senha para o e-mail do usuário.
 *       description: Endpoint para enviar um código de reset de senha para o e-mail do usuário.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário para o qual o código de reset será enviado.
 *                   example: "usuario@example.com"
 *       responses:
 *         '200':
 *           description: Código de reset enviado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "Código de reset enviado com sucesso!"
 *         '404':
 *           description: E-mail não encontrado.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "E-mail não encontrado!"
 */
router.post('/enviaCodigo', login.enviarEmail);

/**
 * @swagger
 * paths:
 *   /login/validaCodigo:
 *     post:
 *       summary: Valida o código de reset de senha.
 *       description: Endpoint para validar o código de reset enviado para o e-mail do usuário.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário que está tentando validar o código.
 *                   example: "usuario@example.com"
 *                 codigo:
 *                   type: string
 *                   description: Código de reset que o usuário recebeu por e-mail.
 *                   example: "123456"
 *       responses:
 *         '200':
 *           description: Código validado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "Código validado com sucesso!"
 *         '400':
 *           description: Código inválido ou expirado.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Código inválido ou expirado!"
 */
router.post('/validaCodigo', login.confirmarCodigo);

/**
 * @swagger
 * paths:
 *   /login/atualizaSenha:
 *     post:
 *       summary: Atualiza a senha do usuário.
 *       description: Endpoint para atualizar a senha do usuário após a validação do código.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário.
 *                   example: "usuario@example.com"
 *                 novaSenha:
 *                   type: string
 *                   description: Nova senha do usuário.
 *                   example: "novaSenha123"
 *                 codigo:
 *                   type: string
 *                   description: Código de reset enviado para o e-mail.
 *                   example: "123456"
 *       responses:
 *         '200':
 *           description: Senha atualizada com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "Senha atualizada com sucesso!"
 *         '400':
 *           description: Código inválido ou expirado.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Código inválido ou expirado!"
 */
router.post('/atualizaSenha', login.atualizaSenha);

module.exports = router;
