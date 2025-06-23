const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /usuario/cadastro:
 *   post:
 *     summary: Cadastro de usuário
 *     description: Realiza o cadastro de um novo usuário (viajante).
 *     operationId: cadastroUsuario
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados necessários para cadastrar o usuário.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Nome completo do usuário.
 *               example: "João da Silva"
 *             email:
 *               type: string
 *               description: Email do usuário.
 *               example: "joao.silva@gmail.com"
 *             password:
 *               type: string
 *               description: Senha do usuário.
 *               example: "senha123"
 *             cpf:
 *               type: string
 *               description: CPF do usuário.
 *               example: "123.456.789-00"
 *             rg:
 *               type: string
 *               description: RG do usuário.
 *               example: "12.345.678-9"
 *             sexo:
 *               type: string
 *               description: Sexo do usuário.
 *               example: "M"
 *             passaporte:
 *               type: string
 *               description: Número do passaporte do usuário.
 *               example: "A1234567"
 *             nacionalidade:
 *               type: string
 *               description: Nacionalidade do usuário.
 *               example: "Brasileiro"
 *     responses:
 *       200:
 *         description: Cadastro do usuário realizado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Usuário cadastrado com sucesso!'
 *       500:
 *         description: Erro ao realizar o cadastro.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao cadastrar usuário!'
 */
const cadastroUsuario = async (nome, email, password, cpf, rg, sexo, passaporte, nacionalidade) => {
  try {
    await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: password,
        cpf,
        rg,
        sexo: sexo,
        nrpassa: passaporte,
        nacional: nacionalidade,
        nacionali: nacionalidade,
        stusuario: 'A',  // Usuário
        tpusuario: 'V'   // Tipo de usuário padrão viajante
      }
    });
    return { success: true, message: 'Usuário cadastrado com sucesso!' };
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return { success: false, message: 'Erro ao cadastrar usuário!' };
  }
};

/**
 * @swagger
 * /host/cadastro:
 *   post:
 *     summary: Cadastro de host
 *     description: Realiza o cadastro de um novo host (proprietário de imóvel).
 *     operationId: cadastroHost
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados necessários para cadastrar o host.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nomePropriedade:
 *               type: string
 *               description: Nome da propriedade (ex: nome do imóvel).
 *               example: "Casa do João"
 *             rua:
 *               type: string
 *               description: Nome da rua do imóvel.
 *               example: "Rua das Flores"
 *             numero:
 *               type: string
 *               description: Número da casa ou apartamento.
 *               example: "123"
 *             complemento:
 *               type: string
 *               description: Complemento do endereço (ex: andar, bloco).
 *               example: "Bloco A, apto 202"
 *             cidade:
 *               type: string
 *               description: Cidade onde o imóvel está localizado.
 *               example: "São Paulo"
 *             estado:
 *               type: string
 *               description: Estado onde o imóvel está localizado.
 *               example: "SP"
 *             cep:
 *               type: string
 *               description: CEP do imóvel.
 *               example: "01001-000"
 *             telefone:
 *               type: string
 *               description: Número de telefone de contato do host.
 *               example: "(11) 1234-5678"
 *             tipoPropriedade:
 *               type: string
 *               description: Tipo de propriedade (ex: casa, apartamento).
 *               example: "Casa"
 *             email:
 *               type: string
 *               description: E-mail de contato do host.
 *               example: "joao.host@gmail.com"
 *             latitude:
 *               type: number
 *               description: Latitude do imóvel.
 *               example: -23.550520
 *             longitude:
 *               type: number
 *               description: Longitude do imóvel.
 *               example: -46.633308
 *     responses:
 *       200:
 *         description: Cadastro do host realizado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             idHost:
 *               type: string
 *               example: "12345"
 *       500:
 *         description: Erro ao realizar o cadastro.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao cadastrar host!'
 */
const cadastroHost = async (nomePropriedade, rua, numero, complemento, cidade, estado, cep, telefone, tipoPropriedade, email, latitude, longitude) => {
  try {
    const host = await prisma.contato_host.create({
      data: {
        nmprop   : nomePropriedade,
        endereco : rua,
        numero   : numero,
        complem  : complemento,
        cidade   : cidade,
        cdestado : estado,
        nrcep    : cep,
        nrtel    : telefone,
        tipoProp : tipoPropriedade,
        email    : email,
        stcadast : 'A',
        latitude : latitude,
        longitude: longitude
      }
    });
    return { success: true, idHost: host.idctt };
  } catch (error) {
    console.error('Erro ao cadastrar host:', error);
    return { success: false, message: 'Erro ao cadastrar host!' };
  }
};

/**
 * @swagger
 * /usuario/atualizar-tipo:
 *   put:
 *     summary: Atualizar tipo de usuário para host
 *     description: Atualiza o tipo de usuário de "viajante" para "host" após o cadastro do host.
 *     operationId: updateTipoUsuario
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados necessários para atualizar o tipo de usuário.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idUsuario:
 *               type: string
 *               description: ID do usuário a ser atualizado.
 *               example: "12345"
 *             idHost:
 *               type: string
 *               description: ID do host recém-cadastrado.
 *               example: "54321"
 *     responses:
 *       200:
 *         description: Tipo de usuário atualizado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Seu perfil foi atualizado para Host!'
 *       500:
 *         description: Erro ao atualizar o tipo de usuário.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao atualizar tipo do usuário para Host!'
 */
const updateTipoUsuario = async (idUsuario, idHost) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { idusuario: Number(idUsuario) },
    });

    if (!usuario) {
      return { success: false, message: 'Usuário não encontrado!' };
    }

    await prisma.usuario.update({
      where: { idusuario: Number(idUsuario) },
      data: {
        tpusuario: 'H',
        idhost: Number(idHost),
      },
    });

    return { success: true, message: 'Seu perfil foi atualizado para Host!' };
  } catch (error) {
    console.error('Erro ao atualizar tipo de usuário:', error);
    return { success: false, message: 'Erro ao atualizar tipo do usuário para Host!' };
  }
};

module.exports = { cadastroUsuario, cadastroHost, updateTipoUsuario };
