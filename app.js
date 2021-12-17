const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;

//Conexion a base de datos
const mongoose = require("mongoose");

const user = "youtubevet";
const password = "Ujf74IK5PDpujzuA";
const dbname ="veterinaria";
const uri = `mongodb+srv://${user}:${password}@cluster0.eyxv1.mongodb.net/${dbname}?retryWrites=true&w=majority`;

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
