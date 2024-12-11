const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /intercambios:
 *   get:
 *     summary: Listar intercâmbios disponíveis.
 *     description: Este endpoint permite listar os intercâmbios disponíveis, incluindo informações sobre os hosts, localização e média das avaliações.
 *     responses:
 *       200:
 *         description: Intercâmbios listados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blOk:
 *                   type: boolean
 *                   description: Indicador de sucesso da operação.
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso ou erro.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do intercâmbio.
 *                       titulo:
 *                         type: string
 *                         description: Título do intercâmbio.
 *                       descricao:
 *                         type: string
 *                         description: Descrição do intercâmbio.
 *                       latitude:
 *                         type: number
 *                         format: float
 *                         description: Latitude da localização do host.
 *                       longitude:
 *                         type: number
 *                         format: float
 *                         description: Longitude da localização do host.
 *                       cidade:
 *                         type: string
 *                         description: Cidade onde o intercâmbio ocorre.
 *                       estado:
 *                         type: string
 *                         description: Estado onde o intercâmbio ocorre.
 *                       avaliacao:
 *                         type: number
 *                         format: float
 *                         description: Média das avaliações do host, arredondada para 1 casa decimal.
 *       500:
 *         description: Erro ao listar intercâmbios.
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
