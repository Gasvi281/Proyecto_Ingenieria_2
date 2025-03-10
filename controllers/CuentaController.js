const { Cuenta } = require("../models");

const getCuentaById = async (req, res) => {
        const cuenta = await Cuenta.findOne({where: {id}});

        if(!cuenta){
        res.status(404).json({error: "uPS"});
        }

        res.status(201).json(cuenta);
    
}

const addCuenta=async(req, res)=>{
    try {
        const {nombreUsuario, 
            email, 
            nombre, 
            fotoPerfil, 
            preferencias, 
            impedimentos}= req.body;

        const cuenta= await Cuenta.create({nombreUsuario, 
            email, 
            nombre, 
            fotoPerfil, 
            preferencias, 
            impedimentos})
        res.status(201).json(cuenta);


    }catch(error){
        res.status(500).json({error: "No se creo la cuenta"})
    }
}


const updateCuenta=async(req, res)=>{
    try {
        const{id}=req.params;
        const{
            nombreUsuario, 
            email, 
            nombre, 
            fotoPerfil, 
            preferencias, 
            impedimentos}= req.body;
        const cuenta=await Usuario.findByPk(id);

        if(!cuenta){
            return res.status(404).json({message: "usuario no encontrado"});
        }
        if(nombreUsuario) cuenta.nombreUsuario=nombreUsuario;
        if(nombre) cuenta.nombre=nombre;
        if(email) cuenta.email=email;
        if (fotoPerfil) cuenta.fotoPerfil=fotoPerfil;
        if(preferencias) cuenta.preferencias=preferencias;
        if(impedimentos) cuenta.impedimentos=impedimentos;

        await cuenta.save();
        return res.status(200).json({message: "Usuario actualizado", usuario});


    }catch(error){
        res.status(500).json({error: error.message})
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