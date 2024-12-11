const matchDao = require('../dao/MatchDAO');

/**
 * @swagger
 * /criar-match:
 *   post:
 *     summary: Cria um vínculo (match) entre um viajante e um intercâmbio
 *     description: Este endpoint cria um vínculo entre um viajante e um intercâmbio, verificando a existência do usuário e do intercâmbio antes de realizar a criação. Também cria avaliações padrão para ambos.
 *     requestBody:
 *       description: Dados necessários para criar o match entre o viajante e o intercâmbio.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idviajante:
 *                 type: integer
 *                 description: ID do viajante que está criando o match.
 *               idinterc:
 *                 type: integer
 *                 description: ID do intercâmbio para o qual o match está sendo criado.
 *     responses:
 *       201:
 *         description: Vínculo criado com sucesso entre o viajante e o intercâmbio, com avaliações padrão criadas.
 *       404:
 *         description: Usuário ou intercâmbio não encontrado.
 *       500:
 *         description: Erro ao criar vínculo ou avaliações.
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
