const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /usuarios/{idusuario}:
 *   get:
 *     summary: Buscar usuário
 *     description: Retorna as informações de um usuário com base no ID fornecido.
 *     operationId: buscarUsuario
 *     parameters:
 *       - in: path
 *         name: idusuario
 *         required: true
 *         description: ID do usuário a ser buscado.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idusuario:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "João da Silva"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@email.com"
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao buscar o usuário.
 */
const buscarUsuario = async (idusuario) => {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { idusuario } });
    return usuario;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw new Error('Erro ao buscar usuário.');
  }
};

/**
 * @swagger
 * /intercambios/{idinterc}:
 *   get:
 *     summary: Buscar intercâmbio
 *     description: Retorna as informações de um intercâmbio com base no ID fornecido.
 *     operationId: buscarIntercambio
 *     parameters:
 *       - in: path
 *         name: idinterc
 *         required: true
 *         description: ID do intercâmbio a ser buscado.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Intercâmbio encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idinterc:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "Intercâmbio na praia"
 *                 descricao:
 *                   type: string
 *                   example: "Desfrute de um intercâmbio relaxante na praia."
 *       404:
 *         description: Intercâmbio não encontrado.
 *       500:
 *         description: Erro ao buscar intercâmbio.
 */
const buscarIntercambio = async (idinterc) => {
  try {
    const intercambio = await prisma.intercambio.findUnique({ where: { idinterc } });
    return intercambio;
  } catch (error) {
    console.error('Erro ao buscar intercâmbio:', error);
    throw new Error('Erro ao buscar intercâmbio.');
  }
};

/**
 * @swagger
 * /matches:
 *   post:
 *     summary: Criar match
 *     description: Cria um match (vínculo) entre um viajante e um intercâmbio.
 *     operationId: criarMatch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idviajante:
 *                 type: integer
 *                 example: 1
 *               idinterc:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Match criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 match:
 *                   type: object
 *                   properties:
 *                     idmatch:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: Erro ao criar match.
 */
const criarMatch = async (idviajante, idinterc) => {
  try {
    const match = await prisma.match.create({
      data: {
        idviajante,
        idinterc,
      },
    });
    return { success: true, match };
  } catch (error) {
    console.error('Erro ao criar vínculo (match):', error);
    return { success: false, message: 'Erro ao criar vínculo (match).' };
  }
};

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Criar avaliação
 *     description: Cria uma avaliação de um intercâmbio feita por um avaliador.
 *     operationId: criarAvaliacao
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avaliadoId:
 *                 type: integer
 *                 example: 1
 *               avaliadorId:
 *                 type: integer
 *                 example: 2
 *               avaliacao:
 *                 type: integer
 *                 example: 5
 *               descricao:
 *                 type: string
 *                 example: "Ótima experiência, recomendo!"
 *               snaval:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Avaliação criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 avaliacao:
 *                   type: object
 *                   properties:
 *                     idavaliacao:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: Erro ao criar avaliação.
 */
const criarAvaliacao = async ({ avaliadoId, avaliadorId, avaliacao, descricao, snaval }) => {
  try {
    const novaAvaliacao = await prisma.avaliacao.create({
      data: {
        avaliadoId,
        avaliadorId,
        avaliacao,
        descricao,
        snaval,
      },
    });
    return { success: true, avaliacao: novaAvaliacao };
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    throw new Error('Erro ao criar avaliação.');
  }
};

module.exports = { buscarUsuario, buscarIntercambio, criarMatch, criarAvaliacao };
