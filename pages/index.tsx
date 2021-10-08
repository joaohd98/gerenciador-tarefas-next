import type { NextPage } from 'next'
import {Login} from "../container/login";
import {useEffect, useState} from "react";
import {Home} from "../container/home";
import {Register} from "../container/register";

type Pages = "login" | "register" | "home";

const Index: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<Pages | undefined>(undefined);

  useEffect(() => {
    if(typeof window != "undefined") {
      const token  = localStorage.getItem("accessToken") as string;

      if(token) {
        setCurrentPage("home");
      } else {
        setCurrentPage("login");
      }
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setCurrentPage("login")
  }

  const onEnter = (name: string, email: string, token: string) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);

    setCurrentPage("home")
  }

  const getCurrentPage = () => {
    switch (currentPage) {
      case "login": return <Login onEnter={onEnter} onClickRegister={() => setCurrentPage("register")} />;
      case "register": return <Register onBack={() => setCurrentPage("login")} onRegister={onEnter} />;
      case "home": return <Home onLogout={onLogout} />;
    }
  }

  return <>{getCurrentPage()}</>;
}


export default Index
