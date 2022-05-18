import React from 'react'
import './Todo.css'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import axios from 'axios';
import { toast } from 'react-toastify';




export const Todo = ({task,deleteTask,completeTask}) => {
  const {_id,name,desc,complete}= task;
  const deleteCurrentTask = (id)=>{
    const confirm = window.confirm("Confirm Delete This Task?");
    if(confirm){
    axios.delete(`http://localhost:5000/deleteTask/${id}`)
    .then(res=>{
      toast("Task Deleted Succesfully!")
      deleteTask(id);
    })
    }
  }
  const completeCurrentTask = (id)=>{
    const confirm = window.confirm("Confirm Compleating This Task?");
    if(confirm){
    axios.put(`http://localhost:5000/completeTask/${id}`)
    .then(res=>{
      toast("Task Completed Succesfully!")
      completeTask(id);
    })
    }
  }



  return (
    <div className={` todo d-flex flex-column flex-lg-row justify-content-between align-items-center rounded p-3 my-2 secondery-bg ${complete?"secondery-text":''}`}>
      <div>
        {complete?
        <>
        <h4 style={{textDecoration: 'line-through'}}>{name}</h4>
        <p style={{textDecoration: 'line-through'}}><small>{desc}</small></p>
        </>
        :
        <>
        <h4 className='primary-text'>{name}</h4>
        <p className='secondery-text'><small>{desc}</small></p>
        </>
        }
      </div>
      <div>
        {!complete?<button onClick={()=>completeCurrentTask(_id) } className='btn btn-white'><CheckCircleIcon style={{width:"30px"}} className="text-success"/></button>:""}
      <button onClick={()=>deleteCurrentTask(_id) } className='btn btn-white'><XCircleIcon style={{width:"30px"}} className="text-danger"/></button>
      </div>
      </div>
  )
}
