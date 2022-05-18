import { useState } from 'react';
import React, { useEffect } from 'react';
import './ListView.css';

export function ListView({token}){

    const initialValues = {
        title: "", 
        desc: ""
    };

    let [createTaskValues, setNewTaskValues] = useState(initialValues);

    let [tasks, setTaskArray] = useState([]);

    useEffect(() => {
        fetchData();
      });

    function fetchData(){
        const Http = new XMLHttpRequest();
        const url='http://demo2.z-bit.ee/tasks';
        Http.open("GET", url);
        Http.setRequestHeader("Content-Type", "application/json");
        Http.setRequestHeader("Authorization", "Bearer " + token);
        Http.send();
        
        Http.onreadystatechange = function() {
            if(this.readyState === 4 && this.status===200){
                let newArray = JSON.parse(Http.responseText).slice();
                setTaskArray(newArray);
                console.log(tasks);
            }
        }
    }

    function DeleteTask(id){
        // tasks.splice(id, 1);
        // let newTasks = tasks.slice();
        //setTaskArray(newTasks);

        
        const Http = new XMLHttpRequest();
        const url=`http://demo2.z-bit.ee/tasks/${id}`;
        Http.open("DELETE", url);
        Http.setRequestHeader("Content-Type", "application/json");
        Http.setRequestHeader("Authorization", "Bearer " + token);
        Http.send();

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
    function EditTask(e){

        e.preventDefault();

        const Http = new XMLHttpRequest();
        const url='http://demo2.z-bit.ee/tasks';
        Http.open("PUT", url);
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
            <button id="myBtn">Open Modal</button>

            <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>

            </div>

            <form onSubmit={SaveTask}>
                <label htmlFor="title">Title</label>
                <input name="title" value={createTaskValues.title} onChange={handleInputChange} type="text" required="required"/>

                <label htmlFor="desc">Description</label>
                <input name="desc" value={createTaskValues.desc} onChange={handleInputChange} type="text" required="required"/>

                <input type="submit" value="Submit"></input>
            </form>


            <br/>
            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task['id']}>
                            <p>Id: {task['id']}</p>
                            <p>Title: {task['title']}</p>
                            <p>Description: {task['desc']}</p>
                            <p>Done: {task['marked_as_done'] ? "true" : "false"}</p> 
                            <button onClick={() => DeleteTask(task['id'])}>Delete</button>
                            <button onClick={() => EditTask(task['id'])}>Edit</button>
                        </li>
                    )
                })}
            </ul> 
        </div>
  )
}

