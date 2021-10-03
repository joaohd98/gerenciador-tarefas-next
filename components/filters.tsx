import type { NextPage } from 'next'
import {useState} from "react";

type FilterProps = {
  finishPrevisionStart: string
  setFinishPrevisionStart: (s: string) => void;
  finishPrevisionEnd: string
  setFinishPrevisionEnd: (s: string) => void;
  status: number
  setStatus: (s: number) => void;
}


const Filters: NextPage<FilterProps> = ({
  finishPrevisionStart,
  finishPrevisionEnd,
  status,
  setFinishPrevisionEnd,
  setFinishPrevisionStart,
  setStatus
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container-filters">
      <div className={"title"}>
        <span>Tarefas</span>
        <img src={"/filtro.svg"} alt={"filtrar tarefas"} onClick={() => setShowFilters(!showFilters)} />
        <div className={"form"}>
          <div>
            <label>Data prevista de conclusão de: </label>
            <input type={"date"} value={finishPrevisionStart} onChange={e => setFinishPrevisionStart(e.target.value)} />
          </div>
          <div>
            <label>Até: </label>
            <input type={"date"} value={finishPrevisionEnd} onChange={e => setFinishPrevisionEnd(e.target.value)} />
          </div>
          <div className={"line"} />
          <div>
            <label>Status: </label>
            <select value={status} onChange={e => setStatus(parseInt(e.target.value))}>
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluidas</option>
            </select>
          </div>
        </div>
      </div>
      {showFilters && (
        <div className={"filters-mobile"}>
          <div>
            <label>Periodo de: </label>
            <input type={"date"} value={finishPrevisionStart} onChange={e => setFinishPrevisionStart(e.target.value)} />
          </div>
          <div>
            <label>Periodo até: </label>
            <input type={"date"} value={finishPrevisionEnd} onChange={e => setFinishPrevisionEnd(e.target.value)} />
          </div>
          <div>
            <label>Status: </label>
            <select value={status} onChange={e => setStatus(parseInt(e.target.value))}>
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluidas</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
export { Filters }
