const express = require('express');
const mapa = require('../controllers/MapaController');
const router = express.Router();

/**
 * @swagger
 * /mapa/listar:
 *   post:
 *     summary: Lista os intercâmbios com informações do host
 *     description: Retorna uma lista de intercâmbios com detalhes sobre o host, como localização, cidade, estado e média de avaliação.
 *     operationId: listarIntercambios
 *     responses:
 *       200:
 *         description: Lista de intercâmbios com sucesso.
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
 *                   example: "Intercâmbios listados com sucesso!"
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
 *                         example: "Intercâmbio de 6 meses em Paris"
 *                       descricao:
 *                         type: string
 *                         example: "Experiência incrível em Paris com moradia e suporte!"
 *                       latitude:
 *                         type: number
 *                         format: float
 *                         example: 48.8566
 *                       longitude:
 *                         type: number
 *                         format: float
 *                         example: 2.3522
 *                       cidade:
 *                         type: string
 *                         example: "Paris"
 *                       estado:
 *                         type: string
 *                         example: "Île-de-France"
 *                       avaliacao:
 *                         type: string
 *                         example: "4.5"
 *       500:
 *         description: Erro ao listar intercâmbios.
 */
router.post('/listar', mapa.listaIntercambio);

module.exports = router;
