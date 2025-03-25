const { Cuenta } = require("../models");

const bcrypt = require("bcryptjs");
const CuentaImpedimientos = require("../models/CuentaImpedimientos");
const CuentaPreferencias = require("../models/CuentaPreferencias");

const getCuentaById = async (req, res) => {
    try {
        const { id } = req.params;

        const cuenta = await Cuenta.findByPk({
            id,
            include: [{
                model: CuentaImpedimientos, as: "CuentaImpedimientos",
                include: [{ model: Producto, as: "Producto" }]
            }],
            include: [{
                model: CuentaPreferencias, as: "CuentaPreferencias",
                include: [{ model: Producto, as: "Producto" }]
            }]
        });

        if(!cuenta){
        res.status(404).json({error: "Cuenta no encontrada"});

        }

        res.status(200).json(cuenta);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const addCuenta = async (req, res) => {
    try {
        const { nombreUsuario,
            email,
            nombre,
            password,
            ProductosP,
            ProductosI,
            // fotoPerfil
        } = req.body;        

        const cuenta= await Cuenta.create({nombreUsuario, 
            email, 
            nombre, 
            password,
            // fotoPerfil
        })

        const preferencias=[]
        const impedimentos=[]

        //Preferencias
        for(const item of ProductosP){
            const Producto = await producto.findByPk(item.id)
            if(!Producto){
                return res.status(404).json({error: "Producto no encontrado"});
            }

            const preferencia = await CuentaPreferencias.create({
                cuentaId: cuenta.id,
                productoId: item.id
            })

            preferencias.push(preferencia)
        }
      
        //Impedimentos
        for(const item of ProductosI){
            const Producto = await producto.findByPk(item.id)
            if(!Producto){
                return res.status(404).json({error: "Producto no encontrado"});
            }

            const impedimento = await CuentaImpedimientos.create({
                cuentaId: cuenta.id,
                productoId: item.id
            })

            impedimentos.push(impedimento)
        }
        return res.status(201).json(cuenta, preferencias, impedimentos);


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const updateCuenta = async (req, res) => {
    try {
        const{id}=req.params;
        const{
            nombreUsuario, 
            email, 
            nombre, 
            password,
            // fotoPerfil
        } = req.body;
        const cuenta = await Usuario.findByPk(id);

        if (!cuenta) {
            return res.status(404).json({ message: "usuario no encontrado" });
        }
        if(nombreUsuario) cuenta.nombreUsuario=nombreUsuario;
        if(nombre) cuenta.nombre=nombre;
        if(email) cuenta.email=email;
        if(password) cuenta.password=password;
        // if (fotoPerfil) cuenta.fotoPerfil=fotoPerfil;

        await cuenta.save();
        return res.status(200).json({ message: "Usuario actualizado", usuario });


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const desactivarCuenta = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca la cuenta por su clave primaria
        const cuenta = await Cuenta.findByPk(id);

        // Si no existe, devuelve un error 404
        if (!cuenta) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Cambia el estado a "Inactivo" en lugar de eliminar el registro
        cuenta.estado = "Inactivo";
        await cuenta.save();

        return res.status(200).json({ message: "Usuario desactivado correctamente" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getCuentaById, addCuenta, updateCuenta, desactivarCuenta };