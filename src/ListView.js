import { useState } from 'react';

export function ListView({token}){
    let [taskName, setUserInput] = useState();
    let [tasksArray, setTaskArray] = useState(["task1", "task2"]);

    function fetchData(){
        const Http = new XMLHttpRequest();
        const url='http://demo2.z-bit.ee/tasks';
        Http.open("GET", url);
        Http.setRequestHeader("Content-Type", "application/json");
        Http.setRequestHeader("Authorization", token);
        Http.send();
        
        Http.onreadystatechange = function() {
            if(this.readyState === 4 && this.status===200){
                console.log(JSON.parse(Http.responseText));
            }
        }
    }

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