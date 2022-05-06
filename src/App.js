import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ListView } from "./ListView";
import {LoginForm} from "./LoginForm";

function App() {

  const [user, setUser] = useState();
  return(
    <div className="TodoApp">

      {user ? <ListView/> : <LoginForm setUser={setUser}/>}

    </div>
  );

}

export default App;