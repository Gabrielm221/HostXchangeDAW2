const avaliacaoDAO = require('../dao/AvaliacaoDAO');

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags:
 *       - Avaliações
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avaliado:
 *                 type: string
 *                 description: ID do usuário avaliado
 *               avaliador:
 *                 type: string
 *                 description: ID do usuário avaliador
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro ao salvar avaliação
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
};

/**
 * @swagger
 * /avaliacoes:
 *   get:
 *     summary: Lista todas as avaliações de um usuário
 *     tags:
 *       - Avaliações
 *     parameters:
 *       - in: body
 *         name: idUser
 *         schema:
 *           type: object
 *           properties:
 *             idUser:
 *               type: string
 *               description: ID do usuário para buscar as avaliações
 *     responses:
 *       200:
 *         description: Lista de avaliações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro ao listar avaliações
 */
const listaAvaliacoes = async (req, res) => {
    const { idUser } = req.body;

    try {
        const result = await avaliacaoDAO.listaAvaliacoes(idUser);
        if (result.blOk === true) {
            const avaliacoesValidas = result.avaliacoes.avaliado.filter(m => m.snaval === true).map(m => m.avaliacao); 
        
            // Calcula a média das avaliações válidas
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
 * /avaliacoes:
 *   put:
 *     summary: Atualiza uma avaliação existente
 *     tags:
 *       - Avaliações
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idavaliacao:
 *                 type: string
 *                 description: ID da avaliação a ser atualizada
 *               avaliacao:
 *                 type: number
 *                 description: Nova nota da avaliação
 *               descricao:
 *                 type: string
 *                 description: Nova descrição da avaliação
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro ao atualizar avaliação
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

module.exports = { criaAvaliacao, listaAvaliacoes, atualizaAvaliacao };
