const mapaDAO = require('../dao/MapaDAO');

/**
 * @swagger
 * /lista-intercambio:
 *   get:
 *     summary: Buscar lista de intercâmbios
 *     description: Retorna a lista de intercâmbios disponíveis.
 *     operationId: listaIntercambio
 *     responses:
 *       200:
 *         description: Lista de intercâmbios encontrada com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro ao buscar intercâmbios.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao buscar intercâmbio!'
 */
const listaIntercambio = async (req, res) => {
    try {
        const result = await mapaDAO.listaIntercambio();
        if (result.blOk) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        console.error('Erro ao buscar intercâmbio:', error);
        res.status(500).json({ blOk: false, message: 'Erro ao buscar intercâmbio!' });
    }
};

module.exports = { listaIntercambio };
