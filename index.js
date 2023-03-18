const http = require('http');

const PORT = 3000;

const fs = require('fs');

const mensajes = [
  {"usuario":"servidor", "texto":"saludos, envie su mensaje", "fecha":"2023-2-2"}
];

const server = http.createServer((req, res) => {
 if (req.method === 'GET' && req.url === 'mensaje') {
    const paginaHtmlPath = './pagina.html';
    const paginaHtml = fs.readFileSync(paginaHtmlPath, 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(JSON.stringify(mensajes));
  }
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});