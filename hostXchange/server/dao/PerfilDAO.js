const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @swagger
 * /usuario/{userId}/perfil:
 *   put:
 *     summary: Atualizar o perfil do usuário.
 *     description: Este endpoint permite atualizar os dados do perfil do usuário, incluindo a senha (se fornecida).
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID do usuário.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário.
 *               email:
 *                 type: string
 *                 description: E-mail do usuário.
 *               senha:
 *                 type: string
 *                 description: Nova senha do usuário (se for atualizar).
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário.
 *               rg:
 *                 type: string
 *                 description: RG do usuário.
 *               sexo:
 *                 type: string
 *                 description: Sexo do usuário.
 *               passaporte:
 *                 type: string
 *                 description: Número do passaporte do usuário.
 *               nacionalidade:
 *                 type: string
 *                 description: Nacionalidade do usuário.
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
 *                   description: Indicador de sucesso da operação.
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *       400:
 *         description: Erro ao atualizar perfil.
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

/**
 * @swagger
 * /usuario/{userId}/perfil:
 *   get:
 *     summary: Obter o perfil do usuário.
 *     description: Este endpoint retorna as informações do perfil do usuário, incluindo detalhes de contato.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID do usuário.
 *         required: true
 *         schema:
 *           type: integer
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
 *                   description: Indicador de sucesso da operação.
 *                 dados:
 *                   type: object
 *                   description: Dados do perfil do usuário, incluindo informações de contato.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao buscar perfil do usuário.
 */
const perfil = async (userId) => {
  try {
    const dados = await prisma.usuario.findUnique({
      where: { idusuario: parseInt(userId) }, include: {contatoHost: true }
    });

    return { blOk: true, dados };
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
}

module.exports = { atualizarPerfil, perfil };
