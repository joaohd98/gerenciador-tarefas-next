import type { NextPage } from 'next'
import {useState} from "react";
import {executeRequest} from "../services/api";
import {AccessTokenProxy} from "../types/acess-token-proxy";

type RegisterProps = {
  onBack: () => void;
  onRegister: (name: string, email: string, token: string) => void;
}

export const Register: NextPage<RegisterProps> = ({
  onBack,
  onRegister
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const doRegister = async (e : any) =>{
    setMsgError("");
    setLoading(true);

    try{
      e.preventDefault();

      if(!email || !password || !name){
        setMsgError('Parâmetros de entrada inválidos');
        setLoading(false);
        return;
      }

      const body = {
        name,
        email,
        password
      }

      const result = await executeRequest('user', 'POST', body);

      if(!result || !result.data){
        setMsgError('Nao foi possivel processar o cadastro tente novamente!');
      }

      onRegister(name, email, result.data.token);
    } catch(e : any){
      if(e?.response?.data?.error){
        setMsgError(e?.response?.data?.error);
      }else{
        setMsgError('Ocorreu erro ao processar cadastro tente novamente!');
      }
    }

    setLoading(false);
  }


  return (
    <div className={"container-register"}>
      <div>
        <div className={"back-container"}>
          <button onClick={onBack}>Voltar</button>
        </div>
        <div className={"form-container"}>
          <img className={"logo"} src={"/logo.svg"} alt={"logo fiap"}/>
          <form>
            <p>{msgError}</p>
            <div className={"input"}>
              <input type={"text"} placeholder={"Nome"} value={name} onChange={event => setName(event.target.value)}/>
            </div>
            <div className={"input"}>
              <input type={"email"} placeholder={"Email"} value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className={"input"}>
              <input type={"password"} placeholder={"Senha"} value={password} onChange={event => setPassword(event.target.value)}/>
            </div>
            <button className={isLoading ? "disabled" : ""} type="button" onClick={doRegister} disabled={isLoading}>{isLoading ? "...Carregando" : "Cadastrar"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

