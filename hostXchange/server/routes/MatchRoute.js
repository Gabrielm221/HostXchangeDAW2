const express = require('express');
const router = express.Router();
const matchController = require('../controllers/MatchController');

/**
 * @swagger
 * /match/criarMatch:
 *   post:
 *     summary: Cria um vínculo (match) entre um viajante e um intercâmbio
 *     description: Cria um vínculo (match) entre o usuário viajante e o intercâmbio especificado, com base nos seus IDs.
 *     operationId: criarMatch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idviajante:
 *                 type: integer
 *                 description: ID do usuário viajante
 *                 example: 123
 *               idinterc:
 *                 type: integer
 *                 description: ID do intercâmbio ao qual o viajante deseja se vincular
 *                 example: 456
 *     responses:
 *       200:
 *         description: Match criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 match:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     idviajante:
 *                       type: integer
 *                       example: 123
 *                     idinterc:
 *                       type: integer
 *                       example: 456
 *       400:
 *         description: Requisição inválida, parâmetros ausentes ou incorretos.
 *       500:
 *         description: Erro ao criar o vínculo (match).
 */
router.post('/criarMatch', matchController.criarMatch);

module.exports = router;
