import type { NextApiRequest, NextApiResponse } from 'next'
import {DefaultMessageResponse} from "../../types/default-message-response";
import {User} from "../../types/user";

const handler = (
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
      return res.status(400).json({error: "Campo de nome tem que ser maior do que três caracteres"});
    }

    if(!user.email.includes("@") || !user.email.includes(".") || user.email.length < 5) {
      return res.status(400).json({error: "Campo de email invalido"});
    }

    if(user.password.length < 4) {
      return res.status(400).json({error: "Campo de senha tem que ter mais do que três digitos"});
    }

    res.status(200).json({msg: "Usuario criado com sucesso"})

  } catch (e) {
    console.log("Ocorreu erro ao criar usuário: ", e)
    res.status(500).json({error: "Ocorreu erro ao criar usuário"});
  }
}

export default handler;