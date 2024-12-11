const express = require('express');
const perfil = require('../controllers/PerfilController');
const router = express.Router();

/**
 * @swagger
 * /perfil/listaPerfil:
 *   post:
 *     summary: Obtém o perfil de um usuário
 *     description: Retorna as informações do perfil de um usuário com base no seu ID.
 *     operationId: listaPerfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID do usuário para buscar o perfil
 *                 example: 123
 *     responses:
 *       200:
 *         description: Perfil do usuário encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blOk:
 *                   type: boolean
 *                   example: true
 *                 dados:
 *                   type: object
 *                   properties:
 *                     idusuario:
 *                       type: integer
 *                       example: 123
 *                     nome:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "joao.silva@example.com"
 *                     stusuario:
 *                       type: string
 *                       example: "A"
 *                     tpusuario:
 *                       type: string
 *                       example: "V"
 *       400:
 *         description: Requisição inválida, ID do usuário ausente ou incorreto.
 *       500:
 *         description: Erro ao obter perfil do usuário.
 */

/**
 * @swagger
 * /perfil/atualizarPerfil:
 *   post:
 *     summary: Atualiza o perfil de um usuário
 *     description: Atualiza as informações do perfil de um usuário com base no seu ID e nas novas informações fornecidas.
 *     operationId: atualizarPerfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID do usuário a ser atualizado
 *                 example: 123
 *               data:
 *                 type: object
 *                 description: Dados a serem atualizados (como nome, email, etc.)
 *                 example:
 *                   nome: "João Silva"
 *                   email: "novoemail@example.com"
 *                   senha: "novaSenha123"
 *     responses:
 *       200:
 *         description: Perfil do usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blOk:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Perfil atualizado!"
 *       400:
 *         description: Requisição inválida, dados ausentes ou incorretos.
 *       500:
 *         description: Erro ao atualizar o perfil do usuário.
 */
router.post('/listaPerfil'    , perfil.perfil         );
router.post('/atualizarPerfil', perfil.atualizarPerfil);

module.exports = router;
