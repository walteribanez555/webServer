

const validaCampos = require('../middlewares/validar-jwt');
const validarJWT = require('../middlewares/validar-roles');
const validaRoles = require('../middlewares/dataValidation');


module.exports = { 
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
}
