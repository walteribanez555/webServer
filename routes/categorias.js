const { Router, response, request } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias,obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categories');
const { validarJWT, validarCampos, esAdminRole} = require('../middlewares')
const { existeCategoriaPorId } = require('../helpers/db-validators');



const router = Router();


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias );


// Obtener una categoria por id -public
router.get('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);


//Crear una categoria  --Privado
router.post('/', [
    validarJWT,
    check('nombre','El nombre es requerido').not().isEmpty(),
    validarCampos
],  crearCategoria );

//Actualizar  - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria)


//Borrar una cateogria - Admin

router.delete('/:id', [
    validarJWT, 
    esAdminRole,
    check('id','No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);

module.exports =router;