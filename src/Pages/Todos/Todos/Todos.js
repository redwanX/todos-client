import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import AddTodo from '../AddTodo/AddTodo'
import { Todo } from '../Todo/Todo';

const Todos = () => {
    const [user,loading] = useAuthState(auth);
    const [tasks ,setTasks] = useState([]);
    const [tasksLoading,setTasksloading] = useState(false);
    const location = useLocation();
    const deleteTask = id =>{
        setTasks(tasks.filter((task)=>task._id !==id));
    }
    const completeTask = id =>{
        setTasks(tasks.map((task)=>task._id ===id? {...task, complete : true}:task));
    }
    const updateTasks =(newTask)=>{
        setTasks([...tasks,newTask])
    }
    useEffect(()=>{
      const authToken =localStorage.getItem('authToken');
      if(user){
            setTasksloading(true);
            const email = user?.user?.email || user?.email;
              axios.get(`https://calm-fortress-89939.herokuapp.com/todos?email=${email}`,{
              headers:{authorization: `Bearer ${authToken}`}
            })
            .then(res=>{
                setTasks(res.data);
                setTasksloading(false);
            })
            .catch(err=>{
              if(err.response.status ===401 || err.response.status ===403){
                toast("YOU ARE NOT AUTHORIZED!");
                signOut(auth)
                return <Navigate to="/login" state={{ from: location }} replace />
              }
            })
           }
        
           
        },
    [user])
    if(loading || tasksLoading){
      return <Loading></Loading>
  }






  return (
    <div style={{minHeight: 'calc(100vh - 116px - 16px)'}} className='container'>
        <h1 className='text-secondary fw-bolder text-center'>TODOS</h1>
        <hr />
        <AddTodo updateTasks={updateTasks}></AddTodo>
        <h3 className='text-secondary fw-bolder my-3 text-center'>ALL TASKS</h3>
        <hr />
        {tasks.length ===0 ?
        <p className='primary-text fw-bold text-center'>You Don't Have Any Tasks.</p>
        :
        tasks.map(task=><Todo deleteTask={deleteTask} completeTask={completeTask} user={user} key={task._id} task={task}></Todo>)
        }
        </div>
  )
}

export default Todos