const express = require("express");
const bodyParser = require("body-parser")
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require("dotenv").config()

const port = process.env.PORT || 3000;

//Conexion a base de datos
const mongoose = require("mongoose");


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.eyxv1.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

async function main() {
  await mongoose.connect(uri);
}
main().catch(err => console.log(err))
.then(() => console.log("base de datos conectada"))

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views","./views");

app.use(express.static(__dirname + "/public"));
//rutas web
app.use("/", require("./router/rutasweb"));
app.use("/mascotas", require("./router/Mascotas"));

app.use((req, res, next) =>{
    res.status(404).render("404", {
        titulo : "404",
        descripcion: "titulo del sitio web"
    })
});

app.listen(port, () =>{
    console.log("servidor a su servicio en el puerto", port);
});
