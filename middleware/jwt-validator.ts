import type { NextApiRequest, NextApiResponse, NextApiHandler} from 'next'
import {DefaultMessageResponse} from "../types/default-message-response";
import jwt, {JwtPayload} from 'jsonwebtoken';

const JwtValidator = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse<DefaultMessageResponse>) => {
  const {MY_SECRET_KEY_} = process.env;

  if(!MY_SECRET_KEY_) {
    return res.status(500).json({error: "ENV MY_SECRET_KEY não encontrado"});
  }

  if(!req || !req.headers) {
    return res.status(400).json({error: "ENV MY_SECRET_KEY não encontrado"});
  }

  if(req.method == "OPTIONS") {
    return handler(req, res);
  }

  const authorization = req.headers["authorization"];

  if(!authorization) {
    return res.status(401).json({error: "Token não informado"});
  }

  const token = authorization.substr(7);

  if(!token) {
    return res.status(401).json({error: "Token invalido"});
  }

  try {
    const decoded = await jwt.verify(token, MY_SECRET_KEY_) as JwtPayload;

    if(!decoded) {
      return res.status(401).json({error: "Erro ao decodificar o JWT"});
    }

    if(req.body) {
      req.body.userId = decoded._id
    } else if(req.query) {
      req.query.userId = decoded._id
    }

  } catch {
    return res.status(500).json({error: "Ocorreu erro ao tratar token JWT"});
  }

  return handler(req, res);

}

export default JwtValidator;