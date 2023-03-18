const http = require('http');

const PORT = 3000;

const fs = require('fs');

const mensajes = [
  {"usuario":"servidor", "texto":"saludos, envie su mensaje", "fecha":"2023-2-2"}
];

const server = http.createServer((req, res) => {
 if (req.method === 'GET' && req.url === 'mensajes.json') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(mensajes));
  } else if(req.method === 'GET' && req.url === '/') {
    const paginaHtmlPath = './index.html';
    const paginaHtml = fs.readFileSync(paginaHtmlPath, 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(paginaHtml);
  }
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
