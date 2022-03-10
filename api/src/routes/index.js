const { Router } = require('express');
const countries=require('./countries')
const activity=require('./activity')
const user=require('./user');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries',countries)
router.use('/activity',activity)
router.use('/auth',user)


module.exports = router;
