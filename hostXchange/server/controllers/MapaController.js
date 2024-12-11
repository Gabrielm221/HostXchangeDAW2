const mapaDAO = require('../dao/MapaDAO');

/**
 * @swagger
 * /lista-intercambio:
 *   get:
 *     summary: Lista todos os intercâmbios
 *     description: Recupera todos os intercâmbios disponíveis no sistema.
 *     responses:
 *       200:
 *         description: Lista de intercâmbios obtida com sucesso
 *       500:
 *         description: Erro ao recuperar intercâmbios
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
