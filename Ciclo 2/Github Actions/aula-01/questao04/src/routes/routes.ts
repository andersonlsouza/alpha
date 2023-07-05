import { Router, Request, Response } from "express";
import Express from "express";
import path from "path";

const router = Router();
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

// SIMULANDO UM BANCO DE DADOS
let tarefas = [
  { id: 1, descricao: "Tarefa 1" },
  { id: 2, descricao: "Tarefa 2" },
];

// ----- ROTAS ------
router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

router.get("/todo", (req: Request, res: Response) => {
  try {
    // SIMULANDO UMA CONSULTA NO BANCO DE DADOS
    const resultado = tarefas;

    // RESPOSTA COM OS DADOS
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send({ erro: error });
  }
});

router.post("/todo", (req: Request, res: Response) => {
  try {
    if (!req.body?.tarefa) {
      throw "formato de requisição incorreto :(";
    }
    const tarefa = req.body.tarefa;

    // SIMULAÇÃO UMA INSERÇÃO NO BANCO DE DADOS
    const novoId = tarefas[tarefas.length - 1].id + 1;
    tarefas.push({ id: novoId, descricao: `${tarefa}` });

    // RESPOSTA COM STATUS 200
    res
      .status(200)
      .send({
        id: novoId,
        mensagem: `Tarefa '${tarefa}' inserida com sucesso!`,
      });
  } catch (error) {
    res.status(400).send({ erro: error });
  }
});

router.delete("/todo/:id", (req: Request, res: Response) => {
  try {
    if (!req.params?.id) {
      throw "Requisição sem ID";
    }
    const idParaDeletar = req.params.id;

    // SIMULAÇÃO UMA DELEÇÃO NO BANCO DE DADOS
    const novoArray = tarefas.filter((tarefa, index) => {
      if (tarefa.id.toString() === idParaDeletar) {
        tarefas.splice(index, 1);

        // RESPOSTA COM STATUS 200
        res
          .status(200)
          .send({
            mensagem: `Tarefa '${tarefa.descricao}' deletada com sucesso!`,
          });
      }
    });
    res.status(404).send({ mensagem: `ID não encontrado!` });
  } catch (error) {
    res.status(400).send({ erro: error });
  }
});

export { router };
