const matchDao = require('../dao/MatchDAO');

/**
 * @swagger
 * /criar-match:
 *   post:
 *     summary: Criar um vínculo (match) entre um viajante e um intercâmbio
 *     description: Cria um vínculo (match) entre um usuário (viajante) e um intercâmbio existente, além de criar avaliações padrão para ambos.
 *     operationId: criarMatch
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados para criar o match entre o viajante e o intercâmbio.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idviajante:
 *               type: string
 *               description: ID do viajante.
 *               example: "12345"
 *             idinterc:
 *               type: string
 *               description: ID do intercâmbio.
 *               example: "67890"
 *     responses:
 *       201:
 *         description: Vínculo (match) criado com sucesso e avaliações padrão criadas.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Match criado com sucesso!'
 *       404:
 *         description: Usuário ou intercâmbio não encontrado.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Usuário não encontrado.'
 *       500:
 *         description: Erro ao criar vínculo e avaliações.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao criar vínculo e avaliações.'
 */
const criarMatch = async (req, res) => {
  const { idviajante, idinterc } = req.body;

  try {
    // Verifica se o usuário existe
    const usuario = await matchDao.buscarUsuario(idviajante);
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    // Verifica se o intercâmbio existe e recupera o host
    const intercambio = await matchDao.buscarIntercambio(idinterc);
    if (!intercambio) {
      return res.status(404).json({ success: false, message: 'Intercâmbio não encontrado.' });
    }

    const idhost = intercambio.idhost;

    // Cria o vínculo (Match)
    const result = await matchDao.criarMatch(idviajante, idinterc);

    // Cria avaliações padrão
    const avaliacaoViajante = await matchDao.criarAvaliacao({
      avaliadoId: idhost,
      avaliadorId: idviajante,
      avaliacao: 0,
      descricao: '',
      snaval: false
    });

    const avaliacaoHost = await matchDao.criarAvaliacao({
      avaliadoId: idviajante,
      avaliadorId: idhost,
      avaliacao: 0, 
      descricao: '',
      snaval: false 
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao criar vínculo e avaliações:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar vínculo e avaliações.' });
  }
};

module.exports = { criarMatch };
