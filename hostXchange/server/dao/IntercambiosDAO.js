const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

/**
 * @swagger
 * /intercambio:
 *   get:
 *     summary: Buscar todos os intercâmbios.
 *     description: Este endpoint retorna todos os intercâmbios cadastrados, incluindo os detalhes do host e avaliações do host.
 *     responses:
 *       200:
 *         description: Lista de intercâmbios encontrados.
 *       500:
 *         description: Erro ao buscar intercâmbios.
 */
const buscar = async () => {
    try {
        return await prisma.intercambio.findMany({
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
 *     summary: Buscar intercâmbio por ID.
 *     description: Este endpoint permite buscar um intercâmbio específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do intercâmbio a ser buscado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do intercâmbio encontrado.
 *       404:
 *         description: Intercâmbio não encontrado.
 *       500:
 *         description: Erro ao buscar intercâmbio.
 */
const buscarPorId = async (id) => {
    try {
        const intercambio = await prisma.intercambio.findUnique({
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
 * /intercambio:
 *   post:
 *     summary: Cadastrar um novo intercâmbio.
 *     description: Este endpoint permite cadastrar um novo intercâmbio, com dados como título, descrição, serviços, benefícios, duração e imagens.
 *     requestBody:
 *       description: Dados necessários para cadastrar um novo intercâmbio.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do intercâmbio.
 *               descricao:
 *                 type: string
 *                 description: Descrição do intercâmbio.
 *               servicos:
 *                 type: string
 *                 description: Serviços oferecidos no intercâmbio.
 *               beneficios:
 *                 type: string
 *                 description: Benefícios do intercâmbio.
 *               duracao:
 *                 type: string
 *                 description: Duração do intercâmbio.
 *               idhost:
 *                 type: integer
 *                 description: ID do host do intercâmbio.
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     path:
 *                       type: string
 *                       description: Caminho da imagem.
 *     responses:
 *       200:
 *         description: Intercâmbio cadastrado com sucesso.
 *       500:
 *         description: Erro ao cadastrar intercâmbio.
 */
const cadastrar = async (dados) => {
    try {
        const imagens = (dados.imagens || []).slice(0, 10).reduce((acc, img, index) => {
            acc[`img${index + 1}`] = img.path; // Salva a rota da imagem como string
            return acc;
        }, {});

        const novoIntercambio = await prisma.intercambio.create({
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
 * /intercambio/detalhes:
 *   post:
 *     summary: Buscar detalhes de um intercâmbio por ID.
 *     description: Este endpoint retorna os detalhes completos de um intercâmbio, incluindo informações do host e avaliações do host.
 *     requestBody:
 *       description: ID do intercâmbio para buscar os detalhes.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do intercâmbio.
 *     responses:
 *       200:
 *         description: Detalhes do intercâmbio encontrado.
 *       404:
 *         description: Intercâmbio não encontrado.
 *       500:
 *         description: Erro ao buscar detalhes do intercâmbio.
 */
const getIntercambioById = async (req, res) => {
    try {
        const { id } = req.body;

        const intercambio = await prisma.intercambio.findUnique({
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
