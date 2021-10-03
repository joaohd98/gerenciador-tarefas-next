import type { NextPage } from 'next'
import {Task} from "../types/task";
import moment from "moment";

type ItemProps = {
  task: Task;
  onSelectTask: (task: Task) => void;
}

const Item: NextPage<ItemProps> = ({task, onSelectTask}) => {
  const getDate = (finishDate: Date | undefined, finishPrevisionDate: Date) => {
    if(finishDate) {
      return `Concluido em ${moment(finishDate, "yyyy-MM-DD").format("DD/MM/yyyy")}`
    }

    return `Previsão de conclusão em ${moment(finishPrevisionDate, "yyyy-MM-DD").format("DD/MM/yyyy")}`
  }
  return (
    <div className={`container-item ${!task.finishDate && "active"}`} onClick={task.finishDate ? undefined : () => onSelectTask(task)}>
      <img src={task.finishDate ? "/check.svg" : "/uncheck.svg"} alt={task.finishDate ? "Tarefa Concluida" : "Tarefa não concluida"} />
      <div>
        <p className={task.finishDate && "finished"}>{task.name}</p>
        <span>{getDate(task.finishDate, task.finishPrevisionDate)}</span>
      </div>
    </div>
  )
}
export { Item }
