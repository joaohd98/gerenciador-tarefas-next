import type { NextApiRequest, NextApiResponse } from 'next'
import {DefaultMessageResponse} from "../../types/default-message-response";
import {Login} from "../../types/login";
import connectDB from "../../middleware/connect-db";
import {UserModel} from "../../models/user-model";
import md5 from "md5";
import {User} from "../../types/user";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse | User>
) => {
  try {
    if(req.method != "POST") {
      return res.status(400).json({error: "Metodo solicitado não existe"});
    }

    const auth = req.body as Login;

    if(!auth.email || !auth.password) {
      return res.status(400).json({msg: "Login ou senha não inseridos"});
    }

    const userFound = await UserModel.find({email: auth.email, password: md5(auth.password)});

    if(!userFound || userFound.length == 0) {
      return res.status(400).json({msg: "Usuario não encontrado"});
    }

    const user = userFound[0];

    res.status(200).json(user);
  } catch (e) {
    console.log("Ocorreu erro ao autenticar usuário: ", e)
    res.status(500).json({error: "Ocorreu erro ao autenticar usuário"});
  }

}

export default connectDB(handler);