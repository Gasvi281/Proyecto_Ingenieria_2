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

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombreProducto,
            categoria,
        } = req.body;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: "producto no encontrado" });
        }
        if (nombreProducto) producto.nombreProducto = nombreProducto;
        if (categoria) producto.categoria = categoria;

        await producto.save();
        return res.status(200).json({ message: "Producto actualizado", producto });


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
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

const desactivarProducto = async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario recibido en la URL
        const { estado } = req.body; // Estado recibido en el cuerpo de la petición

        // Validar que el estado sea "Activo" o "Inactivo"
        if (!["Activo", "Inactivo"].includes(estado)) {
            return res.status(400).json({ error: "Estado inválido. Use 'Activo' o 'Inactivo'." });
        }

        // Buscar el usuario por ID
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Actualizar el estado del usuario
        producto.estado = estado;
        await producto.save(); 

        res.json({ message: `Estado actualizado a ${estado}`, producto });
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};



module.exports = {getProductoById, getProductoByNombre, addProducto, getProductos, updateProducto, desactivarProducto};