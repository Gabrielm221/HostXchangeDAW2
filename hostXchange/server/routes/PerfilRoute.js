const express = require('express');
const perfil = require('../controllers/PerfilController');
const router = express.Router();

/**
 * @swagger
 * paths:
 *   /perfil/listaPerfil:
 *     post:
 *       summary: Obtém o perfil de um usuário.
 *       description: Endpoint para listar o perfil de um usuário específico, incluindo informações do host (se houver).
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: ID do usuário que deseja visualizar o perfil.
 *                   example: 1
 *       responses:
 *         '200':
 *           description: Perfil listado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   blOk:
 *                     type: boolean
 *                     example: true
 *                   dados:
 *                     type: object
 *                     properties:
 *                       idusuario:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: "João Silva"
 *                       email:
 *                         type: string
 *                         example: "joao@exemplo.com"
 *                       stusuario:
 *                         type: string
 *                         example: "A"
 *                       tpusuario:
 *                         type: string
 *                         example: "V"
 *                       contatoHost:
 *                         type: object
 *                         properties:
 *                           nmprop:
 *                             type: string
 *                             example: "Host do João"
 *                           endereco:
 *                             type: string
 *                             example: "Rua Exemplo, 123"
 *         '500':
 *           description: Erro ao listar perfil.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   blOk:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Erro ao buscar perfil."
 *   
 *   /perfil/atualizarPerfil:
 *     post:
 *       summary: Atualiza o perfil de um usuário.
 *       description: Endpoint para atualizar o perfil de um usuário. Permite alterar dados como nome, email, e outros atributos do perfil.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: ID do usuário que deseja atualizar o perfil.
 *                   example: 1
 *                 data:
 *                   type: object
 *                   description: Dados que serão atualizados no perfil.
 *                   example:
 *                     nome: "João Silva"
 *                     email: "joao.silva@novoemail.com"
 *       responses:
 *         '200':
 *           description: Perfil atualizado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   blOk:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "Perfil atualizado!"
 *         '500':
 *           description: Erro ao atualizar perfil.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   blOk:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Erro ao atualizar perfil."
 */
router.post('/listaPerfil', perfil.perfil);
router.post('/atualizarPerfil', perfil.atualizarPerfil);

module.exports = router;
