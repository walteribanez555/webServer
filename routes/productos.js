const { Router, response, request } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole} = require('../middlewares')
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const {obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
} = require('../controllers/productos');


const router = Router();


// Obtener todas las categorias - publico
router.get('/', obtenerProductos );


// Obtener una categoria por id -public
router.get('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);


//Crear una categoria  --Privado
router.post('/', [
    validarJWT,
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],  crearProducto );

//Actualizar  - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    // check('categoria','No es un id de Mongo').isMongoId(),
    // check('precio','El precio debe ser entero' ).isNumeric(),
    check('id').custom(existeProductoPorId),
    
    validarCampos
], actualizarProducto)


//Borrar una cateogria - Admin

router.delete('/:id', [
    validarJWT, 
    esAdminRole,
    check('id','No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports =router;