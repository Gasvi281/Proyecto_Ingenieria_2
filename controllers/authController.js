const { Cuenta } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async(req, res)=>{
    try {
        const { nombreUsuario, password } = req.body;

        const cuenta = await Cuenta.findOne({where: {nombreUsuario}});

        if(!cuenta){
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        const isCorrectPassword = await bcrypt.compare(password, cuenta.password); 
        if(!isCorrectPassword){
            return res.status(401).json({error: "contraseña incorrecta"});
        }

        const token = jwt.sign(
            { id: cuenta.id, nombreUsuario: cuenta.nombreUsuario},
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        );

        return res.json({ token, id: cuenta.id });


    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = { login }