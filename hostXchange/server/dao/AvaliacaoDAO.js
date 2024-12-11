const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /avaliacao/criar:
 *   post:
 *     summary: Criar uma avaliação para um usuário
 *     description: Cria uma avaliação para o usuário avaliado por outro usuário.
 *     operationId: criaAvaliacao
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados para criar uma avaliação.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             avaliadoId:
 *               type: string
 *               description: ID do usuário avaliado.
 *               example: "12345"
 *             avaliadorId:
 *               type: string
 *               description: ID do usuário que está avaliando.
 *               example: "67890"
 *     responses:
 *       200:
 *         description: Avaliação criada com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Avaliação feita com sucesso!'
 *             idavaliacao:
 *               type: string
 *               example: "1234"
 *       500:
 *         description: Erro ao criar a avaliação.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao avaliar!'
 */
const criaAvaliacao = async (avaliadoId, avaliadorId) => {
  try {
    const aval = await prisma.avaliacao.create({
      data: {
        avaliado: {
          connect: { idusuario: avaliadoId }, // Conecta o ID do avaliado
        },
        avaliador: {
          connect: { idusuario: avaliadorId }, // Conecta o ID do avaliador
        },
        snaval: false, // Default value
      },
    });

    return { success: true, message: 'Avaliação feita com sucesso!', idavaliacao: aval.idavaliacao };
  } catch (error) {
    console.error('Erro ao avaliar:', error);
    return { success: false, message: 'Erro ao avaliar!' };
  }
};

/**
 * @swagger
 * /avaliacao/lista:
 *   get:
 *     summary: Listar avaliações de um usuário
 *     description: Retorna as avaliações feitas para ou por um usuário.
 *     operationId: listaAvaliacoes
 *     parameters:
 *       - in: query
 *         name: idusuario
 *         description: ID do usuário para listar as avaliações.
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       200:
 *         description: Avaliações encontradas.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Avaliações encontradas!'
 *             avaliacoes:
 *               type: object
 *               properties:
 *                 avaliado:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idavaliacao:
 *                         type: string
 *                         example: "1234"
 *                       descricao:
 *                         type: string
 *                         example: "Excelente!"
 *                 avaliador:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idavaliacao:
 *                         type: string
 *                         example: "5678"
 *                       descricao:
 *                         type: string
 *                         example: "Bom intercâmbio."
 *       500:
 *         description: Erro ao listar as avaliações.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao listar avaliações!'
 */
const listaAvaliacoes = async (idusuario) => {
  try {
    const avaliado = await prisma.avaliacao.findMany({ where: { avaliadoId: Number(idusuario) }, include: { avaliado: true, avaliador: true }});
    const avaliador = await prisma.avaliacao.findMany({ where: { avaliadorId: Number(idusuario) }, include: { avaliado: true, avaliador: true }});

    if (avaliado.length > 0 || avaliador.length > 0) {
      const avaliacoes = { avaliado, avaliador }; 
      return { blOk: true, message: 'Avaliações encontradas!', avaliacoes };
    } else {
      return { blOk: false, message: 'Nenhuma avaliação encontrada!' };
    }
  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    return { success: false, message: 'Erro ao listar avaliações!' };
  }
};

/**
 * @swagger
 * /avaliacao/atualizar:
 *   put:
 *     summary: Atualizar uma avaliação existente
 *     description: Atualiza uma avaliação, incluindo a descrição e a nota.
 *     operationId: atualizaAvaliacao
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados para atualizar uma avaliação.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idavaliacao:
 *               type: string
 *               description: ID da avaliação a ser atualizada.
 *               example: "1234"
 *             avaliacao:
 *               type: integer
 *               description: Nova nota da avaliação.
 *               example: 4
 *             descricao:
 *               type: string
 *               description: Nova descrição da avaliação.
 *               example: "Muito bom, mas poderia melhorar."
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Avaliação atualizada com sucesso!'
 *             avaliacaoAtualizada:
 *               type: object
 *               properties:
 *                 idavaliacao:
 *                   type: string
 *                   example: "1234"
 *                 avaliacao:
 *                   type: integer
 *                   example: 4
 *                 descricao:
 *                   type: string
 *                   example: "Muito bom, mas poderia melhorar."
 *       500:
 *         description: Erro ao atualizar a avaliação.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao atualizar avaliação!'
 */
const atualizaAvaliacao = async (idavaliacao, avaliacao, descricao) => {
  try {
    const avaliacaoAtualizada = await prisma.avaliacao.update({
      where: { idavaliacao: idavaliacao },
      data: {
        avaliacao,
        snaval: true,
        descricao,
      },
    });

    return { blOk: true, message: 'Avaliação atualizada com sucesso!', avaliacaoAtualizada };
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    return { blOk: false, message: 'Erro ao atualizar avaliação!' };
  }
};

module.exports = { criaAvaliacao, listaAvaliacoes, atualizaAvaliacao };
