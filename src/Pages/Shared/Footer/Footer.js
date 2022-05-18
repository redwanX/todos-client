import React from 'react'
const Footer = () => {
  return (

        <div className='footer p-3 w-100 flex-column-reverse flex-lg-row d-flex secondery-bg justify-content-around light-text'>
           <div className='d-flex flex-column justify-content-center align-items-center'>
           <h4 className='fw-bold primary-text'>TODOS</h4> 
            <small  className='text-secondary'>©{new Date().getFullYear()} Todos</small >
            <small  className='text-secondary'>All Rights Reserved</small >
           </div>
        </div>
  
  )
}

export default Footer