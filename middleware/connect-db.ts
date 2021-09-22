import type { NextApiRequest, NextApiResponse, NextApiHandler} from 'next'
import mongoose from "mongoose"

const connectDB = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {

  //Valido se já está conectado, e caso esteja, processa api normalmente
  if(!mongoose.connections[0].readyState) {
    const {DB_CONNECTION_STRING} = process.env;

    if(!DB_CONNECTION_STRING) {
      return res.status(500).json({error: "ENV Database não informado"});
    }

    await mongoose.connect(DB_CONNECTION_STRING);
    mongoose.connection.on("connected", () => console.log("Conectado na database"));
    mongoose.connection.on("error", err => console.log("Erro ao conectar no database: ", err));
  }


  return handler(req, res);
}

export default connectDB;