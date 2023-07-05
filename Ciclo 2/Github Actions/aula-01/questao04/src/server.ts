import Express from "express";
import { router } from "./routes/routes";
import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config({ path: ".env" })

const app = Express();
const server = createServer(app);

app.use(router);
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

server.listen(process.env.PORT, () => {
    console.log("*******************************************");
    console.log(`🔰 Servidor rodando na porta ${process.env.PORT}!`);
    console.log(`   Servidor local: http://localhost:${process.env.PORT}`);
    console.log("*******************************************");
});
