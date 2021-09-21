import type { NextApiRequest, NextApiResponse } from 'next'

export default (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if(req.method != "POST") {
      res.status(400).json({error: "Metodo solicitado não existe"});
      return;
    }

    return res.status(200).json({msg: "Usuario logado com sucesso"});
  } catch (e) {
    console.log("Ocorreu erro ao autenticar usuário: ", e)
    res.status(500).json({error: "Ocorreu erro ao autenticar usuário"});
  }

}
