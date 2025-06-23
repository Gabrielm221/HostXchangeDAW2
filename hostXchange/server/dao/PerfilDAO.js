const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @swagger
 * /usuarios/{userId}:
 *   get:
 *     summary: Buscar perfil de usuário
 *     description: Retorna as informações de um usuário com base no ID fornecido, incluindo os dados do host se disponíveis.
 *     operationId: perfil
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário para buscar o perfil.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Perfil do usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blOk:
 *                   type: boolean
 *                   example: true
 *                 dados:
 *                   type: object
 *                   properties:
 *                     idusuario:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "João da Silva"
 *                     email:
 *                       type: string
 *                       example: "joao.silva@email.com"
 *                     contato_host:
 *                       type: object
 *                       properties:
 *                         nmprop:
 *                           type: string
 *                           example: "Casa na praia"
 *                         cidade:
 *                           type: string
 *                           example: "Rio de Janeiro"
 *       404:
 *         description: Perfil não encontrado.
 *       500:
 *         description: Erro ao buscar o perfil.
 */
const perfil = async (userId) => {
  try {
    const dados = await prisma.usuario.findUnique({
      where: { idusuario: parseInt(userId) }, include: { contato_host: true }
    });

    return { blOk: true, dados };
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
};

/**
 * @swagger
 * /usuarios/{userId}:
 *   put:
 *     summary: Atualizar perfil de usuário
 *     description: Atualiza as informações do perfil do usuário com base no ID fornecido.
 *     operationId: atualizarPerfil
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@email.com"
 *               senha:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blOk:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Perfil atualizado!"
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao atualizar o perfil.
 */
const atualizarPerfil = async (userId, data) => {
  try {
    // Atualiza o usuário no banco de dados, incluindo a senha criptografada se houver
    const updatedUser = await prisma.usuario.update({
      where: { idusuario: parseInt(userId) },
      data,
    });

    return { blOk: true, message: "Perfil atualizado!" };
  } catch (error) {
    console.error('Erro ao atualizar o perfil:', error);
    throw error;
  }
};

module.exports = { atualizarPerfil, perfil };
