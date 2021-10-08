import NextCors from "nextjs-cors";
import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";

const corsHandler = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {

  await NextCors(req, res, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionSuccessStatus: 200,
  })

  return handler(req, res);
}

export default corsHandler;