import type { NextPage } from 'next'
import {Task} from "../types/task";
import {Item} from "./Item";
import {Modal, ModalBody, ModalFooter} from "react-bootstrap";
import {executeRequest} from "../services/api";
import {useState} from "react";
import moment from "moment";

type ListProps = {
  tasks: Task[];
}

const List: NextPage<ListProps> = ({tasks}) => {
  const [showModal, setShowModal] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState<string | undefined>("");
  const [name, setName] = useState("");
  const [finishPrevisionDate, setFinishPrevisionDate] = useState<string | undefined>("");
  const [finishDate, setFinishDate] = useState<string | undefined>("");

  const doUpdate = async (e : any) =>{
    setMsgError("");
    setLoading(true);

    try{
      e.preventDefault();

      if(!name || !finishPrevisionDate){
        setMsgError('Favor preencher o nome e data de previsão');
        setLoading(false);
        return;
      }

      const body = {
        name,
        finishPrevisionDate
      }

      const result = await executeRequest('task' + _id, 'POST', body);

      if(!result || !result.data){
        setMsgError('Nao foi possivel salvar a tarefa!');
        return;
      }

      // await getFilteredList();
      closeModal();

    } catch(e : any){
      if(e?.response?.data?.error){
        setMsgError(e?.response?.data?.error);
      }else{
        setMsgError('Ocorreu erro ao adicionar tarefa tente novamente!');
      }
    }

    setLoading(false);
  }

  const closeModal = () => {
    setName("");
    setFinishPrevisionDate("");
    setMsgError("");
    setShowModal(false);
  }

  const selectTaskToEdit = (task: Task) => {
    setId(task._id);
    setName(task.name);
    setFinishPrevisionDate(moment(task.finishPrevisionDate).format("DD/MM/yyyy"));
    setFinishDate(task.finishDate ? moment(task.finishDate).format("DD/MM/yyyy") : "");
    setShowModal(true);
  }

  return (
    <>
      <div className={`container-list ${tasks.length == 0 && "empty"}`}>
        {
          tasks.length == 0 ? (
            <>
              <img src="/empty-list.svg" alt="Lista vazia"/>
              <p>Você ainda não possui tarefas cadastradas!</p>
            </>
          ) : (
            <>
              {tasks.map(task => <Item key={task._id} task={task} onSelectTask={selectTaskToEdit}/>)}
            </>
          )
        }
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} className={"container-modal"}>
        <ModalBody>
          <p>Adicionar Tarefa</p>
          {msgError && <p className={"error"}>{msgError}</p>}
          <input type={"text"} placeholder={"Criar uma tarefa"} value={name} onChange={e => setName(e.target.value)} />
          <input
            type={"text"}
            placeholder={"Data de previsão"}
            value={finishPrevisionDate}
            onChange={e => setFinishPrevisionDate(e.target.value)}
            onFocus={e => e.target.type = "date"}
            onBlur={e => e.target.type = "text"}
          />
          <input
            type={"text"}
            placeholder={"Data de previsão"}
            value={finishPrevisionDate}
            onChange={e => setFinishPrevisionDate(e.target.value)}
            onFocus={e => e.target.type = "date"}
            onBlur={e => e.target.type = "text"}
          />
          <input
            type={"text"}
            placeholder={"Data da conclusão"}
            value={finishDate}
            onChange={e => setFinishDate(e.target.value)}
            onFocus={e => e.target.type = "date"}
            onBlur={e => e.target.type = "text"}
          />
        </ModalBody>
        <ModalFooter>
          <div className={"button col-12"}>
            <button onClick={doUpdate} disabled={isLoading}>{!isLoading ? "Salvando alteração" : "Carregando...."}</button>
            <span onClick={closeModal}>Cancelar</span>
          </div>
        </ModalFooter>
      </Modal>
    </>

  )
}
export { List }
