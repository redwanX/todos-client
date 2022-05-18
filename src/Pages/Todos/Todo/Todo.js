import React from 'react'
import './Todo.css'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import axios from 'axios';
import { toast } from 'react-toastify';




export const Todo = ({task,deleteTask,user}) => {
  const {_id,name,desc}= task;
  const deleteCurrentTask = (id)=>{
    const confirm = window.confirm("Confirm Delete This Task?");
    if(confirm){
    axios.delete(`http://localhost:5000/deleteTask/${id}`)
    .then(res=>{
      toast("Item Deleted Succesfully!")
      deleteTask(id);
    })
    }
}



  return (
    <div className=' todo d-flex flex-column flex-lg-row justify-content-between align-items-center secondery-bg rounded p-3 my-2'>
      <div>
        <h4 className='primary-text'>{name}</h4>
        <p className='secondery-text'><small>{desc}</small></p>
      </div>
      <div>
      <button  className='btn btn-white'><CheckCircleIcon style={{width:"30px"}} className="text-success"/></button>
      <button onClick={()=>deleteCurrentTask(_id) } className='btn btn-white'><XCircleIcon style={{width:"30px"}} className="text-danger"/></button>
      </div>
      </div>
  )
}
