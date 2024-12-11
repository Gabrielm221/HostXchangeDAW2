const bcrypt = require('bcrypt');
const perfilDAO = require('../dao/PerfilDAO');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const saltRounds = 10;

// Configuração base do diretório de upload
const uploadsDir = path.join(__dirname, '../../public/assets/usuarios');

// Configuração do multer para salvar as imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userFolder = path.join(uploadsDir, `user_${req.body.userId}`);
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }
        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nome único para cada arquivo
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB por arquivo
}).fields([
    { name: 'fotoPerfil', maxCount: 1 },
    { name: 'fotoCapa', maxCount: 1 }
]);

/**
 * @swagger
 * /atualizar-perfil:
 *   post:
 *     summary: Atualizar o perfil completo de um usuário
 *     description: Atualiza o perfil de um usuário, incluindo nome, email, senha, imagens de perfil e capa.
 *     operationId: atualizarPerfil
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados para atualizar o perfil do usuário.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: ID do usuário.
 *               example: "12345"
 *             nome:
 *               type: string
 *               description: Nome do usuário.
 *               example: "João Silva"
 *             email:
 *               type: string
 *               description: E-mail do usuário.
 *               example: "joao.silva@example.com"
 *             senha:
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
 *             nrpassa:
 *               type: string
 *               description: Número do passaporte do usuário.
 *               example: "AB123456"
 *             facebook:
 *               type: string
 *               description: URL do perfil do Facebook.
 *               example: "https://www.facebook.com/joaosilva"
 *             twitter:
 *               type: string
 *               description: URL do perfil do Twitter.
 *               example: "https://twitter.com/joaosilva"
 *             instagram:
 *               type: string
 *               description: URL do perfil do Instagram.
 *               example: "https://www.instagram.com/joaosilva"
 *             linkedin:
 *               type: string
 *               description: URL do perfil do LinkedIn.
 *               example: "https://www.linkedin.com/in/joaosilva"
 *             fotoPerfil:
 *               type: file
 *               description: Foto de perfil do usuário.
 *               required: false
 *             fotoCapa:
 *               type: file
 *               description: Foto de capa do perfil do usuário.
 *               required: false
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Perfil atualizado com sucesso!'
 *       500:
 *         description: Erro ao atualizar o perfil.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao atualizar perfil!'
 */
const atualizarPerfil = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Erro ao fazer upload das imagens:', err);
            return res.status(500).json({ blOk: false, message: 'Erro ao fazer upload das imagens!' });
        }

        try {
            const { userId, nome, email, senha, cpf, rg, nrpassa, facebook, twitter, instagram, linkedin } = req.body;
            let blOk = true, message = '';

            // Paths das imagens de perfil e capa
            const profileImagePath = req.files.fotoPerfil ? `/assets/usuarios/user_${userId}/${req.files.fotoPerfil[0].filename}` : null;
            const coverImagePath = req.files.fotoCapa ? `/assets/usuarios/user_${userId}/${req.files.fotoCapa[0].filename}` : null;

            let perfilData = { nome, email, cpf, rg, nrpassa, facebook, twitter, instagram, linkedin };

            if (profileImagePath) perfilData.fotoPerfil = profileImagePath;
            if (coverImagePath) perfilData.fotoCapa = coverImagePath;

            // Se a senha for enviada, criptografa antes de atualizar
            if (senha) {
                bcrypt.hash(senha, saltRounds, async (err, hashedPassword) => {
                    if (err) {
                        console.log(err);
                        message = 'Erro ao criptografar a senha!';
                        return res.json({ blOk: false, message });
                    }

                    // Atualizar o perfil com a senha criptografada
                    perfilData.senha = hashedPassword;
                    const perfil = await perfilDAO.atualizarPerfil(userId, perfilData);
                    res.status(200).json(perfil);
                });
            } else {
                // Se não houver alteração de senha, atualiza apenas os outros campos
                const perfil = await perfilDAO.atualizarPerfil(userId, perfilData);
                res.status(200).json(perfil);
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            res.status(500).json({ blOk: false, message: 'Erro ao atualizar perfil!' });
        }
    });
};

/**
 * @swagger
 * /perfil:
 *   post:
 *     summary: Buscar o perfil de um usuário
 *     description: Recupera as informações do perfil de um usuário, incluindo suas fotos de perfil e capa.
 *     operationId: perfil
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Dados para buscar o perfil do usuário.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             idUser:
 *               type: string
 *               description: ID do usuário.
 *               example: "12345"
 *     responses:
 *       200:
 *         description: Perfil encontrado.
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               example: "12345"
 *             nome:
 *               type: string
 *               example: "João Silva"
 *             email:
 *               type: string
 *               example: "joao.silva@example.com"
 *             fotoPerfil:
 *               type: string
 *               example: "/assets/usuarios/user_12345/filename.jpg"
 *             fotoCapa:
 *               type: string
 *               example: "/assets/usuarios/user_12345/cover.jpg"
 *       500:
 *         description: Erro ao buscar perfil.
 *         schema:
 *           type: object
 *           properties:
 *             blOk:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: 'Erro ao buscar perfil!'
 */
const perfil = async (req, res) => {
    try {
        const { idUser } = req.body;
        const dados = await perfilDAO.perfil(idUser);
        res.status(200).json(dados);
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ blOk: false, message: 'Erro ao buscar perfil!' });
    }
};

module.exports = { atualizarPerfil, perfil };
