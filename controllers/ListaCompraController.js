const { ListaCompra, Producto, ProductosLista, Cuenta} = require("../models");
const listaCompra = require("../models/listaCompra");

const addListaCompra = async (req, res) =>{
    try {
        const {cuenta_id, productosL} = req.body;

        if (!productosL || productosL.length === 0) {
            return res.status(400).json({ error: "Debes incluir al menos un producto" });
        }        

        const listaCompra = await ListaCompra.create({cuenta_id});

        const productosLista = [];

        for(const i of productosL){
            const producto = await Producto.findByPk(i.id);
            if(!producto){
                return res.status(404).json({error: "Producto no encontrado"});
            }

            const productoLista = await ProductosLista.create({
                listaId: listaCompra.id,
                productoId: i.id,
                cantidad: i.cantidad
            });

            productosLista.push(productoLista);
        }

        return res.status(201).json({listaCompra, productosLista});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getListaById = async(req, res) =>{
    try {
        const {id} = req.params;

        const lista = await ListaCompra.findOne({
            where: {cuentaId: id},
            include: [{
                model: ProductosLista, as: "elementosLista",
                include: [{ model: Producto, as: "Producto"}]
            }]
        });

        if(!lista){
            return res.status(404).json({error: "Lista no encontrada"});
        }

        return res.status(200).json(lista);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const agregarProducto = async (req, res) => {
    try {
        const { id } = req.params
        const { productoId, cantidad } = req.body
        const cuenta = await Cuenta.findByPk(id)

        if (!cuenta) {
            return res.status(404).json({ error: "Cuenta no encontrada" })
        }

        const listaExiste = await ListaCompra.findOne({ where: { cuentaId: id} })
        if (!listaExiste) {
            return res.status(404).json({ error: "esta cuenta no ha creado una lista" })
        }

        const productoExiste = await ProductosLista.findOne({ where: { listaId: listaExiste.id, productoId: productoId}})

        if(productoExiste && productoExiste.estado === "Inactivo"){
            existe.estado = "Activo";
            return res.status(200).json(existe);
        }

        if(productoExiste){
            return res.status(400).json({ error: "producto ya en lista"});
        }

        const nuevoProducto = await ProductosLista.create({
            listaId: listaExiste.id,
            productoId: productoId,
            cantidad: cantidad,
        });

        return res.status(201).json(nuevoProducto);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const eliminarProducto = async (req, res) => {
    try {
        const {id} = req.params;
        const {productoId} = req.body;

        const cuenta = await Cuenta.findByPk(id);

        if(!cuenta){
            return res.status(404).json({error: "Cuenta no encontrada"});
        }

        const listaExiste = await ListaCompra.findOne({where: {cuentaId: id}});

        if(!listaExiste){
            return res.status(404).json({error: "esta cuenta no ha creado una lista"});
        }

        const productoExiste = await ProductosLista.findOne({where: { listaId: listaExiste.id, productoId: productoId}});

        if(!productoExiste){
            return res.status(400).json({error: "No se puede eliminar un producto que no este en la lista"});
        }

        await productoExiste.destroy();

        return res.status(200).json({message: "Producto eliminado correctamente"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {addListaCompra, getListaById, agregarProducto, eliminarProducto};