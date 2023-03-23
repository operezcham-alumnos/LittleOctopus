const http = require("http");

const PORT = 3000;

const fs = require("fs");

const mensajes = [
  {
    id:"0",
    usuario: "servidor",
    texto: "saludos, envie su mensaje",
    fecha: "2023-2-2",
  },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/mensajesLista") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(mensajes));
  } else if (req.method === "GET" && req.url === "/") {
    const paginaHtmlPath = "./index.html";
    const paginaHtml = fs.readFileSync(paginaHtmlPath, "utf8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(paginaHtml);
  } else if (req.method === "POST" && req.url === "/mensajesNuevo") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const nuevoMensaje = JSON.parse(body);
      let mensaje = {
        id:mensajes[mensajes.length-1].id+1,
        texto: nuevoMensaje,
        usuario: "anonimo",
        fecha: Date(),
      };
      mensajes.push(mensaje);
      //mensajes.texto=nuevoMensaje;
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(mensaje));
    });
  }
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
