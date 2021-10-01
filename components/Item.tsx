import type { NextPage } from 'next'
import {Task} from "../types/task";
import moment from "moment";

type ItemProps = {
  task: Task;
}

const Item: NextPage<ItemProps> = ({task}) => {
  const getDate = (finishDate: Date | undefined, finishPrevisionDate: Date) => {
    if(finishDate) {
      return `Concluido em ${moment(finishDate).format("DD/MM/yyyy")}`
    }

    return `Previsão de conclusão em ${moment(finishPrevisionDate).format("DD/MM/yyyy")}`
  }
  return (
    <div className={`container-item ${!task.finishDate && "active"}`}>
      <img src={task.finishDate ? "/check.svg" : "/uncheck.svg"} alt={task.finishDate ? "Tarefa Concluida" : "Tarefa não concluida"} />
      <div>
        <p className={task.finishDate && "finished"}>{task.name}</p>
        <span>{getDate(task.finishDate, task.finishPrevisionDate)}</span>
      </div>
    </div>
  )
}
export { Item }
