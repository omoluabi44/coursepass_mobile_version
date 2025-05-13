
import React, { useState,useEffect } from 'react'
import "./contentManagement.css"
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
import MessageErrorSuccess from '../../component/messageErrorSuccess';

export default function Note() {
               const [note, setNote] = useState([]);
                const [isId, setIsId] = useState(false)
                const [status, setStatus] = useState(null);
                const [editingNoteID, setEditingNoteID] = useState(null);
                 const [formData, setFormData] = useState({
                orderID: 0,
                outlineID: "",
                content:"",
                session:""
              });
        
              const { content,outlineID,orderID,session} = formData
          
              
              
              //get particular courses to edit it outline
                const handleGet = async (e) =>{
                       e.preventDefault();
                    try {
                        const response = await axiosInstance.get(`/outline/${outlineID}/notes`)
                        setIsId(true)
                        setNote(response.data)       
                    } catch (error)
                     {
                         console.log(error);
                            
                     }
                    }
                    console.log(" outlineID 1: ",outlineID);
                    
                // this function is responsible to update the outline of course upon editted
                 const fetchOutline = async () => {
                 
                    
                    console.log(" outlineID 2: ",outlineID);
                    
                        try {
                          const response = await axiosInstance.get(`/outline/${outlineID}/notes`)
                          // console.log(response);
                          
                          setNote(response.data);
                        } catch (error) {
                          console.error("Error fetching courses:", error);
                        }
                      }
                    ;
                
              //handle submission of courses 
                const handleSubmit = async (e) =>
                {
                    // console.log(editingOutlineID);
                    
                 e.preventDefault();
         
                 
                 try {
                  if(editingNoteID){ 
                    await axiosInstance.put(`/note/${editingNoteID}`, 
                      {
                         outlineID:outlineID, orderID:orderID,content:content,session:session
                      }
                    );
                    fetchOutline()
                    setStatus({ success: true, message: "Note updated successfully!" });
                  }else{
                        await axiosInstance.post("/note",
                            {
                                outlineID:outlineID, orderID:orderID,content:content,session:session
                            }
                        )
                        setStatus({ success: true, message: "Note created successfully!" });
                      
                       fetchOutline();
              
                   }
                  setFormData({ outlineID:outlineID, orderID:" ",content:" ",session:"" });
                    fetchOutline();
                    setEditingNoteID(null);
                   
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
                const handleEdit =(note) =>
                {
                    setFormData(note)
                   setEditingNoteID(note.id)
                    console.log(editingNoteID);   
                }
                // handle deletion
                const handleDelete = async (id)=>{
                    if (window.confirm("Are you sure you want to delete this Note?")){
                        try {
                            await axiosInstance.delete(`/note/${id}`)
                            console.log("success");
                             fetchOutline();
                              setFormData({ outlineID:outlineID, orderID:" ",content:" ",session:"" });
                              setStatus({ success: true, message: "Note Deleted successfully!" });
                            
                        } catch (error) {
                            console.error(error);
                             setStatus({ success: false, message: "Note Deleting is  unsuccessfully!" });
                             console.log(error.message);
                             
                            
                        }
                    }
        
                }
        //  console.log("this is editingCourseID ",editingCo
        // console.log(formData);
  return (
    <div>
        <div className='flex gap-7'> 
        <div className='mt-5 flex flex-col'>
        <h1 className='text-accent  font-bold mb-10'> {editingNoteID? "UPDATE NOTE":"CREATE NOTE"}</h1>
        <MessageErrorSuccess status={status}/>
          <div>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <div className='flex '>
                      <label   htmlFor="outlineID" className='mr-2'>outline Id</label>
                      <input
                      name='outlineID'
                      id='outlineID'
                      value={formData.outlineID}
                      className=' h-[30px] rounded pl-2'
                      type='text'
                      placeholder='outline Id'
                      require
                      onChange={handleChange}
                      />
                    </div>
                     <button onClick={handleGet} className='bg-accent rounded hover:bg-white hover:text-accent hover:border border-accent w-20 h-8  text-white'> Get</button>
                </div>
                
              <div className='flex  justify-between gap-5 mt-2'>
            
                  <div className='flex '>
                      <label  htmlFor="orderID" className='mr-2'>order Id</label>
                      <input
                      className=' h-[30px] rounded pl-2'
                      type='text'
                      name='orderID'
                      id='orderID'
                      placeholder='Course Id'
                      require
                      value={formData.orderID}
                      onChange={handleChange}
                      />
                    </div>
                    <div className='flex '>
                      <label htmlFor="session" className='mr-2'>session </label>
                      <input
                      name='session'
                      id="session"
                      value={formData.session}
                      className=' h-[30px] rounded pl-2'
                      type='text'
                      placeholder='Course Id'
                      onChange={handleChange}
                      require
                      />
                    </div>
              </div>
              <div>
                <textarea
                 value={formData.content}
                 id='content'
                 name='content'
                 onChange={handleChange}
                className='w-[533px] h-100 mt-2 h-40'>
                
                </textarea>
              </div>
              <button  disabled={!isId}  className={`bg-accent rounded hover:bg-white hover:text-accent hover:border border-accent w-20 h-8 text-white ${!isId ? 'opacity-50 cursor-not-allowed' : ''}`}> {editingNoteID? "Update":"Create"}</button>
            </form>
          </div>
        </div>
        <div>
        <div className='flex justify-center mt-10'>
              <table className='min-w-full border border-gray-300 text-left'>
                <thead className='bg-[grey] rounded gap-10'>
                  <tr >
                    <th className="px-4 py-2 border-b">outline</th>
                    <th className="px-4 py-2 border-b">session</th>
                    <th className="px-4 py-2 border-b">actions</th>
                  </tr>
                </thead>
                <tbody>
                    {note.map((note, id)=>{
                        return(
                            <tr className='hover:bg-accent-100'>
                                <td className="px-4 py-2 border-b" > {note.orderID} </td>
                                <td className="px-4 py-2 border-b">{note.session} </td> 
                                <td className="px-4 py-2 border-b">
                                <button onClick={()=>handleEdit(note)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"> edit </button>
                                <button  onClick={()=>handleDelete(note.id)} className="bg-red-500 ml-2 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"> delete </button>
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
  )
}
