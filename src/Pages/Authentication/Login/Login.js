import axios from 'axios';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react'
import { Button,Form } from 'react-bootstrap';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialAuth from '../SocialAuth/SocialAuth';
const Login = () => {
  const [userAuthenticate,loadingAuthenticate] = useAuthState(auth)
    const [tokenloading,setTokenLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);
   
    let from = location.state?.from?.pathname || "/";
    useEffect(()=>{
      const tokenUpdate = async()=>{ 
      if(userAuthenticate){
        setTokenLoading(true);
        const email = userAuthenticate.email;
        const {data}= await axios.post('https://calm-fortress-89939.herokuapp.com/login',{email});
        localStorage.setItem('authToken',data.token)
        setTokenLoading(false);
        navigate(from,{replace:true});
      }
    }
      tokenUpdate();
    },[userAuthenticate]);

 
    useEffect(()=>{
      if(error){
        toast(error?.message)
      }
    },[error]);



    if(loading||loadingAuthenticate||tokenloading){
      return <Loading></Loading>
    }
    const handleLogin =async()=>{
          const email = emailRef.current.value;
          const password = passwordRef.current.value;
          await signInWithEmailAndPassword(email,password);
    }
    const handleResetPassword = async ()=>{
      const email = emailRef.current.value;
      const validateEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
      if(email && validateEmail){
        sendPasswordResetEmail(auth, email)
        .then(() => {
          toast("Reset Link Sent To email")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast(errorMessage)
        });

      }
      else{
          toast('please Enter Your Valid Email Address');
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
          handleLogin();
          setValidated(false);
      }
    };
  
    return (
      <div style={{minHeight: 'calc(100vh - 116px - 16px)'}} className=' pt-5 col col-lg-6 col-12 mx-auto container'>   
        <h1 className='text-secondary fw-bolder'>LOGIN</h1>
        <hr />
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3'  controlId="validationCustom01">
            <Form.Control className='secondery-bg' ref={emailRef} type="email" placeholder="Email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId="validationCustom02">
            <Form.Control className='secondery-bg' ref={passwordRef} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
        <Button className='rounded-pill btn-dark mt-1  px-4' type="submit">Login</Button>
      </Form>
      
      <p className='fw-bold mt-2 p-0 m-0'>New User? <Link to='/register' className='primary-text pe-auto text-decoration-none ps-2'>Register</Link>  </p>
      <p className='fw-bold p-0 m-0'>Forgot Password?<button className='btn btn-link p-0 fw-bold primary-text pe-auto  ps-2 text-decoration-none' onClick={handleResetPassword}>Reset Password</button> </p>
      
      <SocialAuth></SocialAuth>
        </div>
    )
 
}

export default Login