import React, { useState,useEffect } from 'react'
import "./contentManagement.css"
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
import Course from './courses';
import Outline from './outline';
import Note from './note';



export default function ContentManagement() {

  return (
    <>
    <div >
<div className='flex gap-5'>
  <Course/>
  <Outline/>
   
    
    
  </div>

      {/* create and update content */}
      <Note/>
      
    </div>
    </>

   
  )
}
