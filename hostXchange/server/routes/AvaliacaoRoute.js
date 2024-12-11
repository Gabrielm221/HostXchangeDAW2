const express = require('express');
const avaliacao = require('../controllers/AvaliacaoController');
const router = express.Router();

/**
 * @swagger
 * /avaliacoes/criaAvaliacao:
 *   post:
 *     summary: Criar uma nova avaliação
 *     description: Cria uma avaliação associando um avaliador e um avaliado, com a opção de definir uma avaliação inicial.
 *     operationId: criaAvaliacao
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avaliadoId:
 *                 type: integer
 *                 example: 1
 *               avaliadorId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Avaliação criada com sucesso.
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
 *                   example: "Avaliação feita com sucesso!"
 *       400:
 *         description: Dados inválidos ou ausentes.
 *       500:
 *         description: Erro ao criar avaliação.
 */
router.post('/criaAvaliacao', avaliacao.criaAvaliacao);

/**
 * @swagger
 * /avaliacoes/listaAvaliacoes:
 *   post:
 *     summary: Listar avaliações de um usuário
 *     description: Retorna todas as avaliações feitas sobre um usuário e as feitas por ele.
 *     operationId: listaAvaliacoes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idusuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Avaliações encontradas com sucesso.
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
 *                   example: "Avaliações encontradas!"
 *                 avaliacoes:
 *                   type: object
 *                   properties:
 *                     avaliado:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           avaliacao:
 *                             type: number
 *                             example: 5
 *                           descricao:
 *                             type: string
 *                             example: "Excelente!"
 *                     avaliador:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           avaliacao:
 *                             type: number
 *                             example: 4
 *                           descricao:
 *                             type: string
 *                             example: "Bom desempenho!"
 *       404:
 *         description: Nenhuma avaliação encontrada.
 *       500:
 *         description: Erro ao listar avaliações.
 */
router.post('/listaAvaliacoes', avaliacao.listaAvaliacoes);

/**
 * @swagger
 * /avaliacoes/atualizaAvaliacao:
 *   post:
 *     summary: Atualizar uma avaliação existente
 *     description: Atualiza a avaliação de um usuário, incluindo a descrição e o status da avaliação.
 *     operationId: atualizaAvaliacao
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idavaliacao:
 *                 type: integer
 *                 example: 1
 *               avaliacao:
 *                 type: integer
 *                 example: 5
 *               descricao:
 *                 type: string
 *                 example: "Avaliação excelente!"
 *               snaval:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso.
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
 *                   example: "Avaliação atualizada com sucesso!"
 *       400:
 *         description: Dados inválidos ou ausentes.
 *       404:
 *         description: Avaliação não encontrada.
 *       500:
 *         description: Erro ao atualizar avaliação.
 */
router.post('/atualizaAvaliacao', avaliacao.atualizaAvaliacao);

module.exports = router;
