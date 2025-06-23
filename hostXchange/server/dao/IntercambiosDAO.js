const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

/**
 * @swagger
 * /intercambio:
 *   get:
 *     summary: Buscar todos os intercâmbios
 *     description: Retorna todos os intercâmbios registrados no sistema, com detalhes dos hosts e avaliações.
 *     operationId: buscar
 *     responses:
 *       200:
 *         description: Lista de intercâmbios encontrada com sucesso.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               idinterc:
 *                 type: integer
 *                 description: ID do intercâmbio.
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 description: Título do intercâmbio.
 *                 example: "Intercâmbio em Paris"
 *               descricao:
 *                 type: string
 *                 description: Descrição detalhada do intercâmbio.
 *                 example: "Experiência incrível em Paris..."
 *               contatoHost:
 *                 type: object
 *                 properties:
 *                   idctt:
 *                     type: integer
 *                     description: ID do host (proprietário do imóvel).
 *                     example: 123
 *                   usuario:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                         description: Nome do host.
 *                         example: "João Silva"
 *                       avaliacoesComoAvaliado:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             avaliacao:
 *                               type: integer
 *                               description: Nota da avaliação.
 *                               example: 4
 *                             descricao:
 *                               type: string
 *                               description: Descrição da avaliação.
 *                               example: "Excelente anfitrião!"
 *       500:
 *         description: Erro ao buscar intercâmbios.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao buscar intercâmbios!'
 */
const buscar = async () => {
    try {
        return await prisma.intercambios.findMany({
            include: {
                contatoHost: true,
                contatoHost: {
                    include: {
                        usuario: {
                            include: {
                                avaliacoesComoAvaliado: true // Inclui as avaliações do host
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao buscar intercâmbios:', error);
        throw error;
    }
};

/**
 * @swagger
 * /intercambio/{id}:
 *   get:
 *     summary: Buscar intercâmbio por ID
 *     description: Retorna os detalhes de um intercâmbio específico, incluindo informações do host e suas avaliações.
 *     operationId: buscarPorId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do intercâmbio a ser buscado.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes do intercâmbio encontrado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             idinterc:
 *               type: integer
 *               description: ID do intercâmbio.
 *               example: 1
 *             titulo:
 *               type: string
 *               description: Título do intercâmbio.
 *               example: "Intercâmbio em Paris"
 *             descricao:
 *               type: string
 *               description: Descrição do intercâmbio.
 *               example: "Experiência incrível em Paris..."
 *             contatoHost:
 *               type: object
 *               properties:
 *                 idctt:
 *                   type: integer
 *                   description: ID do host (proprietário do imóvel).
 *                   example: 123
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                       description: Nome do host.
 *                       example: "João Silva"
 *                     avaliacoesComoAvaliado:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           avaliacao:
 *                             type: integer
 *                             description: Nota da avaliação.
 *                             example: 5
 *                           descricao:
 *                             type: string
 *                             description: Descrição da avaliação.
 *                             example: "Excelente anfitrião!"
 *       404:
 *         description: Intercâmbio não encontrado.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Intercâmbio não encontrado!'
 *       500:
 *         description: Erro ao buscar intercâmbio.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao buscar detalhes do intercâmbio!'
 */
const buscarPorId = async (id) => {
    try {
        const intercambio = await prisma.intercambios.findUnique({
            where: { idinterc: Number(id) },
            include: {
                contatoHost: true,
                contatoHost: {
                    include: {
                        usuario: {
                            include: {
                                avaliacoesComoAvaliado: true // Inclui as avaliações do host
                            }
                        }
                    }
                }
            }
        });

        return intercambio;
    } catch (error) {
        console.error('Erro ao buscar intercâmbio por ID:', error);
        throw error;
    }
};

/**
 * @swagger
 * /intercambio/cadastro:
 *   post:
 *     summary: Cadastrar um novo intercâmbio
 *     description: Registra um novo intercâmbio no sistema, incluindo título, descrição e imagens.
 *     operationId: cadastrar
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados necessários para cadastrar um novo intercâmbio.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *               description: Título do intercâmbio.
 *               example: "Intercâmbio em Paris"
 *             descricao:
 *               type: string
 *               description: Descrição detalhada do intercâmbio.
 *               example: "Experiência incrível em Paris..."
 *             servicos:
 *               type: string
 *               description: Serviços inclusos no intercâmbio.
 *               example: "Transporte, hospedagem, alimentação"
 *             beneficios:
 *               type: string
 *               description: Benefícios do intercâmbio.
 *               example: "Acesso a eventos exclusivos"
 *             duracao:
 *               type: string
 *               description: Duração do intercâmbio.
 *               example: "6 meses"
 *             idhost:
 *               type: integer
 *               description: ID do host associado ao intercâmbio.
 *               example: 123
 *             imagens:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   path:
 *                     type: string
 *                     description: Caminho da imagem.
 *                     example: "/images/intercambio1.jpg"
 *     responses:
 *       200:
 *         description: Intercâmbio cadastrado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             idinterc:
 *               type: integer
 *               description: ID do intercâmbio cadastrado.
 *               example: 1
 *       500:
 *         description: Erro ao cadastrar intercâmbio.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao cadastrar intercâmbio!'
 */
const cadastrar = async (dados) => {
    try {
        const imagens = (dados.imagens || []).slice(0, 10).reduce((acc, img, index) => {
            acc[`img${index + 1}`] = img.path; // Salva a rota da imagem como string
            return acc;
        }, {});

        const novoIntercambio = await prisma.intercambios.create({
            data: {
                nmlocal: "",
                titulo: dados.titulo,
                descricao: dados.descricao,
                servicos: dados.servicos,
                beneficios: dados.beneficios,
                duracao: dados.duracao,
                idhost: Number(dados.idhost),
                ...imagens
            }
        });

        return novoIntercambio;
    } catch (error) {
        console.error('Erro ao cadastrar intercâmbio:', error);
        throw error;
    }
};

/**
 * @swagger
 * /intercambio/{id}/detalhes:
 *   get:
 *     summary: Buscar detalhes de intercâmbio específico
 *     description: Retorna os detalhes de um intercâmbio específico, incluindo host e avaliações.
 *     operationId: getIntercambioById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do intercâmbio a ser buscado.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes do intercâmbio encontrado.
 *         schema:
 *           type: object
 *           properties:
 *             idinterc:
 *               type: integer
 *               description: ID do intercâmbio.
 *               example: 1
 *             titulo:
 *               type: string
 *               description: Título do intercâmbio.
 *               example: "Intercâmbio em Paris"
 *             descricao:
 *               type: string
 *               description: Descrição detalhada do intercâmbio.
 *               example: "Experiência incrível em Paris..."
 *       404:
 *         description: Intercâmbio não encontrado.
 *       500:
 *         description: Erro ao buscar detalhes do intercâmbio.
 */
const getIntercambioById = async (req, res) => {
    try {
        const { id } = req.body;

        const intercambio = await prisma.intercambios.findUnique({
            where: { idinterc: Number(id) },
            include: {
                contatoHost: {
                    include: {
                        usuario: {
                            include: {
                                avaliacoesComoAvaliado: {
                                    select: {
                                        avaliacao: true,
                                        descricao: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!intercambio) {
            return res.status(404).json({ blOk: false, message: 'Intercâmbio não encontrado!' });
        }

        res.status(200).json(intercambio);
    } catch (error) {
        console.error('Erro ao buscar detalhes do intercâmbio:', error);
        res.status(500).json({ blOk: false, message: 'Erro ao buscar detalhes do intercâmbio!' });
    }
};

module.exports = { buscar, buscarPorId, cadastrar, getIntercambioById };
