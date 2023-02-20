const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google_verify");


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


const googleSignIn = async (req= request, res = response ) => {


    const { id_token} = req.body;


    try { 
        const {nombre, img, correo} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            //Tengo que crearlo

            const data = { 
                nombre,
                correo,
                password : ':)',
                img,
                google: true
            };

            usuario = new Usuario( data);
            await usuario.save();
        }

        //Si el usuario en DB 
        if ( !usuario.estado){
            return res.status(401).json({
                msg:'El usuario esta dado de baja'
            });
        }

        //Generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });


        
           
    }catch(error){
        res.status(400).json({
            ok: false,
            msg:"El token no se pudo verificar"
        })
    }
}




module.exports = { 
    login,
    googleSignIn
}