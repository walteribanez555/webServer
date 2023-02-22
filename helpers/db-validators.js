
const {Role, Usuario, Categoria, Producto } = require('../models');

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


const existeCategoriaPorId = async ( id = ' ')=> {
    const existeCategoria = await Categoria.findById(id);

    if(!existeCategoria){
        throw new Error(`La categoria ${id} no se encuentra`);
    }

}


const existeProductoPorId = async( id = '') => {
    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`El producto ${id} no se encuentra`);
    }
}

//Para validar colecciones permitidas


const coleccionesPermitidas = ( coleccion = '', colecciones = [])=> { 


    const incluida = colecciones.includes( coleccion );

    if( !incluida) { 
        throw new Error(`La coleccion ${coleccion} no es permitida , ${colecciones}`)
    }

    return true;
}



module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}