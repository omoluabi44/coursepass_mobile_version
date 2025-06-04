import React from 'react'
import s from "../pages/contentManagment/CourseList.module.css"


export default function MessageErrorSuccess({status}) {
  return (
    <div>
          {status &&(
                <div className={`${s.status_message} ${status.success ? s.success : s.error}`}>
                  {status.message}
                </div>
              )}
        
    </div>
  )
}
