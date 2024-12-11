// Importa o bcrypt para criptografar senhas e o DAO de Cadastro para interagir com o banco de dados
const bcrypt = require('bcrypt');
const cadastroDAO = require('../dao/CadastroDAO');
const saltRounds = 10;

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cadastro de um novo usuário
 *     description: Cria um novo usuário com senha criptografada e outros dados pessoais.
 *     parameters:
 *       - name: nome
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Nome completo do usuário
 *             email:
 *               type: string
 *               description: Email do usuário
 *             password:
 *               type: string
 *               description: Senha do usuário
 *             cpf:
 *               type: string
 *               description: CPF do usuário
 *             rg:
 *               type: string
 *               description: RG do usuário
 *             passaporte:
 *               type: string
 *               description: Número do passaporte do usuário (opcional)
 *             sexo:
 *               type: string
 *               description: Sexo do usuário
 *             nacionalidade:
 *               type: string
 *               description: Nacionalidade do usuário
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       500:
 *         description: Erro ao salvar o usuário ou criptografar a senha
 */
const cadastroUsuario = async (req, res) => {
  const { nome, email, password, cpf, rg, passaporte, sexo, nacionalidade } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const result = await cadastroDAO.cadastroUsuario(nome, email, hash, cpf, rg, sexo, passaporte, nacionalidade);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao criptografar senha!' });
  }
}

/**
 * @swagger
 * /host:
 *   post:
 *     summary: Cadastro de um usuário como Host
 *     description: Cria um Host no sistema e altera o tipo de usuário para Host.
 *     parameters:
 *       - name: idUsuario
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idUsuario:
 *               type: integer
 *               description: ID do usuário que se tornará um Host
 *             nomePropriedade:
 *               type: string
 *               description: Nome da propriedade onde o Host reside
 *             rua:
 *               type: string
 *               description: Rua do endereço do Host
 *             numero:
 *               type: string
 *               description: Número do imóvel
 *             complemento:
 *               type: string
 *               description: Complemento do endereço
 *             cidade:
 *               type: string
 *               description: Cidade do endereço
 *             estado:
 *               type: string
 *               description: Estado do endereço
 *             cep:
 *               type: string
 *               description: CEP do endereço
 *             telefone:
 *               type: string
 *               description: Número de telefone do Host
 *             tipoPropriedade:
 *               type: string
 *               description: Tipo da propriedade (ex: casa, apartamento)
 *             email:
 *               type: string
 *               description: Email de contato do Host
 *             latitude:
 *               type: number
 *               format: float
 *               description: Latitude do endereço
 *             longitude:
 *               type: number
 *               format: float
 *               description: Longitude do endereço
 *     responses:
 *       201:
 *         description: Host cadastrado com sucesso e tipo de usuário alterado
 *       500:
 *         description: Erro ao cadastrar o Host ou alterar o tipo de usuário
 */
const cadastroHost = async (req, res) => {
  try {
    const { idUsuario, nomePropriedade, rua, numero, complemento, cidade, estado, cep, telefone, tipoPropriedade, email, latitude, longitude } = req.body;

    const resultHost = await cadastroDAO.cadastroHost(nomePropriedade, rua, numero, complemento, cidade, estado, cep, telefone, tipoPropriedade, email, latitude, longitude);
    if (!resultHost.success) {
      return res.status(500).json(resultHost);
    }

    const resultUpdate = await cadastroDAO.updateTipoUsuario(idUsuario, resultHost.idHost.toString());
    if (!resultUpdate.success) {
      return res.status(500).json(resultUpdate);
    }

    res.status(201).json({ success: true, message: 'Usuário alterado para Host com sucesso!', idHost: resultHost.idHost });
  } catch (error) {
    console.error('Erro ao criar Host:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar Host!' });
  }
};

module.exports = { cadastroUsuario, cadastroHost };
