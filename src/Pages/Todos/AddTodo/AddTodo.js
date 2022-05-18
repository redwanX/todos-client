import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading'

const AddTodo = ({updateTasks}) => {
    const [validated, setValidated] = useState(false);
    const [user, loading, error] = useAuthState(auth)
    if (loading) {
        return <Loading></Loading>
    }
    const saveTask=(e,body)=>{   
        if(user){
            const email =user.email?user.email:"redwan@gmail.com";
            body = {email,...body};
            const confirm= window.confirm("Confirm Add This Task?")
            if(confirm){
              axios.post(`http://localhost:5000/addtask`,body)
            .then(res=>{
                toast("Added Task Succesfully");
                body._id=res.data.insertedId;
                updateTasks(body)
                e.target.reset();
            })
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        setValidated(true);
        if(form.checkValidity()===true){
        
            const name =event.target.name.value;
            const desc =event.target.desc.value;
            const complete = false;
            const body ={name,desc,complete};
            saveTask(event,body);
          setValidated(false);
        }
      };

  return (
    <div  className='container mb-3'>

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        
        <Form.Group  className='mb-3' controlId="validationCustom00">
            <Form.Control className='secondery-bg' name="name"  type="text" placeholder="Task Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Task Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group  className='mb-3' controlId="validationCustom04">
            <Form.Control className='secondery-bg' name="desc" type="text" placeholder="Task Description" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Task Description.
            </Form.Control.Feedback>
          </Form.Group>

        <Button className='rounded-pill px-4 btn-dark w-100' type="submit">Add Task</Button>
      </Form>
    </div>
  )
}

export default AddTodo