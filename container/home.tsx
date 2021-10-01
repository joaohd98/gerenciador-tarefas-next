import {NextPage} from "next";
import {AccessTokenProxy} from "../types/acess-token-proxy";
import {Header} from "../components/header";
import {Filters} from "../components/filters";
import {List} from "../components/list";
import {useState} from "react";
import {Task} from "../types/task";
import {Footer} from "../components/footer";

export const Home: NextPage<AccessTokenProxy> = ({
  setAccessToken
}) => {
  const [tasks,setTasks] = useState<Task[]>([
    {_id: "_1", name: "Teste", userId: "1", finishPrevisionDate: new Date(), finishDate: new Date()},
    {_id: "_1", name: "Teste", userId: "1", finishPrevisionDate: new Date()},
    {_id: "_1", name: "Teste", userId: "1", finishPrevisionDate: new Date()},
    {_id: "_1", name: "Teste", userId: "1", finishPrevisionDate: new Date()},
    {_id: "_1", name: "Teste", userId: "1", finishPrevisionDate: new Date()},
    {_id: "_1", name: "Teste", userId: "1", finishPrevisionDate: new Date()},
  ]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setAccessToken('');
  }

  return (
    <>
      <Header logout={logout}/>
      <Filters />
      <List tasks={tasks} />
      <Footer />
    </>
  )
}