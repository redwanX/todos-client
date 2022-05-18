import React from 'react'
import notFound from '../../../Images/404.png'
const PageNotFound = () => {
  return (
      <div className='secondery-bg'>
          
    <div className='container d-flex flex-column align-items-center justify-content-center' style={{minHeight: 'calc(100vh - 116px - 74px)'}}>
            <img className='w-50' src={notFound} alt="" />
            <h4 className='primary-text pt-3'>PAGE NOT FOUND</h4>
    </div>
      </div>
  )
}

export default PageNotFound
