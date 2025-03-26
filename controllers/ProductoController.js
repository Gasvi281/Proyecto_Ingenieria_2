const { Producto }= require("../models")

const getProductoById= async(req, res)=>{
    const {id}=req.params;

    const producto= await Producto.findOne({where: {id}});

    if(!producto){
        res.status(404).json({error:"No existe este producto."});
    }

    res.status(200).json(producto);
}

const getProductoByNombre = async(req, res)=>{
    const{nombreProducto} = req.params;

    const producto = await Producto.findOne({where: {nombre}});

    if(!producto){
        res.status(404).json({error: "Producto no encontrado"});
    }

    res.status(200).json(producto);
}

const addProducto=async(req, res)=>{
    try {
        const {nombreProducto,
            categoria,
        }= req.body;

        const producto= await Producto.create({nombreProducto,
            categoria, 
        })
        res.status(201).json(producto);


    }catch(error){
        res.status(500).json({error: "No se creo el producto"})
    }
}

module.exports = {getProductoById, getProductoByNombre, addProducto};