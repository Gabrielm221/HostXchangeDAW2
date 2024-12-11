const express = require('express');
const intercambios = require('../controllers/IntercambiosController');
const intercambiosdao = require('../dao/IntercambiosDAO');
const router = express.Router();

/**
 * @swagger
 * /intercambios/buscar:
 *   get:
 *     summary: Buscar todos os intercâmbios.
 *     description: Este endpoint retorna todos os intercâmbios disponíveis no sistema, incluindo informações do host e avaliações.
 *     responses:
 *       200:
 *         description: Lista de intercâmbios encontrados.
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do intercâmbio.
 *                       titulo:
 *                         type: string
 *                         description: Título do intercâmbio.
 *                       descricao:
 *                         type: string
 *                         description: Descrição do intercâmbio.
 *                       avaliacao:
 *                         type: number
 *                         description: Média de avaliação do host.
 *                       cidade:
 *                         type: string
 *                         description: Cidade do intercâmbio.
 *                       estado:
 *                         type: string
 *                         description: Estado do intercâmbio.
 *                       latitude:
 *                         type: number
 *                         description: Latitude do intercâmbio.
 *                       longitude:
 *                         type: number
 *                         description: Longitude do intercâmbio.
 *       500:
 *         description: Erro ao buscar intercâmbios.
 */
router.get('/buscar', intercambios.buscar);

/**
 * @swagger
 * /intercambios/cadastrar:
 *   post:
 *     summary: Cadastrar um novo intercâmbio.
 *     description: Este endpoint permite cadastrar um novo intercâmbio no sistema, incluindo informações sobre o local, título, descrição e imagens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do intercâmbio.
 *               descricao:
 *                 type: string
 *                 description: Descrição detalhada do intercâmbio.
 *               servicos:
 *                 type: string
 *                 description: Serviços oferecidos durante o intercâmbio.
 *               beneficios:
 *                 type: string
 *                 description: Benefícios para o viajante durante o intercâmbio.
 *               duracao:
 *                 type: string
 *                 description: Duração do intercâmbio.
 *               idhost:
 *                 type: integer
 *                 description: ID do host responsável pelo intercâmbio.
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Caminho da imagem do intercâmbio.
 *     responses:
 *       200:
 *         description: Intercâmbio cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idinterc:
 *                   type: integer
 *                   description: ID do intercâmbio recém-cadastrado.
 *       400:
 *         description: Erro ao cadastrar intercâmbio.
 */
router.post('/cadastrar', intercambios.cadastrar);

/**
 * @swagger
 * /intercambios/buscarId:
 *   post:
 *     summary: Buscar um intercâmbio por ID.
 *     description: Este endpoint retorna as informações detalhadas de um intercâmbio específico com base no ID fornecido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do intercâmbio.
 *     responses:
 *       200:
 *         description: Detalhes do intercâmbio encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idinterc:
 *                   type: integer
 *                   description: ID do intercâmbio.
 *                 titulo:
 *                   type: string
 *                   description: Título do intercâmbio.
 *                 descricao:
 *                   type: string
 *                   description: Descrição do intercâmbio.
 *       404:
 *         description: Intercâmbio não encontrado.
 */
router.post('/buscarId', intercambios.buscarPorId);

/**
 * @swagger
 * /intercambios/buscarIntercambio:
 *   post:
 *     summary: Buscar um intercâmbio por ID (via DAO).
 *     description: Este endpoint permite buscar um intercâmbio específico através do DAO, utilizando o ID fornecido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do intercâmbio.
 *     responses:
 *       200:
 *         description: Detalhes do intercâmbio encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idinterc:
 *                   type: integer
 *                   description: ID do intercâmbio.
 *                 titulo:
 *                   type: string
 *                   description: Título do intercâmbio.
 *                 descricao:
 *                   type: string
 *                   description: Descrição do intercâmbio.
 *       404:
 *         description: Intercâmbio não encontrado.
 */
router.post('/buscarIntercambio', intercambiosdao.getIntercambioById);

module.exports = router;
