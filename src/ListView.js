import { useState } from 'react';
import React, { useEffect } from 'react';

export function ListView({token}){

    const initialValues = {
        title: "", 
        desc: ""
    };
    let [createTaskValues, setNewTaskValues] = useState(initialValues);

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
        // tasks.splice(index, 1);
        // let newTasks = tasks.slice();
        //setTaskArray(newTasks);
    }

    function SaveTask(e){

        e.preventDefault();

        const Http = new XMLHttpRequest();
        const url='http://demo2.z-bit.ee/tasks';
        Http.open("POST", url);
        Http.setRequestHeader("Content-Type", "application/json");
        Http.setRequestHeader("Authorization", "Bearer " + token);
        Http.send(JSON.stringify(createTaskValues));


    }

    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
    
        setNewTaskValues({
          ...createTaskValues,
          [name]: value,
        });
    };

    return(
        <div>
            <form onSubmit={SaveTask}>
                <label htmlFor="title">Title</label>
                <input name="title" value={createTaskValues.title} onChange={handleInputChange} type="text" required="required"/>

                <label htmlFor="desc">Description</label>
                <input name="desc" value={createTaskValues.desc} onChange={handleInputChange} type="text" required="required"/>

                <input type="submit" value="Submit"></input>
            </form>


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