const bcrypt = require('bcrypt');
const loginDAO = require('../dao/LoginDAO');
const emailUtils = require('../utils/EmailUtil');
const session = require('express-session');
const express = require('express');
const app = express();

app.use(session({
  secret: 'aSxaefdb@#41',
  resave: false,
  saveUninitialized: true,
}));

function geraCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login
 *     description: Efetua o login do usuário utilizando e-mail e senha.
 *     operationId: login
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         description: E-mail do usuário.
 *         schema:
 *           type: string
 *           format: email
 *       - name: password
 *         in: body
 *         required: true
 *         description: Senha do usuário.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Login efetuado com sucesso!'
 *             user:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Falha no login, credenciais incorretas ou usuário inexistente.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Usuário não existe!' ou 'Senha incorreta!'
 */
const login = (req, res) => {
  const { email, password } = req.body;
  let blOk = true, message = '';

  loginDAO.login(email, (err, result) => {
    if (err) {
      console.log(err);
      message = 'Erro ao verificar usuário!';
      res.json({ blOk: false, message });
      return;
    }

    if (result.length > 0) {
      const verificar = result[0];
      bcrypt.compare(password, verificar.senha, (err, comparacao) => {
        if (err) {
          console.error('Erro ao comparar senhas:', err);
          res.status(500).send('Erro no servidor');
          return;
        }

        if (comparacao) {
          req.session.loggedin = true;
          req.session.username = email;
          message = 'Login efetuado com sucesso!';
          res.json({ user: result, blOk, message });
        } else {
          message = 'Senha incorreta!';
          res.json({ blOk: false, message });
        }
      });
    } else {
      message = 'Usuário não existe!';
      res.json({ blOk: false, message });
    }
  });
}

/**
 * @swagger
 * /enviar-email:
 *   post:
 *     summary: Enviar e-mail para redefinir senha
 *     description: Envia um código de redefinição de senha para o e-mail do usuário.
 *     operationId: enviarEmail
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         description: E-mail do usuário.
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: E-mail enviado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'E-mail de redefinição enviado com sucesso!'
 *       400:
 *         description: Usuário não encontrado ou erro ao processar a solicitação.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Usuário não existe!' ou 'Erro ao verificar usuário!'
 */
const enviarEmail = (req, res) => {
  const { email } = req.body;
  var codigo = geraCodigo();
  let blOk = true, message = '';

  try {
    loginDAO.login(email, (err, result) => {
      if (err) {
        console.log(err);
        message = 'Erro ao verificar usuário!';
        res.json({ blOk: false, message });
        return;
      }
      
      if (result.length > 0) {
        const update = result[0];
        const CDRESET = codigo;

        loginDAO.updateCodigo(update.email, CDRESET, (err) => {
          if (err) {
            console.log(err);
            message = 'Erro ao inserir código!';
            res.json({ blOk: false, message });
            return;
          }
          message = 'Código inserido com sucesso!';
          res.json({ blOk, message });
        });

        emailUtils.sendEmail(email, 'Redefinição de Senha', `Copie e cole o código a seguir para redefinir sua senha: ${codigo}`);
        res.status(200).json({ message: 'E-mail de redefinição enviado com sucesso!' });
      } else {
        message = 'Usuário não existe!';
        res.json({ blOk: false, message });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao processar a solicitação' });
  }
};

/**
 * @swagger
 * /confirmar-codigo:
 *   post:
 *     summary: Confirmar código de redefinição de senha
 *     description: Valida o código de redefinição de senha enviado ao usuário.
 *     operationId: confirmarCodigo
 *     parameters:
 *       - name: code
 *         in: body
 *         required: true
 *         description: Código enviado por e-mail para validação.
 *         schema:
 *           type: string
 *           example: "123456"
 *     responses:
 *       200:
 *         description: Código validado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Código validado com sucesso!'
 *       400:
 *         description: Código inválido.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Código inválido!'
 */
const confirmarCodigo = (req, res) => {
  const codigo = geraCodigo();

  exports.resetPassword = async (req, res) => {
    const { code } = req.body;
    let blOk = true, message = '';

    if (codigo == code) {
      res.status(200).json({ message: 'Código validado com sucesso!' });
    } else {
      message = 'Código inválido!';
      res.json({ blOk: false, message });
    }
  };
}

/**
 * @swagger
 * /atualiza-senha:
 *   post:
 *     summary: Atualizar senha
 *     description: Atualiza a senha do usuário utilizando o e-mail e a nova senha.
 *     operationId: atualizaSenha
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         description: E-mail do usuário.
 *         schema:
 *           type: string
 *           format: email
 *       - name: password
 *         in: body
 *         required: true
 *         description: Nova senha do usuário.
 *         schema:
 *           type: string
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
 *               example: 'Erro ao redefinir a senha!'
 */
const atualizaSenha = (req, res) => {
  const { email, password } = req.body;
  let blOk = true, message = '';

  try {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        message = 'Erro ao criptografar a senha!';
        res.json({ blOk: false, message });
        return;
      }
      loginDAO.atualizaSenha(email, hash, (err) => {
        if (err) {
          console.log(err);
          message = 'Erro ao redefinir a senha!';
          res.json({ blOk: false, message });
          return;
        }
        message = 'Senha atualizada com sucesso!';
        res.json({ blOk, message });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao redefinir a senha' });
  }
};

module.exports = { login, enviarEmail, confirmarCodigo, atualizaSenha };
