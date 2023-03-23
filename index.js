const http = require("http");

const PORT = 3000;

const fs = require("fs");

const mensajes = [
  {
    id:1,
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
      let identificador=mensajes[mensajes.length-1].id + 1;
      let mensaje = {
        id: identificador,
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
  } else if (req.method === 'DELETE' && req.url.startsWith('/mensajeBorrar/')) {
      const idMensaje = req.url.split('/')[2];
      const indiceMensaje = mensajes.findIndex(m => m.id === parseInt(idMensaje));
      if (indiceMensaje >= 0){
        mensajes.splice(indiceMensaje, 1);
        res.statusCode = 204;
        res.end();
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', "text/plain")
        res.end('Mensaje no encontrado');
        }
      }else {
        res.statusCode = 404;
        res.setHeader('Content-Type', "text/plain")
        res.end("Página encontrada");
      }
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
