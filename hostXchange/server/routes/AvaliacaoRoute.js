const express = require('express');
const avaliacao = require('../controllers/AvaliacaoController');
const router = express.Router();

/**
 * @swagger
 * /avaliacao/criaAvaliacao:
 *   post:
 *     summary: Criar uma nova avaliação.
 *     description: Este endpoint permite criar uma nova avaliação para um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avaliadoId:
 *                 type: integer
 *                 description: ID do usuário que está sendo avaliado.
 *               avaliadorId:
 *                 type: integer
 *                 description: ID do usuário que está realizando a avaliação.
 *               avaliacao:
 *                 type: integer
 *                 description: Nota de avaliação (por exemplo, 1-5).
 *               descricao:
 *                 type: string
 *                 description: Descrição da avaliação (opcional).
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
 *                   description: Indicador de sucesso.
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *                 idavaliacao:
 *                   type: integer
 *                   description: ID da avaliação criada.
 *       400:
 *         description: Erro ao criar avaliação.
 */
router.post('/criaAvaliacao', avaliacao.criaAvaliacao);

/**
 * @swagger
 * /avaliacao/listaAvaliacoes:
 *   post:
 *     summary: Listar todas as avaliações de um usuário.
 *     description: Este endpoint permite listar todas as avaliações feitas para ou por um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idusuario:
 *                 type: integer
 *                 description: ID do usuário para listar suas avaliações.
 *     responses:
 *       200:
 *         description: Avaliações listadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blOk:
 *                   type: boolean
 *                   description: Indicador de sucesso.
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *                 avaliacoes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       avaliadoId:
 *                         type: integer
 *                         description: ID do usuário avaliado.
 *                       avaliadorId:
 *                         type: integer
 *                         description: ID do avaliador.
 *                       avaliacao:
 *                         type: integer
 *                         description: Nota dada pelo avaliador.
 *                       descricao:
 *                         type: string
 *                         description: Descrição da avaliação.
 *       400:
 *         description: Erro ao listar avaliações.
 */
router.post('/listaAvaliacoes', avaliacao.listaAvaliacoes);

/**
 * @swagger
 * /avaliacao/atualizaAvaliacao:
 *   post:
 *     summary: Atualizar uma avaliação existente.
 *     description: Este endpoint permite atualizar uma avaliação existente de um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idavaliacao:
 *                 type: integer
 *                 description: ID da avaliação a ser atualizada.
 *               avaliacao:
 *                 type: integer
 *                 description: Nota de avaliação atualizada.
 *               descricao:
 *                 type: string
 *                 description: Descrição atualizada da avaliação.
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
 *                   description: Indicador de sucesso.
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *       400:
 *         description: Erro ao atualizar avaliação.
 */
router.post('/atualizaAvaliacao', avaliacao.atualizaAvaliacao);

module.exports = router;
