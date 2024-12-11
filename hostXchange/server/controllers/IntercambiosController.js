const intercambiosDAO = require('../dao/IntercambiosDAO');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuração base do diretório de upload
const uploadsDir = path.join(__dirname, '../../public/assets/intercambios');

// Configuração do multer para salvar as imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const hostFolder = path.join(uploadsDir, `host_${req.body.idhost}`);
        if (!fs.existsSync(hostFolder)) {
            fs.mkdirSync(hostFolder, { recursive: true });
        }
        cb(null, hostFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nome único para cada arquivo
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB por arquivo
}).array('images', 10); // Até 10 arquivos no campo 'images'

/**
 * @swagger
 * /intercambios:
 *   get:
 *     summary: Buscar todos os intercâmbios
 *     description: Retorna todos os intercâmbios cadastrados na plataforma.
 *     operationId: buscar
 *     responses:
 *       200:
 *         description: Lista de intercâmbios retornada com sucesso.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               nmlocal:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               servicos:
 *                 type: string
 *               beneficios:
 *                 type: string
 *               duracao:
 *                 type: string
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de caminhos das imagens do intercâmbio.
 *       500:
 *         description: Erro ao buscar intercâmbios.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao buscar intercâmbios!'
 */
const buscar = async (req, res) => {
    try {
        const intercambios = await intercambiosDAO.buscar();
        console.log(intercambios)
        res.status(200).json(intercambios);
    } catch (error) {
        console.error('Erro ao buscar intercâmbios:', error);
        res.status(500).json({ blOk: false, message: 'Erro ao buscar intercâmbios!' });
    }
};

/**
 * @swagger
 * /intercambios/{id}:
 *   get:
 *     summary: Buscar intercâmbio por ID
 *     description: Retorna os detalhes de um intercâmbio específico baseado no ID fornecido.
 *     operationId: buscarPorId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do intercâmbio a ser buscado.
 *         type: string
 *     responses:
 *       200:
 *         description: Intercâmbio encontrado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             nmlocal:
 *               type: string
 *             titulo:
 *               type: string
 *             descricao:
 *               type: string
 *             servicos:
 *               type: string
 *             beneficios:
 *               type: string
 *             duracao:
 *               type: string
 *             imagens:
 *               type: array
 *               items:
 *                 type: string
 *       404:
 *         description: Intercâmbio não encontrado.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Intercâmbio não encontrado!'
 *       500:
 *         description: Erro ao buscar intercâmbio por ID.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao buscar intercâmbio por ID!'
 */
const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID da URL
        const intercambio = await intercambiosDAO.buscarPorId(id);

        if (!intercambio) {
            return res.status(404).json({ blOk: false, message: 'Intercâmbio não encontrado!' });
        }

        res.status(200).json(intercambio);
    } catch (error) {
        console.error('Erro ao buscar intercâmbio por ID:', error);
        res.status(500).json({ blOk: false, message: 'Erro ao buscar intercâmbio por ID!' });
    }
};

/**
 * @swagger
 * /intercambios:
 *   post:
 *     summary: Cadastrar um novo intercâmbio
 *     description: Registra um novo intercâmbio, incluindo o upload das imagens associadas ao intercâmbio.
 *     operationId: cadastrar
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Dados necessários para o cadastro do intercâmbio, incluindo as imagens.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - nmlocal
 *             - titulo
 *             - descricao
 *             - servicos
 *             - beneficios
 *             - duracao
 *             - idhost
 *           properties:
 *             nmlocal:
 *               type: string
 *               description: Nome do local do intercâmbio.
 *             titulo:
 *               type: string
 *               description: Título do intercâmbio.
 *             descricao:
 *               type: string
 *               description: Descrição do intercâmbio.
 *             servicos:
 *               type: string
 *               description: Serviços oferecidos no intercâmbio.
 *             beneficios:
 *               type: string
 *               description: Benefícios do intercâmbio.
 *             duracao:
 *               type: string
 *               description: Duração do intercâmbio.
 *             idhost:
 *               type: string
 *               description: ID do host que oferece o intercâmbio.
 *             images:
 *               type: array
 *               items:
 *                 type: file
 *               description: Lista de imagens a serem enviadas para o intercâmbio.
 *     responses:
 *       201:
 *         description: Intercâmbio cadastrado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Intercâmbio cadastrado com sucesso!'
 *             intercambio:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nmlocal:
 *                   type: string
 *                 titulo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 servicos:
 *                   type: string
 *                 beneficios:
 *                   type: string
 *                 duracao:
 *                   type: string
 *                 imagens:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Erro ao cadastrar intercâmbio.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao cadastrar intercâmbio!'
 */
const cadastrar = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Erro ao fazer upload das imagens:', err);
            return res.status(500).json({ blOk: false, message: 'Erro ao fazer upload das imagens!' });
        }

        try {
            const { nmlocal, titulo, descricao, servicos, beneficios, duracao, idhost } = req.body;

            // Montando as referências das imagens
            const imagens = req.files.map((file) => ({
                path: `/assets/intercambios/host_${idhost}/${file.filename}` // Construir a rota correta
            }));

            // Salvar o intercâmbio no banco de dados
            const intercambio = await intercambiosDAO.cadastrar({
                nmlocal,
                titulo,
                descricao,
                servicos,
                beneficios,
                duracao,
                idhost,
                imagens // Passa as imagens como referências de caminho
            });

            res.status(201).json({ blOk: true, message: 'Intercâmbio cadastrado com sucesso!', intercambio });
        } catch (error) {
            console.error('Erro ao cadastrar intercâmbio:', error);
            res.status(500).json({ blOk: false, message: 'Erro ao cadastrar intercâmbio!' });
        }
    });
};

module.exports = { buscar, buscarPorId, cadastrar };
