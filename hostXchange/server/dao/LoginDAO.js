const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login do usuário
 *     description: Verifica as credenciais do usuário com base no e-mail e retorna informações relacionadas ao usuário e seus intercâmbios.
 *     operationId: login
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Credenciais de login do usuário (email).
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: E-mail do usuário.
 *               example: "usuario@exemplo.com"
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna as informações do usuário.
 *         schema:
 *           type: object
 *           properties:
 *             idusuario:
 *               type: integer
 *               description: ID do usuário.
 *               example: 1
 *             nome:
 *               type: string
 *               description: Nome do usuário.
 *               example: "João Silva"
 *             email:
 *               type: string
 *               description: E-mail do usuário.
 *               example: "usuario@exemplo.com"
 *             contatoHost:
 *               type: object
 *               description: Detalhes do host (se aplicável).
 *               properties:
 *                 idctt:
 *                   type: integer
 *                   description: ID do host.
 *                   example: 123
 *                 intercambio:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Detalhes sobre os intercâmbios associados ao host.
 *       404:
 *         description: Usuário não encontrado.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Usuário não encontrado!'
 *       500:
 *         description: Erro ao realizar login.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao realizar login!'
 */
const login = async (email, callback) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { email: email }, include: {contato_host: { include: { intercambios: true } } }
    });
    callback(null, user ? [user] : []);
  } catch (error) {
    console.error('Erro na consulta:', error);
    callback(error, null);
  }
};

/**
 * @swagger
 * /reset-senha:
 *   post:
 *     summary: Atualizar código de reset de senha
 *     description: Atualiza o código de reset de senha para o usuário com base no e-mail fornecido.
 *     operationId: updateCodigo
 *     parameters:
 *       - in: body
 *         name: body
 *         description: E-mail e código de reset para o usuário.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: E-mail do usuário.
 *               example: "usuario@exemplo.com"
 *             codigo:
 *               type: string
 *               description: Código de reset de senha.
 *               example: "abc123"
 *     responses:
 *       200:
 *         description: Código de reset de senha atualizado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Código de reset atualizado com sucesso!'
 *       400:
 *         description: Erro ao atualizar código de reset de senha.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao atualizar código de reset de senha!'
 *       500:
 *         description: Erro interno ao processar a solicitação.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao processar solicitação.'
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
 *     summary: Atualizar senha do usuário
 *     description: Atualiza a senha do usuário com base no e-mail fornecido.
 *     operationId: atualizaSenha
 *     parameters:
 *       - in: body
 *         name: body
 *         description: E-mail e a nova senha (em hash) do usuário.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: E-mail do usuário.
 *               example: "usuario@exemplo.com"
 *             hash:
 *               type: string
 *               description: Nova senha do usuário (em hash).
 *               example: "$2b$10$0jHI9g3irfEXbHOE.IhOGe2zQwH0LXekTg1Jb/"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Senha atualizada com sucesso!'
 *       400:
 *         description: Erro ao atualizar a senha.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao atualizar senha!'
 *       500:
 *         description: Erro interno ao processar a solicitação.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao processar solicitação.'
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
