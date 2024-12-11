const express = require('express');
const cadastros = require('../controllers/CadastroController');
const router = express.Router();

/**
 * @swagger
 * /cadastro/cadastroUsuario:
 *   post:
 *     summary: Realizar o cadastro de um novo usuário.
 *     description: Este endpoint permite cadastrar um novo usuário no sistema com informações básicas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do usuário.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Endereço de e-mail do usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
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
 *                 description: Número do passaporte do usuário (opcional).
 *               nacionalidade:
 *                 type: string
 *                 description: Nacionalidade do usuário.
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicador de sucesso.
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *       400:
 *         description: Erro ao cadastrar o usuário.
 */
router.post('/cadastroUsuario', cadastros.cadastroUsuario);

/**
 * @swagger
 * /cadastro/tornaHost:
 *   post:
 *     summary: Tornar um usuário um Host.
 *     description: Este endpoint permite transformar um usuário em um Host após o cadastro de uma propriedade.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomePropriedade:
 *                 type: string
 *                 description: Nome da propriedade que o usuário está cadastrando.
 *               rua:
 *                 type: string
 *                 description: Rua do endereço da propriedade.
 *               numero:
 *                 type: string
 *                 description: Número da propriedade.
 *               complemento:
 *                 type: string
 *                 description: Complemento do endereço (opcional).
 *               cidade:
 *                 type: string
 *                 description: Cidade onde a propriedade está localizada.
 *               estado:
 *                 type: string
 *                 description: Estado onde a propriedade está localizada.
 *               cep:
 *                 type: string
 *                 description: CEP da propriedade.
 *               telefone:
 *                 type: string
 *                 description: Número de telefone de contato da propriedade.
 *               tipoPropriedade:
 *                 type: string
 *                 description: Tipo de propriedade (ex: casa, apartamento).
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail de contato para a propriedade.
 *               latitude:
 *                 type: number
 *                 description: Latitude da propriedade.
 *               longitude:
 *                 type: number
 *                 description: Longitude da propriedade.
 *     responses:
 *       200:
 *         description: Host cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicador de sucesso.
 *                 idHost:
 *                   type: integer
 *                   description: ID do Host recém-criado.
 *       400:
 *         description: Erro ao tornar usuário um Host.
 */
router.post('/tornaHost', cadastros.cadastroHost);

module.exports = router;
