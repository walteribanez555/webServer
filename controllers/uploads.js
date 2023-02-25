const path = require('path');
const { request, response } = require("express");
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);


const { subirArchivo } = require("../helpers");
const { Usuario, Producto} = require("../models");

const cargarArchivo = async( req= request, res = response)=> { 
    
  


    try{
        const nombreArchivo  = await subirArchivo({files : req.files, carpeta : 'Imgs'} );

        res.json({
            nombre:nombreArchivo
        });
    }catch(error){
        res.status(401).json({
            error
        })
    }
    

}


const actualizarImagen= async ( req= request, res = response)=> { 


   
    const { id, coleccion} = req.params;

    let modelo;


    switch(coleccion) { 

        case 'usuarios':

            modelo = await Usuario.findById(id);

            if(!modelo) { 
                return res.status(400).json({
                    msg: `No existe el usuario con el id ${id}`
                })
            };

        break;
            
        case 'productos':

            modelo = await  Producto.findById(id);

            if(!modelo) { 
                return res.status(400).json({
                    msg: `No existe el producto con el id ${id}`
                })
            };

                
        break;


        default: 
            return res.status(500).json({msg: "Se me olvido validar esto"});
        break;


    }

    if( modelo.img){
        // Borrar la imagen del servidor

        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync( pathImagen);
        }
    }

    const nombre = await subirArchivo({files : req.files, carpeta : coleccion});

    modelo.img = nombre;


    await modelo.save()


    res.json(modelo);

}

const actualizarImagenCloudinary= async ( req= request, res = response)=> { 


   
    const { id, coleccion} = req.params;

    let modelo;


    switch(coleccion) { 

        case 'usuarios':

            modelo = await Usuario.findById(id);

            if(!modelo) { 
                return res.status(400).json({
                    msg: `No existe el usuario con el id ${id}`
                })
            };

        break;
            
        case 'productos':

            modelo = await  Producto.findById(id);

            if(!modelo) { 
                return res.status(400).json({
                    msg: `No existe el producto con el id ${id}`
                })
            };

                
        break;


        default: 
            return res.status(500).json({msg: "Se me olvido validar esto"});
        break;


    }

    if( modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.length -1];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id);
    }

    const { tempFilePath }= req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath)

    modelo.img = secure_url;
   

    await modelo.save();


    res.json(modelo);

}


const mostrarImagen = async( req= request, res = response)=> { 
    const { id, coleccion} = req.params;

    let modelo;


    switch(coleccion) { 

        case 'usuarios':

            modelo = await Usuario.findById(id);

            if(!modelo) { 
                return res.status(400).json({
                    msg: `No existe el usuario con el id ${id}`
                })
            };

        break;
            
        case 'productos':

            modelo = await  Producto.findById(id);

            if(!modelo) { 
                return res.status(400).json({
                    msg: `No existe el producto con el id ${id}`
                })
            };

                
        break;


        default: 
            return res.status(500).json({msg: "Se me olvido validar esto"});
        break;


    }

    if( modelo.img){
        // Borrar la imagen del servidor

        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile( pathImagen)
        }
    }

    const pathImagen = path.join(__dirname,'../assets/no-image.jpg');

    return res.sendFile( pathImagen);
}


module.exports = { 
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}