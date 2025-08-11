import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import gradeService from '../services/gradeService';
import '../styles/grades.css';

const Grades = ()=>
{
    const[grades, setGrades] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>
    {
        fecthGrades();
    }, []);
    const fecthGrades = async() =>
    {

        try{
            const response= await gradeService.getAllGrades();
            setGrades(response.data);
        }
        catch(error)
        {
            console.error('Error in fecthing grades:', error);
        }
    };
    const handleDelete = async(id) =>
    {
        if(window.confirm("Are you sure you want to delete this grade?"))
        {
            try{
                gradeService.deleteGrade(id);
                fecthGrades();
            }
            catch(error)
            {
                console.error('Error deleting grade:', error);
            }
        }
    };
    return(
        <div className='grades-container'>
            <h2 className='grades-title'> Grades List</h2>
            <button className='add-grade-btn' onClick={()=>navigate('/grades/add')}>Add Grade</button>
            <table className='grades-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Grade</th>
                        <th>Marks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        grades.length>0?(
                            grades.map((g) => (
                                <tr key={g.id}>
                                    <td>{g.id}</td>
                                    <td>{g.studentName}</td>
                                    <td>{g.courseTitle}</td>
                                    <td>{g.grade}</td>
                                    <td>{g.marks}</td>
                                    <td>
                                        <button className='edit-btn' onClick={() => navigate('/grades/edit/${g.id')}>Edit</button>
                                        <button className='delete-btn' onClick={() =>handleDelete(g.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan="6" className='no-data'> No grades found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );

};
export default Grades;