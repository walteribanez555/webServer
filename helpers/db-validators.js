const Role = require('../models/role');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');


const esRoleValido = async(rol = '') => {


    const existeRol = await Role.findOne({rol});
    if( !existeRol) { 
        throw new Error(`El rol ${rol} no esta registrado en la BD`);

    }
}

const esEmailValido = async(correo = '')=> { 
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`El email ${correo} ya se encuentra ocupado en la DB`);
    }
}

const existeUsuarioPorId = async( id )=> { 
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}



module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId
}