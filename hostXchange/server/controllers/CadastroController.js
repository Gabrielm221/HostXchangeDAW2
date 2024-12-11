const bcrypt = require('bcrypt');
const cadastroDAO = require('../dao/CadastroDAO');
const saltRounds = 10;

/**
 * @swagger
 * /cadastro/usuario:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     description: Realiza o cadastro de um novo usuário na plataforma.
 *     operationId: cadastroUsuario
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Dados necessários para o cadastro do usuário.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - nome
 *             - email
 *             - password
 *             - cpf
 *             - rg
 *             - passaporte
 *             - sexo
 *             - nacionalidade
 *           properties:
 *             nome:
 *               type: string
 *               description: Nome completo do usuário.
 *             email:
 *               type: string
 *               description: Endereço de e-mail do usuário.
 *             password:
 *               type: string
 *               description: Senha do usuário. A senha será criptografada.
 *             cpf:
 *               type: string
 *               description: CPF do usuário.
 *             rg:
 *               type: string
 *               description: RG do usuário.
 *             passaporte:
 *               type: string
 *               description: Número do passaporte (caso aplicável).
 *             sexo:
 *               type: string
 *               description: Sexo do usuário.
 *             nacionalidade:
 *               type: string
 *               description: Nacionalidade do usuário.
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Cadastro realizado com sucesso!'
 *       500:
 *         description: Erro no cadastro do usuário.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao criptografar senha!'
 */
const cadastroUsuario = async (req, res) => {
  const { nome, email, password, cpf, rg, passaporte, sexo, nacionalidade } = req.body;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const result = await cadastroDAO.cadastroUsuario(nome, email, hash, cpf, rg, sexo, passaporte, nacionalidade );
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
 * /cadastro/host:
 *   post:
 *     summary: Cadastrar um novo host
 *     description: Realiza o cadastro de um novo host, que será associado a um usuário existente.
 *     operationId: cadastroHost
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Dados necessários para o cadastro do host.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - idUsuario
 *             - nomePropriedade
 *             - rua
 *             - numero
 *             - cidade
 *             - estado
 *             - cep
 *             - telefone
 *             - tipoPropriedade
 *             - email
 *             - latitude
 *             - longitude
 *           properties:
 *             idUsuario:
 *               type: string
 *               description: ID do usuário que está sendo alterado para host.
 *             nomePropriedade:
 *               type: string
 *               description: Nome da propriedade do host.
 *             rua:
 *               type: string
 *               description: Rua onde a propriedade está localizada.
 *             numero:
 *               type: string
 *               description: Número da propriedade.
 *             complemento:
 *               type: string
 *               description: Complemento do endereço da propriedade (opcional).
 *             cidade:
 *               type: string
 *               description: Cidade onde a propriedade está localizada.
 *             estado:
 *               type: string
 *               description: Estado onde a propriedade está localizada.
 *             cep:
 *               type: string
 *               description: CEP da propriedade.
 *             telefone:
 *               type: string
 *               description: Telefone para contato do host.
 *             tipoPropriedade:
 *               type: string
 *               description: Tipo de propriedade (exemplo: casa, apartamento, etc.).
 *             email:
 *               type: string
 *               description: E-mail para contato do host.
 *             latitude:
 *               type: number
 *               format: float
 *               description: Latitude da propriedade.
 *             longitude:
 *               type: number
 *               format: float
 *               description: Longitude da propriedade.
 *     responses:
 *       201:
 *         description: Host cadastrado com sucesso e usuário alterado.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Usuário alterado para Host com sucesso!'
 *             idHost:
 *               type: integer
 *               example: 123
 *       500:
 *         description: Erro no cadastro do host ou na atualização do usuário.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao criar Host!'
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
