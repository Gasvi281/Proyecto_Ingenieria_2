const { Producto }= require("../models")

const getProductoById= async(req, res)=>{
    const {id}=req.params;

    const producto= await Producto.findOne({where: {id}});

    if(!producto){
        return res.status(404).json({error:"No existe este producto."});
    }

    return res.status(200).json(producto);
}

const getProductos= async(req, res)=>{
    try{
        const productos = await Producto.findAll();
        
        return res.status(200).json(productos);
    }catch(error){
        return res.status(404).json({error: "No se encontraron los productos"})

    }
}

const getProductoByNombre = async(req, res)=>{
    const{nombreProducto} = req.params;

    const producto = await Producto.findOne({where: {nombreProducto}});

    if(!producto){
        return res.status(404).json({error: "Producto no encontrado"});
    }

    return res.status(200).json(producto);
}

const addProducto=async(req, res)=>{
    try {
        const {nombreProducto,
            categoria,
        }= req.body;

        const producto= await Producto.create({nombreProducto,
            categoria, 
        })
        return res.status(201).json(producto);


    }catch(error){
        return res.status(500).json({error: "No se creo el producto"})
    }
}

module.exports = {getProductoById, getProductoByNombre, addProducto, getProductos};