const { json } = require("body-parser");
const { Cuenta, Producto, CuentaImpedimientos, CuentaPreferencias } = require("../models");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");

const getCuentaById = async (req, res) => {
    try {
        const { id } = req.params;

        const cuenta = await Cuenta.findByPk(id, {
            include: [
                {
                    model: CuentaImpedimientos,
                    as: "impedimentos",
                    include: [{ model: Producto, as: "producto" }]
                },
                {
                    model: CuentaPreferencias,
                    as: "preferencias",
                    include: [{ model: Producto, as: "producto" }]
                }, 
                // { 
                //     model: ListaCompra,
                //     as: "lista", // Verifica que este alias coincida con el definido en las asociaciones
                //     include: [
                //         {
                //             model: ProductosLista,
                //             as: "elementosLista",
                //             include: [
                //                 {
                //                     model: Producto,
                //                     as: "producto" // Alias definido en ProductosLista.belongsTo(models.Producto)
                //                 }
                //             ]
                //         }
                //     ]
                // }
            ]
        });

        if (!cuenta) {
            return res.status(404).json({ error: "Cuenta no encontrada" });
        }

        return res.status(200).json(cuenta);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getCuentaByNombreUsuario = async (req, res) => {
    try {
        const { nombreUsuario } = req.params;

        const cuenta = await Cuenta.findOne({where: {nombreUsuario}}, {
            include: [
                {
                    model: CuentaImpedimientos,
                    as: "impedimentos",
                    include: [{ model: Producto, as: "producto" }]
                },
                {
                    model: CuentaPreferencias,
                    as: "preferencias",
                    include: [{ model: Producto, as: "producto" }]
                },
                {
                    model: ListaCompra,
                    as: "lista", // Verifica que este alias coincida con el definido en las asociaciones
                    include: [
                        {
                            model: ProductosLista,
                            as: "elementosLista",
                            include: [
                                {
                                    model: Producto,
                                    as: "producto" // Alias definido en ProductosLista.belongsTo(models.Producto)
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!cuenta) {
            return res.status(404).json({ error: "Cuenta no encontrada" });
        }

        return res.status(200).json(cuenta);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const agregarPreferencia = async (req, res) => {
    try {
        const { id } = req.params
        const { productoId } = req.body
        const cuenta = await Cuenta.findByPk(id)

        if (!cuenta) {
            return res.status(404).json({ error: "Cuenta no encontrada" })
        }

        const existe = await CuentaPreferencias.findOne({ where: { cuentaId: id, productoId } })

        if(existe && existe.estado === "Inactivo"){
            existe.estado = "Activo";
            return res.status(200).json(existe);
        }

        if (existe) {
            return res.status(400).json({ error: "Producto ya en preferencias" })
        }

        const nuevaPreferencia = await CuentaPreferencias.create({
            cuentaId: id,
            productoId: productoId,
        })

        return res.status(201).json(nuevaPreferencia)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const eliminarPreferencia = async (req, res) => {
    try {
        const { id } = req.params
        const { productoId } = req.body
        const cuenta = await Cuenta.findByPk(id)

        if (!cuenta) {
            return res.status(404).json({ error: "Cuenta no encontrada" })
        }

        const existe = await CuentaPreferencias.findOne({ where: { cuentaId: id, productoId } })

        if (!existe) {
            return res.status(400).json({ error: "Producto no encontrado" })
        }

        existe.estado = "Inactivo";
        await existe.save();

        return res.status(200).json({ message: "Preferencia eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const agregarImpedimento = async (req, res) => {
    try {
        const { id } = req.params;
        const { productoId } = req.body;
        const cuenta = await Cuenta.findByPk(id);

        if (!cuenta) {
            return res.status(404).json({ error: "Cuenta no encontrada" });
        }

        const existe = await CuentaImpedimientos.findOne({ where: { cuentaId: id, productoId } });

        if(existe && existe.estado === "Inactivo"){
            existe.estado = "Activo";
            return res.status(200).json(existe);
        }

        if (existe) {
            return res.status(400).json({ error: "Producto ya en lista" });
        }

        const nuevoImpedimento = await CuentaImpedimientos.create({
            cuentaId: id,
            productoId: productoId,
        })

        return res.status(201).json(nuevoImpedimento);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const eliminarImpedimento = async (req, res) => {
    try {
        const { id } = req.params;
        const { productoId } = req.body;
        const cuenta = await Cuenta.findByPk(id);

        if (!cuenta) {
            return res.status(404).json({ error: "Cuenta no encontrada" });
        }

        const existe = CuentaImpedimientos.findOne({ where: { cuentaId: id, productoId } });

        if (!existe) {
            return res.status(400).json({ error: "Producto no en lista" });
        }

        existe.estado = "Inactivo";
        await existe.save();

        return res.status(200).json({message: "Impedimento eliminado correctamente"});
    } catch (error) {
        return res.status(500).json({error: error.message});
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

        const preferencias = []
        const impedimentos = []
 
        //Preferencias
        for (const item of ProductosP) {
            const producto = await Producto.findByPk(item.id)
            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            const preferencia = await CuentaPreferencias.create({
                cuentaId: cuenta.id,
                productoId: item.id
            })

            preferencias.push(preferencia)
        }
      
        //Impedimentos
        for (const item of ProductosI) {
            const producto = await Producto.findByPk(item.id)
            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            const impedimento = await CuentaImpedimientos.create({
                cuentaId: cuenta.id,
                productoId: item.id
            })

            impedimentos.push(impedimento)
        }
        return res.status(201).json(cuenta);


    } catch (error) {
        return res.status(500).json({ error: error })
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
        return res.status(500).json({ error: error.message })
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
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getCuentaById,
    getCuentaByNombreUsuario,
    addCuenta,
    updateCuenta,
    desactivarCuenta,
    agregarPreferencia,
    eliminarPreferencia,
    agregarImpedimento,
    eliminarImpedimento
};