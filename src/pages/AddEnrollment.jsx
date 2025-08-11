import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import enrollmentService from "../services/enrollmentService";
import studentService from "../services/studentService";
import courseService from "../services/courseService";
import e from "express";

const AddEnrollment =()=>
{
    const [students, setStudents]= useState([]);
    const [courses, setCoures]= useState([]);
    const [studentId, setStudentId]= useState('');
    const [courseId, setCourseId]= useState('');
    const [enrollmentDate, setEnrollmentDate] = useState('');

    const navigate = useNavigate();
    useEffect(() =>
    {
        const loadData = async() =>
        {
            try{
                const[studentRes, courseRes] = await Promise.all([
                    studentService.getAllStudents(),
                    courseService.getAllCourses()
                ]);
                setStudents(studentRes.data);
                setCoures(courseRes.data);
            }
            catch(err)
            {
                console.error("error loading the dropdown list", err);
            }
        };
        loadData();
    }, []);
    const handleSubmit= async(e) =>
    {
        e.preventDefault();
        const newEnrollment = {
            studentId : parseInt(studentId),
            courseid : parseInt(courseId),
            enrollmentDate
        };
        try{
            await enrollmentService.addEnrollment(newEnrollment);
            navigate('/enrollments');
        }
        catch(err)
        {
            console.error("Error in adding enrollment", err);
        }
    };
    return (
        <div className="form-conatainer">
            <h2>Add Enrollment</h2>
            <form onSubmit={handleSubmit}>
                <label>Student</label>
                <select value={studentId} onChange={(e) =>setStudentId(e.target.value)} required>
                    <option value="">--Select Student--</option>
                    {
                        students.map((s) => (
                            <option key= {s.id}>{s.name || s.username || 'Student #${s.id}'}</option>
                        ))
                    }
                </select>
                <label>Course</label>
                <select value={courseId} onChange={(e) =>setCourseId(e.target.value)} required>
                    <option value="">--Select Course--</option>
                    {
                        courses.map((c) => (
                            <option key= {c.id}>{c.name  || 'Course #${c.id}'}</option>
                        ))
                    }
                </select>
                <label>Enrollment Date</label>
                <input type="text" value={enrollmentDate} onChange={(e) => setEnrollmentDate(e.target.value)} required></input>
                <button type='submit'>Add enrollment</button>
            </form>

        </div>
    );
};
export default AddEnrollment;