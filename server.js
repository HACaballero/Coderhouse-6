const express = require("express");
var bodyParser = require("body-parser");
const { engine } = require("express-handlebars");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { mensajes, socketChat } = require("./chat.socket");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const { router, producto, ioObject } = require("./routes.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine(
	"handlebars",
	engine({
		layoutsDir: __dirname + "/views/layouts",
		partialsDir: __dirname + "/views/partials/",
	})
);
app.set("view engine", "handlebars");
app.use("/api/productos", router);

app.get("/", async (req, res) => {
	productos = await producto.getAll().then((productos) => {
		return productos;
	});
	productos = JSON.parse(JSON.stringify(productos));

	res.render("main", {
		layout: "index",
		list: productos,
		mensajes: mensajes,
		empty: productos.length == 0 ? true : false,
	});
});

app.get("/productos", async (req, res) => {
	productos = await producto.getAll().then((productos) => {
		return productos;
	});
	productos = JSON.parse(JSON.stringify(productos));
	res.render("productos", {
		layout: "index",
		list: encodeURIComponent(JSON.stringify(productos)),
		empty: productos.length == 0 ? true : false,
	});
});

httpServer.listen(8080, () => console.log("SERVER ON"));

io.on("connection", (socket) => {
	socketChat(io, socket);
});

ioObject(io);
