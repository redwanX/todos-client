import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';
import SocialAuth from '../SocialAuth/SocialAuth';
import axios from 'axios';

const Register = () => {
  const [userAuthenticate,loadingAuthenticate] = useAuthState(auth)
    const [validated, setValidated] = useState(false);
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const nameRef = useRef('');
    const navigate = useNavigate()
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    
    
    useEffect(()=>{
      const tokenUpdate = async()=>{ 
        if(userAuthenticate){
          const email = userAuthenticate.email;
          const {data}= await axios.post('http://localhost:5000/login',{email});
          localStorage.setItem('authToken',data.token)
          navigate('/',{replace:true});
        }
      }
        tokenUpdate();
    },[userAuthenticate]);

    useEffect(()=>{
      if(error){
        toast(error?.message)
      }
    },[error]);
    useEffect(()=>{
      if(user){
        if(!emailError){
          toast('Verification Email Sent, Please Check Your Email For Confirmation Link')
        }
        navigate('/');

      }
    },[user]);
    if(loading||loadingAuthenticate||sending||updating){
      return <Loading></Loading>
    }
    const handleRegister = async()=>{
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
      await sendEmailVerification(email)
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
      if(form.checkValidity()===true){
        handleRegister(); 
        setValidated(false);
      }
    };
  
    return (
      <div style={{minHeight: 'calc(100vh - 142px - 72px)'}} className='pt-5 col col-lg-6 col-12 mx-auto container'>   
        <h1 className='text-secondary fw-bolder'>REGISTER</h1>
        <hr />
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group  className='mb-3' controlId="validationCustom00">
            <Form.Control className='secondery-bg' ref={nameRef} type="text" placeholder="Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Name.
            </Form.Control.Feedback>
          </Form.Group>
        
        <Form.Group  className='mb-3' controlId="validationCustom01">
            <Form.Control className='secondery-bg' ref={emailRef} type="email" placeholder="Email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId="validationCustom02">

            <Form.Control className='secondery-bg' ref={passwordRef} type="password" minLength='6' placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.(Min 6 Charecter Long)
            </Form.Control.Feedback>
          </Form.Group>
        <Button className='rounded-pill px-4 btn-dark' type="submit">Register</Button>
      </Form>
      <p className='fw-bold pt-2'>Already Registered? <Link to='/login' className='primary-text pe-auto text-decoration-none'>Login</Link>  </p>
      <SocialAuth></SocialAuth>
        </div>
  )
}

export default Register