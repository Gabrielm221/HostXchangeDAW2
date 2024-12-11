const express = require('express');
const mapa = require('../controllers/MapaController');
const router = express.Router();

/**
 * @swagger
 * paths:
 *   /mapa/listar:
 *     post:
 *       summary: Lista intercâmbios para exibição no mapa.
 *       description: Endpoint que retorna uma lista de intercâmbios com informações de localização para exibição no mapa.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filtro:
 *                   type: string
 *                   description: Filtro opcional para buscar intercâmbios específicos.
 *                   example: "cidade=São Paulo"
 *       responses:
 *         '200':
 *           description: Lista de intercâmbios com sucesso.
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
 *                     example: "Intercâmbios listados com sucesso!"
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         titulo:
 *                           type: string
 *                           example: "Intercâmbio em São Paulo"
 *                         latitude:
 *                           type: number
 *                           format: float
 *                           example: -23.550520
 *                         longitude:
 *                           type: number
 *                           format: float
 *                           example: -46.633308
 *                         cidade:
 *                           type: string
 *                           example: "São Paulo"
 *                         estado:
 *                           type: string
 *                           example: "SP"
 *         '500':
 *           description: Erro ao listar os intercâmbios.
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
 *                     example: "Erro ao listar intercâmbios!"
 */
router.post('/listar', mapa.listaIntercambio);

module.exports = router;
