const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /avaliacao:
 *   post:
 *     summary: Cria uma avaliação para um usuário.
 *     description: Este endpoint cria uma avaliação de um usuário (avaliador) para outro usuário (avaliado). A avaliação inicia com um valor de "snaval" como `false`.
 *     requestBody:
 *       description: Dados para criar uma avaliação.
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
 *     responses:
 *       200:
 *         description: Avaliação criada com sucesso.
 *       500:
 *         description: Erro ao criar avaliação.
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
        snaval: false, // Valor padrão
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
 * /avaliacoes/{idusuario}:
 *   get:
 *     summary: Lista as avaliações de um usuário.
 *     description: Este endpoint retorna as avaliações feitas a um usuário, seja como avaliador ou avaliado.
 *     parameters:
 *       - in: path
 *         name: idusuario
 *         required: true
 *         description: ID do usuário para recuperar suas avaliações.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avaliações encontradas com sucesso.
 *       500:
 *         description: Erro ao listar avaliações.
 */
const listaAvaliacoes = async (idusuario) => {
  try {
    const avaliado = await prisma.avaliacao.findMany({ where: { avaliadoId: Number(idusuario) }, include: { avaliado: true, avaliador: true } });
    const avaliador = await prisma.avaliacao.findMany({ where: { avaliadorId: Number(idusuario) }, include: { avaliado: true, avaliador: true } });

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
 * /avaliacao/{idavaliacao}:
 *   put:
 *     summary: Atualiza uma avaliação existente.
 *     description: Este endpoint permite atualizar uma avaliação, incluindo a descrição e se a avaliação foi finalizada (`snaval`).
 *     parameters:
 *       - in: path
 *         name: idavaliacao
 *         required: true
 *         description: ID da avaliação a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados para atualizar a avaliação.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avaliacao:
 *                 type: integer
 *                 description: Nota da avaliação (geralmente de 0 a 5).
 *               descricao:
 *                 type: string
 *                 description: Descrição da avaliação.
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso.
 *       500:
 *         description: Erro ao atualizar avaliação.
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
