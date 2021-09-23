import type { NextApiRequest, NextApiResponse } from 'next'
import {DefaultMessageResponse} from "../../types/default-message-response";
import connectDB from "../../middleware/connect-db";
import {Task} from "../../types/task";
import {TaskModel} from "../../models/task-model";
import JwtValidator from "../../middleware/jwt-validator";
import {UserModel} from "../../models/user-model";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse>
) => {
  try {
    if(req.method == "POST") {
      saveTask(req, res);
      return;
    }
    else if(req.method == "GET") {
    }
    else if(req.method == "PUT") {
    }
    else if(req.method == "DELETE") {
    }

  } catch (e) {
    console.log("Ocorreu ao gerenciar tarefa task: ", e)
    res.status(500).json({error: "Ocorreu ao gerenciar tarefa task"});
  }
}

const saveTask = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse>
) => {

  if(!req.body) {
    res.status(500).json({error: "Parametros de entrada invalido"});
  }

  const userId = req.body.userId;

  if(!userId) {
    return res.status(400).json({error: "usuario invalido"});
  }

  const userFound = await UserModel.findById(userId);

  if(!userFound) {
    return res.status(400).json({error: "usuario não encontrado"});
  }

  const task = req.body as Task;

  if(!task.name || task.name.length < 2) {
    return res.status(400).json({error: "Nome da tarefa invalida"});
  }

  if(!task.finishPrevisionDate || new Date(task.finishPrevisionDate).getDate() < new Date().getDate()) {
    return res.status(400).json({error: "Data de previsão invalida ou menor que o dia de hoje"});
  }

  const final: Task = {
    ...task,
    userId,
    finishDate: undefined,
  }

  await TaskModel.create(final);

  return res.status(200).json({msg: "Tarefa criada com sucesso"});

}

export default connectDB(JwtValidator(handler));