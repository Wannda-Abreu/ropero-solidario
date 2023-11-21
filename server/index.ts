import app from "./app";

let port = process.env.port ?? 5000;

const server = app.listen(port, () => console.log(`Ejecutándose en el puerto http://localhost:${port}`));

export  default server;