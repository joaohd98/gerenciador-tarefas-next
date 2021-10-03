import type { NextPage } from 'next'
import {Task} from "../types/task";
import {Item} from "./Item";

type FooterProps = {
  showModal: () => void;
}

const Footer: NextPage<FooterProps> = ({
   showModal
}) => {
  return (
    <div className={`container-footer`}>
      <button onClick={showModal}>
        <img src={"/add.svg"} /> Adicionar uma Tarefa
      </button>
      <span>© Copyright 2021. Todos os direitos reservados.</span>
    </div>
  )
}
export { Footer }
