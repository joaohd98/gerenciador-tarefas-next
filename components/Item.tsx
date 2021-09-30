import type { NextPage } from 'next'
import {Task} from "../types/task";

type ItemProps = {
  task: Task;
}

const Item: NextPage<ItemProps> = ({task}) => {
  return (
    <div className={`container-item`}>
      <p>{task.name}</p>
    </div>
  )
}
export { Item }
