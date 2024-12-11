const express = require('express');
const perfil = require('../controllers/PerfilController');
const router = express.Router();

router.post('/listaPerfil'    , perfil.perfil         );
router.post('/atualizarPerfil', perfil.atualizarPerfil);

module.exports = router;