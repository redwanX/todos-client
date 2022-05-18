import React, { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

import axios from 'axios';
const SocialAuth = () => {
  //Hooks
  const navigate = useNavigate();
  const location =useLocation();
  const [signInwithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  let from = location.state?.from?.pathname || "/";
    
  //Error Handling
  useEffect(()=>{
      if(error){
        toast(error?.message)
      }
    },[error]);

  //If user wasnt login then take back to place form where it came (checkout)
  useEffect(()=>{
      const tokenUpdate=async()=>{
        if(user){
          const email = user.user.email;
          const {data}= await axios.post('https://calm-fortress-89939.herokuapp.com/login',{email});
          localStorage.setItem('authToken',data.token)
          navigate(from,{replace:true});
        }
      }
      tokenUpdate();
    },[user]);

  const socialLogin = async()=>{
    await signInwithGoogle();
}
  //Loding
  if(loading){
      <Loading></Loading>
    }
 
  return (
    

    <div>
        <div className='d-flex align-items-center'>
          <div style={{ height: '1px' }} className='bg-secondary w-100'></div>
          <p className='p-0 pt-1 mx-3 fw-bold fs-3 text-secondary'>or</p>
          <div style={{ height: '1px' }} className='bg-secondary w-100'></div>
        </div>
        <button  className='w-100 btn btn-dark shadow rounded-lg mb-5' onClick={()=>socialLogin()}>
          <div className='d-flex align-items-center justify-content-center'>
          <span>Continue With Google</span>
          </div>
        </button>


    </div>
  )
}

export default SocialAuth