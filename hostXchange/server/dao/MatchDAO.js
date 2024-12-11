const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /usuario/{idusuario}:
 *   get:
 *     summary: Buscar usuário pelo ID.
 *     description: Este endpoint permite buscar informações de um usuário pelo seu ID.
 *     parameters:
 *       - name: idusuario
 *         in: path
 *         description: ID do usuário.
 *         required: true
 *         schema:
 *           type: integer
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
 *                   description: ID do usuário.
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário.
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao buscar usuário.
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
 * /intercambio/{idinterc}:
 *   get:
 *     summary: Buscar intercâmbio pelo ID.
 *     description: Este endpoint permite buscar um intercâmbio pelo seu ID.
 *     parameters:
 *       - name: idinterc
 *         in: path
 *         description: ID do intercâmbio.
 *         required: true
 *         schema:
 *           type: integer
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
 *                   description: ID do intercâmbio.
 *                 titulo:
 *                   type: string
 *                   description: Título do intercâmbio.
 *                 descricao:
 *                   type: string
 *                   description: Descrição do intercâmbio.
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
 * /match:
 *   post:
 *     summary: Criar um match entre um viajante e um intercâmbio.
 *     description: Este endpoint cria um vínculo (match) entre um viajante e um intercâmbio, permitindo o relacionamento entre eles.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idviajante:
 *                 type: integer
 *                 description: ID do viajante.
 *               idinterc:
 *                 type: integer
 *                 description: ID do intercâmbio.
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
 *                   description: Indicador de sucesso da operação.
 *                 match:
 *                   type: object
 *                   description: Dados do match criado.
 *       400:
 *         description: Dados inválidos ou erro ao criar o match.
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
 * /avaliacao:
 *   post:
 *     summary: Criar uma avaliação.
 *     description: Este endpoint permite criar uma avaliação para um intercâmbio realizado, com informações do avaliador, avaliado, descrição e avaliação numérica.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avaliadoId:
 *                 type: integer
 *                 description: ID do usuário avaliado.
 *               avaliadorId:
 *                 type: integer
 *                 description: ID do usuário avaliador.
 *               avaliacao:
 *                 type: integer
 *                 description: Nota dada pelo avaliador.
 *               descricao:
 *                 type: string
 *                 description: Descrição da avaliação.
 *               snaval:
 *                 type: boolean
 *                 description: Status da avaliação (se foi completada).
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
 *                   description: Indicador de sucesso da operação.
 *                 avaliacao:
 *                   type: object
 *                   description: Dados da avaliação criada.
 *       400:
 *         description: Dados inválidos ou erro ao criar avaliação.
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
