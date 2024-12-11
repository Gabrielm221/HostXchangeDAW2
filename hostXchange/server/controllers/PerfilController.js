const bcrypt = require('bcrypt');
const perfilDAO = require('../dao/PerfilDAO');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const saltRounds = 10;

/**
 * @swagger
 * /atualizar-perfil:
 *   post:
 *     summary: Atualiza o perfil do usuário, incluindo dados pessoais e fotos.
 *     description: Este endpoint permite ao usuário atualizar seu perfil, incluindo dados pessoais como nome, e-mail, redes sociais e fotos de perfil/capa. A senha também pode ser alterada se fornecida.
 *     requestBody:
 *       description: Dados para atualizar o perfil do usuário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID do usuário a ser atualizado.
 *               nome:
 *                 type: string
 *                 description: Nome completo do usuário.
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do usuário.
 *               senha:
 *                 type: string
 *                 description: Nova senha do usuário (opcional).
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário.
 *               rg:
 *                 type: string
 *                 description: RG do usuário.
 *               nrpassa:
 *                 type: string
 *                 description: Número do passaporte do usuário.
 *               facebook:
 *                 type: string
 *                 description: Link do perfil no Facebook.
 *               twitter:
 *                 type: string
 *                 description: Link do perfil no Twitter.
 *               instagram:
 *                 type: string
 *                 description: Link do perfil no Instagram.
 *               linkedin:
 *                 type: string
 *                 description: Link do perfil no LinkedIn.
 *               fotoPerfil:
 *                 type: string
 *                 format: binary
 *                 description: Foto de perfil do usuário (opcional).
 *               fotoCapa:
 *                 type: string
 *                 format: binary
 *                 description: Foto de capa do usuário (opcional).
 *     responses:
 *       200:
 *         description: Perfil do usuário atualizado com sucesso.
 *       500:
 *         description: Erro ao atualizar o perfil.
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
 *     summary: Recupera o perfil do usuário.
 *     description: Este endpoint retorna as informações do perfil de um usuário específico, com base no ID do usuário.
 *     requestBody:
 *       description: Dados para recuperar o perfil do usuário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: integer
 *                 description: ID do usuário cujo perfil será retornado.
 *     responses:
 *       200:
 *         description: Perfil do usuário recuperado com sucesso.
 *       500:
 *         description: Erro ao recuperar o perfil.
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
