import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
// import s from "./CourseList.module.css";
import MessageErrorSuccess from '../../component/messageErrorSuccess';


export default function Course() {
        const [courses, setCourses] = useState([]);
        const [status, setStatus] = useState(null);
        const [editingCourseID, setEditingCourseID] = useState(null);
         const [formData, setFormData] = useState({
        courseID: "",
        courseName: "",
      });

    //get all cources
    useEffect(() => {
        fetchCourses();
      }, []);
    
       const fetchCourses = async () => {
        try {
          const response = await axiosInstance.get("/courses");
          // console.log(response);
          
          setCourses(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      //handle submission of courses 
        const {courseID, courseName} = formData
        const handleSubmit = async (e) =>
        {
         e.preventDefault();
         try {
          if(editingCourseID){ 
            await axiosInstance.put(`/course/${editingCourseID}`, 
              {
                 courseID:courseID, courseName:courseName
              }
            );
            setStatus({ success: true, message: "Course updated successfully!" });
          }else{
                await axiosInstance.post("/course/",
                    {
                         courseID:courseID, courseName:courseName
                    }
                )
                setStatus({ success: true, message: "Course created successfully!" });
      
           }
           setFormData({ courseID: "", courseName: "" });
             setEditingCourseID(null);
            fetchCourses(); 
         } catch (error) {
          console.log(error); 
          setStatus({ success: false, message: "Failed to save course. Please try again", error });  
         }
        }

      //handle on changes when typing 
      const handleChange = (e)=>
        {
            const {name, value  } = e.target;
            setFormData((prev) =>({...formData,  [name]:value}))
        }

        //handle editing 
        const handleEdit =(course) =>
        {
            setFormData(course)
            setEditingCourseID(course.id)
            console.log(editingCourseID);   
        }
        // handle deletion
        const handleDelete = async (id)=>{
            if (window.confirm("Are you sure you want to delete this course?")){
                try {
                    await axiosInstance.delete(`/course/${id}`)
                    console.log("success");
                     fetchCourses();
                    
                } catch (error) {
                    console.error(error);
                    
                }
            }

        }
//  console.log("this is editingCourseID ",editingCourseID);   
  return (
    <div>
        <div className='flex flex-col border rounded w-[550px] p-2'>
      <h1 className='text-accent  font-bold mb-10'>{editingCourseID? "Edit course":"Create course"}</h1>
      {/* {status &&(
        <div className={`${s.status_message} ${status.success ? s.success : s.error}`}>
          {status.message}
        </div>
      )} */}
      <MessageErrorSuccess status={status}/>

      <div className=' '>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='flex gap-5 items-end '>

              
              <div className='flex flex-col'>
                <label htmlFor="courseName" className='mb-3'>Course Name</label>
                <input
                className=' h-[30px] rounded pl-5 bg-gray'
                type='text'
                id="courseName"
                name='courseName'
                value={formData.courseName}
                placeholder='course name'
                onChange={handleChange}
                require
                />
              </div>
              <div className='flex flex-col'>
                <label  htmlFor="courseID" className='mb-3'>Course Id</label>
                <input
                id="courseID"
                name='courseID'
                className=' h-[30px] rounded pl-5'
                type='text'
                value={formData.courseID}
                placeholder='course name'
                onChange={handleChange}
                require
                />

              </div>
              <button type='submit' className='bg-accent rounded hover:bg-white hover:text-accent hover:border border-accent w-20 h-8  text-white'> {editingCourseID? "Update":"create"}</button>
              </div>
            
            </form>
            {/* table */}
            <div className='max-h-64 overflow-y-auto flex justify-center mt-10'>
              <table className='min-w-full table-auto border border-gray-300 text-left'>
                <thead className='bg-[grey] rounded gap-10'>
                  <tr >
                    <th className=" ">course name</th>
                    <th className=" ">course id</th>
                    <th className=" px-6 py-2 ">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, id)=>{
                    return(
                    <tr key={id} className='hover:bg-accent-100'>
                    <td className="py-2 border-b" >{course.courseName} </td>
                    <td className="py-2 border-b">{course.courseID}  </td> 
                    <td className="py-2 border-b">
                      <button onClick={() => handleEdit(course)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"> edit </button>
                      <button onClick={() => handleDelete(course.id)} className="bg-red-500 ml-2 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"> delete </button>
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
