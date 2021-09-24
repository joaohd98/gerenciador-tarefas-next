import type { NextApiRequest, NextApiResponse } from 'next'
import {DefaultMessageResponse} from "../../types/default-message-response";
import connectDB from "../../middleware/connect-db";
import {Task} from "../../types/task";
import {TaskModel} from "../../models/task-model";
import JwtValidator from "../../middleware/jwt-validator";
import {UserModel} from "../../models/user-model";
import {GetTaskQueryParams} from "../../types/get-task-query-params";
import {TaskStatusEnum} from "../../types/task-status-enum";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse | Task[]>
) => {
  try {
    const userId = req?.body?.userId || req?.query?.userId;
    const failedValidation = await validateUser(userId);

    if(failedValidation) {
      return res.status(400).json({error: failedValidation});
    }

    if(req.method == "POST") {
      await saveTask(req, res, userId);
      return;
    }
    else if(req.method == "GET") {
      await getTasks(req, res, userId);
      return;
    }
    else if(req.method == "PUT") {
      await updateTask(req, res, userId);
      return;
    }
    else if(req.method == "DELETE") {
      await deleteTask(req, res, userId);
      return;
    }

  } catch (e) {
    console.log("Ocorreu erro ao gerenciar tarefa task: ", e)
    res.status(500).json({error: "Ocorreu ao gerenciar tarefa task"});
  }
}

const saveTask = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse>,
  userId: string) => {

  if(!req.body) {
    res.status(500).json({error: "Parametros de entrada invalido"});
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

  await TaskModel.updateOne(final);

  return res.status(200).json({msg: "Tarefa criada com sucesso"});

}

const getTasks = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse | Task[]>,
  userId: string) => {
  const params = req.query as GetTaskQueryParams
  const query = {
    userId,
  } as any;

  if(params?.finishPrevisionStart){
    const inputDate = new Date(params.finishPrevisionStart);
    query.finishPrevisionDate = { $gte : inputDate}
  }

  if(params?.finishPrevisionEnd){
    const lastDate = new Date(params.finishPrevisionEnd);

    query.finishPrevisionDate = {
      ...query.finishPrevisionDate,
      $lte: lastDate
    }
  }

  if(params?.status) {
    switch (parseInt(params.status as any)) {
      case TaskStatusEnum.Active: query.finishDate = null; break;
      case TaskStatusEnum.Finished: query.finishDate = {$ne: null}; break;
    }
  }

  const result = await TaskModel.find(query) as Task[];

  return res.status(200).json(result);
}

const deleteTask = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse>,
  userId: string) => {
  const taskFound = await validateIdTaskAndReturnValue(req, userId);

  if(!taskFound) {
    return res.status(400).json({error: "Tarefa não encontrada"});
  }

  await TaskModel.findByIdAndDelete(taskFound._id);
  return res.status(200).json({msg: "Tarefa deletada com sucesso"});
}

const updateTask = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse>,
  userId: string) => {
  const taskFound = await validateIdTaskAndReturnValue(req, userId);

  if(!taskFound) {
    return res.status(400).json({error: "Tarefa não encontrada"});
  }

  if(!req.body) {
    return res.status(500).json({error: "Parametros de entrada invalidos"});
  }

  const task = req.body as Task;

  if(task.name && task.name.trim() != "") {
    taskFound.name = task.name;
  }

  if(task.finishPrevisionDate) {
    taskFound.finishPrevisionDate = task.finishPrevisionDate;
  }


  if(task.finishDate) {
    taskFound.finishDate = task.finishDate;
  }

  await TaskModel.findByIdAndUpdate(taskFound._id, taskFound);

  return res.status(200).json({msg: "Tarefa atualizada com sucesso com sucesso"});
}

const validateIdTaskAndReturnValue = async (req: NextApiRequest, userId: string) => {
  const id = req?.body?.id || req?.query?.id;

  if(!id || id.trim() == "") {
    return null;
  }

  const taskFound = await TaskModel.findById(id);
  if(!taskFound || taskFound.userId != userId) {
    return null;
  }

  return taskFound;
}

const validateUser = async (userId: string) => {
  if(!userId) {
    return "usuario invalido";
  }

  const userFound = await UserModel.findById(userId);

  if(!userFound) {
    return "usuario não encontrado";
  }

  return false;
}
export default connectDB(JwtValidator(handler));