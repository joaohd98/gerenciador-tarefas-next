import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className={"container-login"}>
      <img src={"/logo.svg"} alt={"logo fiap"}/>
      <form>
        <div className={"container-input"}>
          <img src={"/mail.svg"} alt={"email"} />
          <input type={"email"}/>
        </div>
        <div className={"container-input"}>
          <img src={"/lock.svg"} alt={"password"} />
          <input type={"password"}/>
        </div>
        <button>LOGIN</button>
      </form>
    </div>
  )
}

export default Home
