const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');




const usuariosGet = async(req = request, res = response) =>{
    
    const { limit =5, from = 0} = req.query;
    const query= {estado: true};


    


    const [ total , usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(from))
            .limit(Number(limit))   
    ]
    );

    res.json({
        total,
        usuarios

    });
}

const usuariosPost = async(req,res = response)=> {

    

    const {nombre , correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });




    // Verificar si el correo existe




    //Encriptar el password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt );



    //Guardar en DB
    
    await usuario.save();    



    res.json({
        usuario
    })

}

const usuariosPut = async(req, res= response) => {


    const { id } = req.params;
    const { _id, password,google,correo, ...resto } = req.body;


    // TODO validar contra base de datos
    if( password) { 
        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );




    res.json(usuario);
}

const  usuariosDelete = async(req = request, res= response) => {


    const { id } = req.params;  

    

    const query = {estado : false}

    // Fisicamente lo borramos

    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate( id , query);




    res.json(usuario);
}
 

const usuariosPatch = (req, res=response)=> { 
    res.json({
        msg:'Patch Api -Controlador'
    })
}


module.exports  = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}

