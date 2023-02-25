const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas} = require('../helpers/db-validators');
const { validarArchivoSubir } = require('../middlewares');
const { validarCampos} = require('../middlewares/dataValidation');



const router = Router();



router.post('/',[
    validarArchivoSubir
], cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'No es un id valido').isMongoId(),
    
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos']) ),
    validarCampos

],actualizarImagenCloudinary );



router.get('/:coleccion/:id',[

    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos']) ),
    validarCampos

], mostrarImagen)


module.exports =router;