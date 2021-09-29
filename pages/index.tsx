import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className={"container-login"}>
      <img className={"logo"} src={"/logo.svg"} alt={"logo fiap"}/>
      <form>
        <div className={"input"}>
          <img src={"/mail.svg"} alt={"email"} />
          <input type={"email"} placeholder={"Email"}/>
        </div>
        <div className={"input"}>
          <img src={"/lock.svg"} alt={"password"} />
          <input type={"password"} placeholder={"Senha"}/>
        </div>
        <button>LOGIN</button>
      </form>
    </div>
  )
}

export default Home
