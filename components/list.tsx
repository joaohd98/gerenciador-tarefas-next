import type { NextPage } from 'next'
import {Task} from "../types/task";
import {Item} from "./Item";
import {Modal, ModalBody, ModalFooter} from "react-bootstrap";
import {executeRequest} from "../services/api";
import {useState} from "react";
import moment from "moment";

type ListProps = {
  tasks: Task[];
  getFilteredList: () => Promise<void>;
}

const List: NextPage<ListProps> = ({tasks, getFilteredList}) => {
  const [showModal, setShowModal] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState<string | undefined>('');
  const [name, setName] = useState("");
  const [finishPrevisionDate, setFinishPrevisionDate] = useState<string | undefined>("");
  const [finishDate, setFinishDate] = useState<string | undefined>("");

  const doUpdate = async (e : any) =>{
    setMsgError("");
    setLoading(true);

    try{
      e.preventDefault();

      if(!id || !name || !finishPrevisionDate){
        setMsgError('Favor preencher id, nome e data de previsão');
        setLoading(false);
        return;
      }

      const body = {
        name,
        finishPrevisionDate,
        finishDate
      }

      const result = await executeRequest('task?id=' + id, 'PUT', body);

      if(!result || !result.data){
        setMsgError('Nao foi possivel atualizar a tarefa!');
        return;
      }

      await getFilteredList();
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

  const doDelete = async (e : any) =>{
    try{
      setLoading(true);
      e.preventDefault();

      if(!id){
        setMsgError('Favor preencher id para deletar');
        setLoading(false);
        return;
      }

      await executeRequest('task?id='+id, 'DELETE');
      await getFilteredList();
      closeModal();
    }catch(e : any){
      console.log(e);
      if(e?.response?.data?.error){
        setMsgError(e?.response?.data?.error);
      }else{
        setMsgError('Ocorreu erro ao deletar tarefa tente novamente!');
      }
    }

    setLoading(false);
  }


  const closeModal = () => {
    setName('');
    setFinishPrevisionDate('');
    setFinishDate('');
    setId('');
    setLoading(false);
    setMsgError('');
    setShowModal(false);
  }

  const selectTaskToEdit = (task: Task) => {
    setId(task._id);
    setName(task.name);
    setFinishPrevisionDate(moment(task.finishPrevisionDate).format());
    setFinishDate(task.finishDate ? moment(task.finishDate).format() : "");
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
          <p>Alterar uma Tarefa</p>
          {msgError && <p className="error">{msgError}</p>}
          <input type="text"
             placeholder="Nome da tarefa"
             value={name}
             onChange={e => setName(e.target.value)}/>
          <input type={finishPrevisionDate ? "date" :"text" }
             placeholder="Data de previsão de conclusão"
             value={finishPrevisionDate}
             onChange={e => setFinishPrevisionDate(e.target.value)}
             onFocus={e => e.target.type = "date"}
             onBlur={e => finishPrevisionDate ? e.target.type = "date" : e.target.type = "text" }/>
          <input type={finishDate ? "date" :"text" }
             placeholder="Data de conclusão"
             value={finishDate}
             onChange={e => setFinishDate(e.target.value)}
             onFocus={e => e.target.type = "date"}
             onBlur={e => finishDate ? e.target.type = "date" : e.target.type = "text" }/>
        </ModalBody>
        <Modal.Footer>
          <div className="button col-12">
            <button
              onClick={doUpdate}
              disabled={isLoading}
            >{isLoading ? "...Enviando dados" : "Salvar alterações"}</button>
            <span onClick={doDelete}>Excluir Tarefa</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>

  )
}
export { List }
