require("dotenv").config();
//nuestra dependencia para correr el api
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const CuentaRoutes = require("./routes/CuentaRoutes");
const ProductoRoutes = require("./routes/ProductoRoutes");
const ListaCompraRoutes = require("./routes/ListaCompraRoutes");
const ComentarioRoutes = require("./routes/ComentariosRoutes");
const RecetaRoutes = require("./routes/RecetaRoutes");

const app = express();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use("/cuenta", CuentaRoutes)
app.use("/producto", ProductoRoutes)
app.use("/lista", ListaCompraRoutes)
app.use("/comentario", ComentarioRoutes);
app.use("/receta", RecetaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})