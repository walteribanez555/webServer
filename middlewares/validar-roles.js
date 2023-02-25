const { response, request } = require("express");
const role = require("../models/role");

const esAdminRole = ( req = request, res= response, next) => {

    if ( !req.usuario){ 
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el token primero',
        });

    }

    const { rol , nombre } = req.usuario;

    if( rol !=='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }


    next();
}


const  tieneRole = (...roles) => { 

    

    return (req =request, res=response, next) => {

        if( !req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar ',
            });
        }

        if( !roles.includes( req.usuario.rol)){
            return res.status(401).json({
                msg:`Rol no autorizado ${req.usuario.rol}`,
            })
        }

        next();
    }

}


module.exports = { 
    esAdminRole,
    tieneRole
}