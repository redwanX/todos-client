import React from 'react'

const Loading = () => {
  return (
    <div style={{minHeight: 'calc(100vh - 116px - 74px)'}} className="d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
        </div>
        </div>
    </div>
  )
}

export default Loading