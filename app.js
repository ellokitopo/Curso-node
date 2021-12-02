const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
// Motor de plantilla
app.set("view engine", "ejs");
app.set("views","./views");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) =>{
    //console.log(__dirname)
    res.render("index", {titulo: "mi titulo dinamico"});
});

app.get("/servicios", (req, res) =>{
    res.render("servicios",{tituloServicios: "Este es un mensaje dinamico de servicios"});
})

app.get("/footer", (req, res) =>{
    res.render("footer", {titulofooter:"Este es un titulo dinamico para footer"});
});

app.use((req, res, next) =>{
    res.status(404).render("404", {
        titulo : "404",
        descripcion: "titulo del sitio web"
    })
});

app.listen(port, () =>{
    console.log("servidor a su eservicio en el puerto", port);
});
