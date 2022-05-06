import { useState } from 'react';
import React, { useEffect } from 'react';

export function ListView({token}){
    let [taskName, setUserInput] = useState();
    let [tasks, setTaskArray] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);

    function fetchData(){
        const Http = new XMLHttpRequest();
        const url='http://demo2.z-bit.ee/tasks';
        Http.open("GET", url);
        Http.setRequestHeader("Content-Type", "application/json");
        Http.setRequestHeader("Authorization", "Bearer " + token);
        Http.send();
        
        Http.onreadystatechange = function() {
            if(this.readyState === 4 && this.status===200){
                //console.log(JSON.parse(Http.responseText));
                let newArray = JSON.parse(Http.responseText).slice();
                setTaskArray(newArray);
                //console.log(tasks);
            }
        }
    }

    function DeleteTask(index){
        tasks.splice(index, 1);
        let newTasks = tasks.slice();
        //setTaskArray(newTasks);
    }

    function SaveTask(value){
        let newTasks = tasks.slice();
        newTasks.push(value);
        console.log(newTask);
        //setTaskArray(newTasks);
    }

    return(
        <div>

            <input onChange={(event) => setUserInput(event.target.value)} type="text" required="required"/>
            <button onClick={() => {SaveTask(taskName)}}>Save</button>

            <br/>
            <ul>
                {tasks.map((task, index) => {
                    return (
                        <li key={task['id']}>
                            <p>Id: {task['id']}</p>
                            <p>Title: {task['title']}</p>
                            <p>Description: {task['desc']}</p>
                        </li>
                        
                        
                    )
                })}
            </ul> 
        </div>
  )
}