import React,{useEffect,useState}from'react';
import { useParams,useNavigate } from 'react-router-dom';
import gradeService from '../services/gradeService';
import studentService from '../services/studentService';
import courseService from '../services/courseService';
import enrollmentService from '../services/enrollmentService';



const EditGrade =()=>
{
  const{id} = useParams();
  const navigate = useNavigate();

  const[students,setStudents] = useState([]);
    const[courses,setCourses] = useState([]);
      const[enrollments,setEnrollments] = useState([]);

        const[selectedStudentId,setSelectedStudentId] = useState("");
          const[selectedCourseId,setSelectedCourseId] = useState("");
            const[selectedEnrollmentId,setSelectedEnrollmentId] = useState("");
              const[marks,setMarks] = useState("");
                const[grade,setGrade] = useState("");



                useEffect(()=>
                {
                  studentService.getAllStudents().then(res => setStudents(res.data));
                  courseService.getAllCourses().then(res => setCourses(res.data));
                  enrollmentService.getAllEnrollments().then(res => setEnrollments(res.data));

                  gradeService.getGradeById(id).then(res => 
                  {
                    const data = res.data;
                    setSelectedStudentId(data.studentId);
                    setSelectedCourseId(data.courseId);
                    setSelectedEnrollmentId(data.enrollmentId);
                    setMarks(data.marks);
                    setGrade(data.setGrade);
                  }
                  );
                },[id]);


                const handleSubmit = async (e) =>
                {
                  e.preventDefault();
                  const upadatedGrade ={
                    studentId:Number(selectedStudentId),
                    courseId:Number(selectedCourseId),
                    enrollmentId:Number(selectedEnrollmentId),
                    marks:Number(marks),
                    grade:grade.trim()
                  };

           try{

               await gradeService.updateGrade(id,upadatedGrade);
                    navigate('/grades');

                  }
                  catch(err)
                  {
                    console.error('Error updating grade:',err.response?.data || err.message);
                    alert("Failed to update grade.");
                  }
                };

                const filteredEnrollments = enrollmentService.filter((e) => Number(e.studentId)===Number(selectedStudentId) && Number(e.courseId)===Number(selectedCourseId)

                );

                return
                (
                  <div className='container mt-5'>
                    <div className='card p-4 shadow'> 
                      <h3 className='mb-4 text-center'>Edit Grade</h3>
                      <form onSubmit={handleSubmit}>
                        <select className='form-control mb-3' value={selectedStudentId} onChange={(e) =>
                          {
                            setSelectedStudentId(e.target.value);
                            setSelectedEnrollmentId("");
                          }
                        }>


                          required

                          <option value="">Select Student</option>
                          {
                            students.map((student) =>(
                              <option key={student.id} value={student.id}>{student.name}</option>
                            ))
                          }
                        </select>

                         <select className='form-control mb-3' value={selectedCourseId} onChange={(e) =>
                          {
                            setSelectedCourseId(e.target.value);
                            setSelectedEnrollmentId("");
                          }
                        }>


                          required

                          <option value="">Select Course</option>
                          {
                            courses.map((course) =>(
                              <option key={course.id} value={course.id}>{course.name}</option>
                            ))
                          }
                        </select>

                        {selectedStudentId && selectedCourseId && (

                           <select className='form-control mb-3' value={selectedEnrollmentId} onChange={(e) =>

                            setSelectedEnrollmentId(e.target.value)}required>


                          <option value="">Select Enrollment</option>
                          {
                           filteredEnrollments.length >0 ?
                           (
                            filteredEnrollments.map((enr) =>
                            (
                              <option key={enr.id} value={enr.id}>Enrollments #{enr.id}</option>
                            ))
                           ):(
                            <opton disabled>No Matching Enrollment</opton>
                           )
                          }
                        </select>

                        )}


                        <input type="number" className="form control mb-3" placeholder="EnterMarks" value={marks} onChange={(e) => setMarks(e.target.value)}
                 required></input>
<select
                className="form control mb-3" value={grade} onChange={(e) => setGrade(e.target.value)}
                 required>
                 <option value="">Select Grade</option>
                 <option value="A">A</option>
                 <option value="B">B</option>
                 <option value="C">C</option>
                 <option value="D">D</option>
                 <option value="E">F</option>
                 <option value="F">F</option>
                 </select>


                    <button type='submit' className='btn btn-success w-100'>Update Grade</button>
                      </form>
                    </div>
                  </div>
                );
};

export default EditGrade;