const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /intercambios:
 *   get:
 *     summary: Listar intercâmbios
 *     description: Retorna uma lista de intercâmbios, incluindo informações sobre o host e a média de avaliações de cada intercâmbio.
 *     operationId: listaIntercambio
 *     responses:
 *       200:
 *         description: Lista de intercâmbios com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Intercâmbios listados com sucesso!'
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do intercâmbio.
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     description: Título do intercâmbio.
 *                     example: "Intercâmbio na praia"
 *                   descricao:
 *                     type: string
 *                     description: Descrição do intercâmbio.
 *                     example: "Desfrute de um intercâmbio relaxante na praia."
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitude da localização do intercâmbio.
 *                     example: -23.5505
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitude da localização do intercâmbio.
 *                     example: -46.6333
 *                   cidade:
 *                     type: string
 *                     description: Cidade onde o intercâmbio está localizado.
 *                     example: "São Paulo"
 *                   estado:
 *                     type: string
 *                     description: Estado onde o intercâmbio está localizado.
 *                     example: "SP"
 *                   avaliacao:
 *                     type: number
 *                     description: Média das avaliações do intercâmbio.
 *                     example: 4.5
 *       500:
 *         description: Erro ao listar os intercâmbios.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao listar intercâmbios!'
 */
const listaIntercambio = async () => {
  try {
      const buscaIntercambio = await prisma.intercambio.findMany({
          include: {
              contatoHost: {
                  select: {
                      nmprop: true,
                      latitude: true,
                      longitude: true,
                      cidade: true,
                      cdestado: true
                  }
              },
              matches: true,
              // Subquery para calcular média de avaliações
              contatoHost: {
                  include: {
                      usuario: {
                          select: {
                              avaliacoesComoAvaliado: {
                                  select: { avaliacao: true }
                              }
                          }
                      }
                  }
              }
          }
      });

      // Calcula média de avaliações e estrutura os dados
      const formattedData = buscaIntercambio.map((intercambio) => {
          const avaliacoes =
              intercambio.contatoHost.usuario?.avaliacoesComoAvaliado.map(
                  (aval) => aval.avaliacao
              ) || [];
          const mediaAvaliacao =
              avaliacoes.length > 0
                  ? avaliacoes.reduce((sum, value) => sum + value, 0) / avaliacoes.length
                  : 0;

          return {
              id: intercambio.idinterc,
              titulo: intercambio.titulo,
              descricao: intercambio.descricao,
              latitude: intercambio.contatoHost?.latitude,
              longitude: intercambio.contatoHost?.longitude,
              cidade: intercambio.contatoHost?.cidade,
              estado: intercambio.contatoHost?.cdestado,
              avaliacao: mediaAvaliacao.toFixed(1)
          };
      });

      return { blOk: true, message: 'Intercâmbios listados com sucesso!', data: formattedData };
  } catch (error) {
      console.error('Erro ao buscar intercâmbios:', error);
      return { blOk: false, message: 'Erro ao listar intercâmbios!' };
  }
};

module.exports = { listaIntercambio };
