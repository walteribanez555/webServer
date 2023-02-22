

const validaCampos = require('../middlewares/validar-jwt');
const validarJWT = require('../middlewares/validar-roles');
const validaRoles = require('../middlewares/dataValidation');
const validarArchivoSubir = require('../middlewares/validarArchivo')

module.exports = { 
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivoSubir
}
