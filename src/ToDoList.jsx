import React, { useState } from 'react';
import AlertDialogDemo from './AlertDialog.jsx';
import EditDialog from './EditDialog.jsx';

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [deletingIndex, setDeletingIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function editTask(index, newText){
        const updatedTasks = [...tasks]
        updatedTasks[index] = newText
        setTasks(updatedTasks);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask(""); 
        }
    };

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    return(
        <>
        <div className="flex justify-center mt-10">
            <input type="text" placeholder="Enter a new task." className=" border-2 border-black text-2xl text-center bg-white outline-none" value={newTask} onChange={handleInputChange}/>
        </div>

        <div className="flex justify-center mt-10">
            <button className="bg-blue-900 rounded-2xl p-2 w-25 mb-10 font-bold text-white shadow-black shadow-xs transition-all duration-300 ease-in-out hover:bg-blue-950 hover:scale-120 hover:shadow-blue-950 hover:shadow-md cursor-pointer" onClick={addTask}>Add</button>
        </div>

       <ol className='flex flex-col items-center'>
        {tasks.map((task, index) => (
            <li key={index} className="flex w-fit m-2 p-5 border-2 border-black bg-blue-200 rounded-xl font-bold">
                <div className="flex justify-between min-w-[300px]">
                    <span className="text-xl">{task}</span>
                    <div className='flex gap-2'>
                        <button className="flex bg-red-800 text-white rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-red-900 hover:shadow-red-900 hover:shadow-md cursor-pointer" onClick={() => setDeletingIndex(index)}><span className="material-symbols-outlined">delete</span></button>
                        <button className="flex bg-blue-900 text-white rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-blue-950 hover:shadow-blue-950 hover:shadow-md cursor-pointer" onClick={() => moveTaskUp(index)}><span class="material-symbols-outlined">north</span></button>
                        <button className="flex bg-blue-900 text-white rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-blue-950 hover:shadow-blue-950 hover:shadow-md cursor-pointer" onClick={() => moveTaskDown(index)}><span class="material-symbols-outlined">south</span></button>
                        <button className="flex bg-blue-900 text-white rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-blue-950 hover:shadow-blue-950 hover:shadow-md cursor-pointer" onClick={() => setEditIndex(index)}><span class="material-symbols-outlined">edit</span></button>
                    </div>
                    
                </div>
            </li>
        ))}
        </ol>

        {deletingIndex !== null && (
            <AlertDialogDemo onConfirm={() => { deleteTask(deletingIndex); setDeletingIndex(null); }} onCancel={() => { setDeletingIndex(null)}}/>
        )}
            
        {editIndex !== null && (
            <EditDialog  initialText={tasks[editIndex]} onSave={(updatedText) => { editTask(editIndex, updatedText); setEditIndex(null)}} onCancel={() => {setEditIndex(null)}}/>
      )}

    </>
  )
}

export default ToDoList