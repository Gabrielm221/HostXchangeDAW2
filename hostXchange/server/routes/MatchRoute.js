const express = require('express');
const router = express.Router();
const matchController = require('../controllers/MatchController');

/**
 * @swagger
 * paths:
 *   /match/criarMatch:
 *     post:
 *       summary: Cria um vínculo (match) entre um viajante e um intercâmbio.
 *       description: Endpoint para criar um match entre um viajante e um intercâmbio. O vínculo é estabelecido para que o viajante possa interagir com o intercâmbio.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idviajante:
 *                   type: integer
 *                   description: ID do viajante que está criando o match.
 *                   example: 1
 *                 idinterc:
 *                   type: integer
 *                   description: ID do intercâmbio com o qual o match está sendo feito.
 *                   example: 101
 *       responses:
 *         '200':
 *           description: Match criado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   match:
 *                     type: object
 *                     properties:
 *                       idmatch:
 *                         type: integer
 *                         example: 1
 *                       idviajante:
 *                         type: integer
 *                         example: 1
 *                       idinterc:
 *                         type: integer
 *                         example: 101
 *         '500':
 *           description: Erro ao criar vínculo (match).
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
 *                     example: "Erro ao criar vínculo (match)."
 */
router.post('/criarMatch', matchController.criarMatch);

module.exports = router;
