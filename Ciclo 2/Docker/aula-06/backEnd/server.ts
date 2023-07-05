import { App } from "./app.js";

const port = 8080;

new App().server.listen(port, () => {
  console.log(`Servidor funcionando em: http://localhost:${port}`);
});
