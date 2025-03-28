const { ListaCompra, Producto, ProductosLista} = require("../models");

const addListaCompra = async (req, res) =>{
    try {
        const {cuenta_id, productosL} = req.body;

        const listaCompra = await ListaCompra.create({cuenta_id});

        const productosLista = [];

        for(const i of productosL){
            const producto = await Producto.findByPk(i.id);
            if(!producto){
                res.status(404).json({error: "Producto no encontrado"});
            }

            const productoLista = await ProductosLista.create({
                listaId: listaCompra.id,
                productoId: i.id,
                cantidad: i.cantidad
            });

            productosLista.push(productoLista);
        }

        res.status(201).json(listaCompra, productosLista);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getListaById = async(req, res) =>{
    try {
        const {id} = req.params;

        const lista = ListaCompra.findByPk({
            id,
            include: [{
                model: ProductosLista, as: "ProductosLista",
                include: [{ model: Producto, as: "Producto"}]
            }]
        });

        if(!lista){
            res.status(404).json({error: "Lista no encontrada"});
        }

        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {addListaCompra, getListaById};