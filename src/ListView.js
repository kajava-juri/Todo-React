import { useState } from 'react';
import React, { useEffect } from 'react';
import './ListView.css';
import Modal from './components/Modal';

export function ListView({token}){

    const [editModalOpen, setEditModalOpen] = useState(false);

    const newTaskInitialValues = {
        title: "", 
        desc: ""
    };
    const editTaskInitialValues ={
        tite: "",
        marked_as_done: false
    };

    let [createTaskValues, setNewTaskValues] = useState(newTaskInitialValues);
    let [editTaskValues, setEditTaskValues] = useState(editTaskInitialValues);
    let [tasks, setTaskArray] = useState([]);

    useEffect(() => {
        if (!editModalOpen){
            fetchData();
        }
      }, [editModalOpen]);

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
        const url=`http://demo2.z-bit.ee/tasks/${editTaskValues.id}`;
        Http.open("PUT", url);
        Http.setRequestHeader("Content-Type", "application/json");
        Http.setRequestHeader("Authorization", "Bearer " + token);
        Http.send(JSON.stringify(editTaskValues));

        setEditModalOpen(false);
    }

    function handleEditButton(task){
        setEditModalOpen(true);
        setEditTaskValues({...task})
    }

    const handleNewTaskInputChange = (e) => {
        const { name, value } = e.target;
    
        setNewTaskValues({
          ...createTaskValues,
          [name]: value,
        });
    };

    const handleEditTaskInputChange = (e) => {
        const { name, value, checked, type } = e.target;

    
        setEditTaskValues({
          ...editTaskValues,
          [name]: type == "checkbox" ? checked : value,
        });
    };


    return(
        <div>
            <form onSubmit={SaveTask}>
                <label htmlFor="title">Title</label>
                <input name="title" value={createTaskValues.title} onChange={handleNewTaskInputChange} type="text" required="required"/>

                <label htmlFor="desc">Description</label>
                <input name="desc" value={createTaskValues.desc} onChange={handleNewTaskInputChange} type="text" required="required"/>

                <input type="submit" value="Submit"></input>
            </form>

            <Modal open={editModalOpen} onClose={() => {setEditModalOpen(false)}}>
                <form onSubmit={EditTask}>

                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" value={editTaskValues['title']} onChange={handleEditTaskInputChange}/>

                    <label htmlFor="marked_as_done">Is done: </label>
                    <input type="checkbox" name="marked_as_done" checked={editTaskValues['marked_as_done']}  onChange={handleEditTaskInputChange}/>

                    <input type="submit" value="Submit"></input>

                </form>
            </Modal>

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
                            <button onClick={() => handleEditButton(task)}>Edit</button>
                        </li>
                    )
                })}
            </ul>

        </div>

        
  )
}

