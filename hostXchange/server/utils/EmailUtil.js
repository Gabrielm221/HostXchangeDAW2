const nodemailer = require('nodemailer');

// Configuração do serviço de e-mail diretamente
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',       // Substitua pelo serviço SMTP que você vai usar
    port: 2525,             
    auth: {
        user: 'f9983661b04195',  // O e-mail remetente
        pass: '223c7ba5d9e356'      // A senha ou chave de app gerada
    }
});

/**
 * @swagger
 * paths:
 *   /email/sendEmail:
 *     post:
 *       summary: Envia um e-mail para o destinatário.
 *       description: Endpoint para enviar um e-mail com um assunto e corpo especificados.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 to:
 *                   type: string
 *                   description: O endereço de e-mail do destinatário.
 *                   example: "destinatario@exemplo.com"
 *                 subject:
 *                   type: string
 *                   description: O assunto do e-mail.
 *                   example: "Assunto do e-mail"
 *                 text:
 *                   type: string
 *                   description: O corpo do e-mail.
 *                   example: "Este é o corpo do e-mail enviado."
 *       responses:
 *         '200':
 *           description: E-mail enviado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "E-mail enviado com sucesso."
 *         '500':
 *           description: Erro ao enviar o e-mail.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Erro ao enviar e-mail."
 */
exports.sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'noreply.hostxchange@gmail.com',  // O remetente será o seu e-mail
        to: to,                      // Destinatário (e-mail do usuário)
        subject: subject,
        text: text                   // Corpo do e-mail
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Erro ao enviar e-mail:', err);
        } else {
            console.log('E-mail enviado:', info.response);
        }
    });
};
