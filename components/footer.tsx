import type { NextPage } from 'next'
import {Task} from "../types/task";
import {Item} from "./Item";

type FooterProps = {
}

const Footer: NextPage<FooterProps> = () => {
  return (
    <div className={`container-footer`}>
      <button>
        <img src={"/add.svg"} /> Adicionar uma Tarefa
      </button>
      <span>© Copyright 2021. Todos os direitos reservados.</span>
    </div>
  )
}
export { Footer }
