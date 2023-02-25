const  { Router } =  require('express');
const { check, checkSchema } = require('express-validator');
const Role = require('../models/role')


const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch 
    } = require('../controllers/usuarios');
const { esRoleValido, esEmailValido, existeUsuarioPorId } = require('../helpers/db-validators');


// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
// const { validarCampos} = require('../middlewares/dataValidation');

const {validarJWT, tieneRole, esAdminRole, validarCampos} = require('../middlewares');



const router = Router();


router.get('/',usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId), 
    check('rol').custom( esRoleValido),
     
    validarCampos
    ]
    ,usuariosPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y mas de 6 letras').isLength({ min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('rol').custom(  esRoleValido ),
    check('correo').custom( esEmailValido),
    validarCampos
],usuariosPost);

router.delete('/:id',
[   
    
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId), 
    validarCampos

]
,usuariosDelete);

router.patch('/',usuariosPatch);





module.exports = router;