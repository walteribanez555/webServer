const { response, request } = require('express');


const usuariosGet = (req = request, res = response) =>{
    

    const {q,apiKey, nombre= ' No name', limit, page=1} = req.query;


    res.status(500).json({
        
        msg: 'get Api -controlador',
        q,
        nombre,
        apiKey,
        page,
        limit

    });
}

const usuariosPost = (req,res = response)=> {
    const { nombre , edad} = req.body;

    



    res.json({
        nombre,
        edad
    })

}

const usuariosPut = (req, res= response) => {


    const { id } = req.params;


    res.json({
        msg: 'put Api -Controlador',
        id
    })
}

const  usuariosDelete = (req, res= response) => {

    res.json({
        msg:'delete Api -Controlador'
    })
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

