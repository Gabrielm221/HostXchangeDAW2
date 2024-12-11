const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login de usuário.
 *     description: Este endpoint permite que um usuário realize o login usando seu e-mail.
 *     requestBody:
 *       description: E-mail do usuário para login.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário para login.
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao realizar login.
 */
const login = async (email, callback) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { email: email },
    });
    callback(null, user ? [user] : []);
  } catch (error) {
    console.error('Erro na consulta:', error);
    callback(error, null);
  }
};

/**
 * @swagger
 * /reset-codigo:
 *   post:
 *     summary: Atualizar código de reset de senha do usuário.
 *     description: Este endpoint permite atualizar o código de reset de senha de um usuário através de seu e-mail.
 *     requestBody:
 *       description: E-mail e o novo código para resetar a senha do usuário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário.
 *               codigo:
 *                 type: string
 *                 description: Novo código para resetar a senha.
 *     responses:
 *       200:
 *         description: Código de reset atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar o código de reset.
 *       500:
 *         description: Erro no servidor ao tentar atualizar o código.
 */
const updateCodigo = async (email, codigo, callback) => {
  try {
    await prisma.usuario.update({
      where: { email: email },
      data: { CDRESET: codigo },
    });
    callback(null);
  } catch (error) {
    console.error('Erro ao atualizar o código de reset:', error);
    callback(error);
  }
};

/**
 * @swagger
 * /atualiza-senha:
 *   post:
 *     summary: Atualizar a senha do usuário.
 *     description: Este endpoint permite atualizar a senha de um usuário através do e-mail e do novo hash de senha.
 *     requestBody:
 *       description: E-mail do usuário e o novo hash da senha.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário.
 *               hash:
 *                 type: string
 *                 description: Novo hash da senha.
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso.
 *       400:
 *         description: Erro ao atualizar a senha.
 *       500:
 *         description: Erro no servidor ao tentar atualizar a senha.
 */
const atualizaSenha = async (email, hash, callback) => {
  try {
    await prisma.usuario.update({
      where: { email: email },
      data: { senha: hash },
    });
    callback(null);
  } catch (error) {
    console.error('Erro ao atualizar a senha:', error);
    callback(error);
  }
};

module.exports = { login, updateCodigo, atualizaSenha };
