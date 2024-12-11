const express = require('express');
const intercambios = require('../controllers/IntercambiosController');
const intercambiosdao = require('../dao/IntercambiosDAO');
const router = express.Router();

/**
 * @swagger
 * /intercambios/buscar:
 *   get:
 *     summary: Buscar todos os intercâmbios
 *     description: Retorna uma lista de todos os intercâmbios cadastrados.
 *     operationId: buscarIntercambios
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
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Intercâmbios encontrados com sucesso!"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       titulo:
 *                         type: string
 *                         example: "Intercâmbio para Londres"
 *                       descricao:
 *                         type: string
 *                         example: "Oportunidade para estudar inglês em Londres."
 *       500:
 *         description: Erro ao buscar intercâmbios.
 */
router.get('/buscar', intercambios.buscar);

/**
 * @swagger
 * /intercambios/cadastrar:
 *   post:
 *     summary: Cadastrar um novo intercâmbio
 *     description: Cria um novo intercâmbio com as informações fornecidas.
 *     operationId: cadastrarIntercambio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Estudo em Paris"
 *               descricao:
 *                 type: string
 *                 example: "Curso de francês para iniciantes em Paris."
 *               servicos:
 *                 type: string
 *                 example: "Aulas de francês, alimentação inclusa."
 *               beneficios:
 *                 type: string
 *                 example: "Certificado de conclusão."
 *               duracao:
 *                 type: string
 *                 example: "6 meses"
 *               idhost:
 *                 type: integer
 *                 example: 2
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     path:
 *                       type: string
 *                       example: "/images/intercambio1.jpg"
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
 *                   example: 10
 *       500:
 *         description: Erro ao cadastrar intercâmbio.
 */
router.post('/cadastrar', intercambios.cadastrar);

/**
 * @swagger
 * /intercambios/buscarId:
 *   post:
 *     summary: Buscar intercâmbio por ID
 *     description: Retorna os detalhes de um intercâmbio com base no ID fornecido.
 *     operationId: buscarIntercambioPorId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 10
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
 *                   example: 10
 *                 titulo:
 *                   type: string
 *                   example: "Estudo em Paris"
 *                 descricao:
 *                   type: string
 *                   example: "Curso de francês para iniciantes."
 *                 servicos:
 *                   type: string
 *                   example: "Aulas de francês"
 *                 beneficios:
 *                   type: string
 *                   example: "Certificado de conclusão"
 *       404:
 *         description: Intercâmbio não encontrado.
 *       500:
 *         description: Erro ao buscar intercâmbio por ID.
 */
router.post('/buscarId', intercambios.buscarPorId);

/**
 * @swagger
 * /intercambios/buscarIntercambio:
 *   post:
 *     summary: Buscar intercâmbio por ID usando DAO
 *     description: Retorna os detalhes de um intercâmbio com base no ID usando a camada de DAO.
 *     operationId: buscarIntercambioDao
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 10
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
 *                   example: 10
 *                 titulo:
 *                   type: string
 *                   example: "Estudo em Paris"
 *                 descricao:
 *                   type: string
 *                   example: "Curso de francês para iniciantes."
 *                 servicos:
 *                   type: string
 *                   example: "Aulas de francês"
 *       404:
 *         description: Intercâmbio não encontrado.
 *       500:
 *         description: Erro ao buscar intercâmbio.
 */
router.post('/buscarIntercambio', intercambiosdao.getIntercambioById);

module.exports = router;
