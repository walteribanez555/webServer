const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async(req = request, res = response) => {

    const  { correo, password }  = req.body;


    try { 



        // verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if( !usuario) { 
            return res.status(400).json({
                msg:"Credenciales incorrectos",
            })
        };

        //Si el usuario esta activo
        if( !usuario.estado) {
            return res.status(400).json({
                msg:"El usuario a sido dado de baja, conectese con el admin",
            })
        }


        //verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword) {
            return res.status(400).json({
                msg: 'Password es incorrecto'
            })
        }



        // Generar el  JWT
        const token = await generarJWT(usuario.id);


        
        
        res.json({
            usuario,
            token,
            
        })

    }
    catch ( error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error en el servidor",
        })

    }

    
}




module.exports = { 
    login
}