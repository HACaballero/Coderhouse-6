var moment = require("moment");

let mensajes = [
	{
		email: "test@gmail.com",
		date: "12/2/2022 20:32:21",
		mensaje: "Hola",
	},
];

function socketChat(io, socket) {
	socket.on("nuevo_mensaje", (data) => {
		data.date = moment().toString();
		mensajes.push(data);
		io.sockets.emit("mensajes", mensajes);
	});
}

module.exports = {
	mensajes,
	socketChat,
};
