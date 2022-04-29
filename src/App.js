import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { TasksList } from "./ListView";

function App() {

  return(
    <div className="TodoApp">

      <TasksList />

    </div>
  );
}

export default App;