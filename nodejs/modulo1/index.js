const express = require("express");

const server = express();
server.use(express.json());
let users = [];

//middlewares - handlers de eventos diversos

server.use((req, res, next) => {
  console.log("Sempre serei chamado!");
  next();
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ msg: "Falta enviar o usuário" });
  }
  next();
}

//retorna os users
server.get("/users/all", (req, res) => {
  return res.status(200).json(users);
});
server.post("/users/new", checkUserExists, (req, res) => {
  const { name } = req.body;
  if (name !== null && name !== undefined) {
    users.push(name);
    return res
      .status(200)
      .json({ msg: `User ${name} adicionado com sucesso  ` });
  } else {
    return res.status(400).json({ msg: "Erro ao fazer parse do usuário" });
  }
});
server.put("/users/update/:index", (req, res) => {
  const { index } = req.params;
  const { newName } = req.body;
  try {
    if (users[index] !== null && users[index] !== undefined) {
      users[index] = newName;
      return res.status(200).json({ msg: "User alterado com sucesso" });
    } else {
      return res.status(400).json({ msg: "Index não encontrado" });
    }
  } catch (error) {}
});
server.delete("/users/delete/:index", (req, res) => {
  const { index } = req.params;
  const toDelete = users[index];
  if (toDelete !== null && toDelete !== undefined) {
    users = users.filter(user => user !== toDelete);
    return res.status(200).json({ users });
  } else {
    return res.status(400).json({ msg: "Erro ao deletar user selecionado" });
  }
});

server.listen(3000);
