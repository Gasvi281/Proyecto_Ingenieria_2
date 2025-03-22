const jwt = require("jsonwebtoken");

const authService = (req, res, next) =>{
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({error: "Token no autorizado"})
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ",""), process.env.JWT_SECRET);
        req.cuenta = decoded;
        next();
    } catch (error) {
        return res.status(403).json({error: "Token expirado"});
    }
}

module.exports = authService;