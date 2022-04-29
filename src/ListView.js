import { useState } from 'react';

export function TasksList(props){
    let [taskName, setUserInput] = useState();
    let [tasksArray, setTaskArray] = useState([]);

    function DeleteTask(index){
        tasksArray.splice(index, 1);
        let newTasks = tasksArray.slice();
        setTaskArray(newTasks);
    }

    function SaveTask(value){
        console.log(tasksArray);
        let newTasks = tasksArray.slice();
        newTasks.push(value);
        setTaskArray(newTasks);
    }

    return(
        <div>
            <input onChange={(event) => setUserInput(event.target.value)} type="text" required="required"/>
            <button onClick={() => {SaveTask(taskName)}}>Save</button>

            <br/>
            
            <ul>
                {tasksArray.map((task, index) => { 
                        return (<li key={index}>{tasksArray[index]} <button onClick={() => {DeleteTask(index)}}>Delete</button></li>);
                    }) 
                }
            </ul>
        </div>
  )
}