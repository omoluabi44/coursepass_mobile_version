import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
// import s from "./CourseList.module.css";
import MessageErrorSuccess from '../../component/messageErrorSuccess';

export default function Outline() {
            const [outline, setOutline] = useState([]);
            const [isId, setIsId] = useState(false)
            const [status, setStatus] = useState(null);
            const [editingOutlineID, setEditingOutlineID] = useState(null);
             const [formData, setFormData] = useState({
            orderID: 0,
            courseID: "",
            topic:""
          });
    
          const { orderID,courseID,topic} = formData

          //get particular courses to edit it outline
            const handleGet = async (e) =>{
                   e.preventDefault();
                try {
                    const response = await axiosInstance.get(`/course/${courseID}/outlines`)
                    setIsId(true)
                    setOutline(response.data)       
                } catch (error)
                 {
                     console.log(error);
                        
                 }
                }
            // this function is responsible to update the outline of course upon editted
             const fetchOutline = async () => {
                    try {
                      const response = await axiosInstance.get(`/course/${courseID}/outlines`);
                      // console.log(response);
                      
                      setOutline(response.data);
                    } catch (error) {
                      console.error("Error fetching courses:", error);
                    }
                  }
                ;
            
          //handle submission of courses 
            const handleSubmit = async (e) =>
            {
                console.log(editingOutlineID);
                
             e.preventDefault();
             try {
              if(editingOutlineID){ 
                await axiosInstance.put(`/outline/${editingOutlineID}`, 
                  {
                     courseID:courseID, orderID:orderID,topic:topic
                  }
                );
                fetchOutline()
                setStatus({ success: true, message: "outline updated successfully!" });
              }else{
                    await axiosInstance.post("/outline/",
                        {
                            courseID:courseID, orderID:orderID,topic:topic
                        }
                    )
                    setStatus({ success: true, message: "outline created successfully!" });
          
               }
               setFormData({ courseID:courseID, orderID:" ",topic:" " });
                 setEditingOutlineID(null);
                fetchOutline();
             } catch (error) {
              console.log(error); 
              setStatus({ success: false, message: error.message }); 
             
               
             }
            }
    
          //handle on changes when typing 
          const handleChange = (e)=>
            {
                const {name, value  } = e.target;
                setFormData((prev) =>({...formData,  [name]:value}))
            }
    
            //handle editing 
            const handleEdit =(outline) =>
            {
                setFormData(outline)
                setEditingOutlineID(outline.id)
                console.log(editingOutlineID);   
            }
            // handle deletion
            const handleDelete = async (id)=>{
                if (window.confirm("Are you sure you want to delete this outline?")){
                    try {
                        await axiosInstance.delete(`/outline/${id}`)
                        console.log("success");
                         fetchOutline();
                          setFormData({ courseID:courseID, orderID:" ",topic:" " });
                          setStatus({ success: true, message: "outline Deleted successfully!" });
                        
                    } catch (error) {
                        console.error(error);
                         setStatus({ success: false, message: "outline Deleting is  unsuccessfully!" });
                         console.log(error.message);
                         
                        
                    }
                }
    
            }
    //  console.log("this is editingCourseID ",editingCo
    // console.log(formData);
    

  return (
    <div>
         <div className='flex flex-col border rounded w-[550px] p-2'>
      <h1 className='text-accent  font-bold mb-10'> REGISTER NEW OUTLINE</h1>
       <MessageErrorSuccess status={status}/>
      <div className='  '>
          <div>
            <form onSubmit={handleGet} >
            
                <div className=' flex items-end  gap-4 mb-5'>
                     <div className='flex flex-col'>
                        <label htmlFor="courseID" className='mb-3'>Course Id</label>
                        <input
                        className=' h-[30px] w-min rounded pl-5'
                        type='text'
                        id='courseID'
                        name='courseID'
                        value={setFormData.courseID}
                        onChange={handleChange}
                        placeholder='Course Id'
                        require
                        />
                    </div>
                    <button  className='bg-accent rounded hover:bg-white hover:text-accent hover:border border-accent w-20 h-8  text-white'> Get</button>
                
              </div>
              </form>
              <form onSubmit={handleSubmit}>
              <div >
            <div className='flex gap-5 items-end '>
                    <div className='flex flex-col'>
                    <label  htmlFor="topic" className='mb-3'>Outline</label>
                    <input
                    id='topic'
                    name='topic'
                    value={formData.topic}
                    className=' h-[30px] rounded pl-5'
                    type='text'
                    onChange={handleChange}
                    placeholder='outline name'
                    require
                    />

                </div>
                <div className='flex flex-col'>
                    <label  htmlFor="orderID" className='mb-3'>orderID</label>
                    <input
                    className=' h-[30px] rounded pl-5'
                    type='text'
                    name='orderID'
                    id="orderID"
                    value={formData.orderID}
                    onChange={handleChange}
                    placeholder='order Id'
                    require
                    />

                </div>
                <button  disabled={!isId}  className={`bg-accent rounded hover:bg-white hover:text-accent hover:border border-accent w-20 h-8 text-white ${!isId ? 'opacity-50 cursor-not-allowed' : ''}`}> {editingOutlineID? "Update":"Create"}</button>
            </div>
             
              
              </div>
            
            </form>
            {/* table */}
            <div className='flex justify-center mt-10'>
              <table className='min-w-full border border-gray-300 text-left'>
                <thead className='bg-[grey] rounded gap-10'>
                  <tr >
                    <th className="">Topic</th>
                    <th className="px-20"> id</th>
                    <th className=""> orderID</th>
                    <th className="px-6 py-2 ">actions</th>
                  </tr>
                </thead>
                <tbody>
                    {outline.map((outline, id)=>{
                        return(

                        
                    <tr key={id} className='hover:bg-accent-100'>
                        <td className="py-2 " >{outline.topic} </td>
                        <td className="px-10 "> {outline.id}</td> 
                        <td className=" py-2 ">{outline.orderID} </td> 
                        <td className="flex">
                        <button onClick={()=>handleEdit(outline)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"> edit </button>
                        <button  onClick={()=>handleDelete(outline.id)} className="bg-red-500 ml-2 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"> delete </button>
                        </td>
                  </tr>
                        )

                    })}
                 
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
    </div>
  )
}
