// Importa o DAO de Avaliação para interagir com o banco de dados
const avaliacaoDAO = require('../dao/AvaliacaoDAO');

/**
 * @swagger
 * /avaliacao:
 *   post:
 *     summary: Cria uma nova avaliação
 *     description: Cria uma avaliação entre o usuário avaliado e o avaliador.
 *     parameters:
 *       - name: avaliado
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             avaliado:
 *               type: integer
 *               description: ID do usuário avaliado
 *             avaliador:
 *               type: integer
 *               description: ID do usuário avaliador
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       500:
 *         description: Erro ao salvar a avaliação
 */
const criaAvaliacao = async (req, res) => {
    const { avaliado, avaliador } = req.body;
    try {
        const result = await avaliacaoDAO.criaAvaliacao(avaliado, avaliador);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao salvar avaliação!' });
    }
}

/**
 * @swagger
 * /avaliacao/{idUser}:
 *   get:
 *     summary: Lista as avaliações de um usuário
 *     description: Retorna todas as avaliações de um usuário e calcula a média.
 *     parameters:
 *       - name: idUser
 *         in: body
 *         required: true
 *         type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de avaliações com a média calculada
 *       500:
 *         description: Erro ao listar as avaliações
 */
const listaAvaliacoes = async (req, res) => {
    const { idUser } = req.body;

    try {
        const result = await avaliacaoDAO.listaAvaliacoes(idUser);
        if (result.blOk === true) {
            const avaliacoesValidas = result.avaliacoes.avaliado.filter(m => m.snaval === true).map(m => m.avaliacao); 
            const media = avaliacoesValidas.length > 0
                ? avaliacoesValidas.reduce((soma, valor) => soma + valor, 0) / avaliacoesValidas.length
                : 0;
            result.avaliacoes.media = media;
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao listar avaliações:', error);
        res.status(500).json({ success: false, message: 'Erro ao listar avaliações!' });
    }
};

/**
 * @swagger
 * /avaliacao:
 *   put:
 *     summary: Atualiza uma avaliação existente
 *     description: Atualiza os detalhes de uma avaliação existente.
 *     parameters:
 *       - name: idavaliacao
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idavaliacao:
 *               type: integer
 *               description: ID da avaliação a ser atualizada
 *             avaliacao:
 *               type: integer
 *               description: Nova nota de avaliação
 *             descricao:
 *               type: string
 *               description: Descrição adicional para a avaliação
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a avaliação
 */
const atualizaAvaliacao = async (req, res) => {
    const { idavaliacao, avaliacao, descricao } = req.body;

    try {
        const result = await avaliacaoDAO.atualizaAvaliacao(idavaliacao, avaliacao, descricao);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar avaliação:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar avaliação!' });
    }
};

// Exporta as funções para serem usadas em outras partes da aplicação
module.exports = { criaAvaliacao, listaAvaliacoes, atualizaAvaliacao };
