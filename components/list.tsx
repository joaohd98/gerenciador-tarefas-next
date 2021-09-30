import type { NextPage } from 'next'
import {Task} from "../types/task";
import {Item} from "./Item";

type ListProps = {
  tasks: Task[];
}

const List: NextPage<ListProps> = ({tasks}) => {
  return (
    <div className={`container-list ${tasks.length == 0 && "empty"}`}>
      {
        tasks.length == 0 ? (
          <>
            <img src="/empty-list.svg" alt="Lista vazia"/>
            <p>Você ainda não possui tarefas cadastradas!</p>
          </>
        ) : (
          <>
            {tasks.map(task => <Item key={task._id} task={task} />)}
          </>
        )
      }

    </div>
  )
}
export { List }
