import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ListView } from "./ListView";
import {LoginForm} from "./LoginForm";

function App() {

  const [user, setUser] = useState();
  const [token, setToken]= useState();

  return(
    <div className="TodoApp">

      {user ? <ListView token={token}/> : <LoginForm setUser={setUser} setToken={setToken}/>}

    </div>
  );

}

export default App;