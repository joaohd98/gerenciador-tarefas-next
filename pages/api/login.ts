import type { NextApiRequest, NextApiResponse } from 'next'
import {DefaultMessageResponse} from "../../types/default-message-response";
import {Login} from "../../types/login";

const request = (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMessageResponse>
) => {
  try {
    if(req.method != "POST") {
      return res.status(400).json({error: "Metodo solicitado não existe"});
    }

    const body = req.body as Login;

    if(!body.user || !body.password) {
      return res.status(400).json({msg: "Login ou senha não inseridos"});
    }

    if(body.user != "admin@admin.com" || body.password != "123456") {
      return res.status(400).json({msg: "Usuario não encontrado"});
    }

    res.status(200).json({msg: "Usuario logado com sucesso"});
  } catch (e) {
    console.log("Ocorreu erro ao autenticar usuário: ", e)
    res.status(500).json({error: "Ocorreu erro ao autenticar usuário"});
  }

}

export default request;