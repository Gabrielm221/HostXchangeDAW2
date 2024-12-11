const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cadastra um novo usuário.
 *     description: Este endpoint permite cadastrar um novo usuário, incluindo informações como nome, e-mail, CPF, RG, sexo, passaporte e nacionalidade.
 *     requestBody:
 *       description: Dados necessários para cadastrar um novo usuário.
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
 *                 description: E-mail do usuário.
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
 *                 description: Sexo do usuário (M/F).
 *               passaporte:
 *                 type: string
 *                 description: Número do passaporte do usuário.
 *               nacionalidade:
 *                 type: string
 *                 description: Nacionalidade do usuário.
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *       500:
 *         description: Erro ao cadastrar usuário.
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
 * /host:
 *   post:
 *     summary: Cadastra um novo host.
 *     description: Este endpoint permite cadastrar um novo host, incluindo informações como nome da propriedade, endereço, telefone e localização.
 *     requestBody:
 *       description: Dados necessários para cadastrar uma nova propriedade de host.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomePropriedade:
 *                 type: string
 *                 description: Nome da propriedade do host.
 *               rua:
 *                 type: string
 *                 description: Rua onde a propriedade está localizada.
 *               numero:
 *                 type: string
 *                 description: Número da propriedade.
 *               complemento:
 *                 type: string
 *                 description: Complemento do endereço.
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
 *                 description: Número de telefone do host.
 *               tipoPropriedade:
 *                 type: string
 *                 description: Tipo de propriedade do host (ex: Casa, Apartamento).
 *               email:
 *                 type: string
 *                 description: E-mail do host.
 *               latitude:
 *                 type: string
 *                 description: Latitude da localização da propriedade.
 *               longitude:
 *                 type: string
 *                 description: Longitude da localização da propriedade.
 *     responses:
 *       200:
 *         description: Host cadastrado com sucesso.
 *       500:
 *         description: Erro ao cadastrar host.
 */
const cadastroHost = async (nomePropriedade, rua, numero, complemento, cidade, estado, cep, telefone, tipoPropriedade, email, latitude, longitude) => {
  try {
    const host = await prisma.contatoHost.create({
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
 * /usuario/tipo/{idUsuario}/{idHost}:
 *   put:
 *     summary: Atualiza o tipo de usuário para "Host".
 *     description: Este endpoint permite alterar o tipo de usuário de "Viajante" para "Host", associando-o a um host específico.
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idHost
 *         required: true
 *         description: ID do host ao qual o usuário será associado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de usuário atualizado para "Host".
 *       500:
 *         description: Erro ao atualizar tipo de usuário.
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
