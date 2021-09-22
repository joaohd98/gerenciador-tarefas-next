import type { NextApiRequest, NextApiResponse } from 'next'
import {DefaultMessageResponse} from "../../types/default-message-response";
import {User} from "../../types/user";
import connectDB from "../../middleware/connect-db";
import {UserModel} from "../../models/user-model";
import md5 from "md5";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse>
) => {
  try {
    if(req.method != "POST") {
      return res.status(400).json({error: "Metodo solicitado não existe"});
    }

    if(!req.body) {
      return res.status(400).json({error: "Parametros de entrada invalidos"});
    }

    const user = req.body as User;

    if(!user.name || !user.email || !user.password) {
      return res.status(400).json({error: "Um ou mais campos faltando"});
    }

    if(user.name.length < 3) {
      return res.status(400).json({error: "Nome invalido"});
    }

    if(!user.email.includes("@") || !user.email.includes(".") || user.email.length < 5) {
      return res.status(400).json({error: "Campo de email invalido"});
    }

    if(user.password.length < 4) {
      return res.status(400).json({error: "Campo de senha invalido"});
    }

    const existingUser = await UserModel.find({email: user.email});
    if(existingUser && existingUser.length > 0){
      res.status(400).json({ error: 'Ja existe usuario com o email informado'});
      return;
    }

    await UserModel.create({
      ...user,
      password: md5(user.password)
    });

    res.status(200).json({msg: "Usuario criado com sucesso"})

  } catch (e) {
    console.log("Ocorreu erro ao criar usuário: ", e)
    res.status(500).json({error: "Ocorreu erro ao criar usuário"});
  }
}

export default connectDB(handler);