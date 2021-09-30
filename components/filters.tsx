import type { NextPage } from 'next'
import {useState} from "react";


const Filters: NextPage = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container-filters">
      <div className={"title"}>
        <span>Tarefas</span>
        <img src={"/filtro.svg"} alt={"filtrar tarefas"} onClick={() => setShowFilters(!showFilters)} />
        <div className={"form"}>
          <div>
            <label>Data prevista de conclusão de: </label>
            <input type={"date"} />
          </div>
          <div>
            <label>Até: </label>
            <input type={"date"} />
          </div>
          <div className={"line"} />
          <div>
            <label>Status: </label>
            <select>
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
            <input type={"date"} />
          </div>
          <div>
            <label>Periodo até: </label>
            <input type={"date"} />
          </div>
          <div>
            <label>Status: </label>
            <select>
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
