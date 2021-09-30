import {NextPage} from "next";
import {AccessTokenProxy} from "../types/acess-token-proxy";
import {Header} from "../components/header";

export const Home: NextPage<AccessTokenProxy> = ({
  setAccessToken
}) => {
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setAccessToken('');
  }

  return (
    <>
      <Header logout={logout}/>
    </>
  )
}