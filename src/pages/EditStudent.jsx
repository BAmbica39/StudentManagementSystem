import React,{useState, useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import StudentService from '../services/studentService';
import '../styles/StudentForm.css';

const EditStudent =()=>
{
    const {id} = useParams();
    const [formData, setFormData] = useState(
        {
            name:"",
            email:"",
            dob:"",
            gender:"",
            phone:"",
            address:"",
            contact:"",
            userId:""

        }

    );
    const navigate = useNavigate();

    useEffect(() =>
    {
        const fecthStudent = async() =>{
        try
        {
            const res= await StudentService.getAllStudents();
            const student= res.data.find((s) => s.id === parseInt(id));
            if(student)setFormData(student);
            else alert("Student not found");
        }
        catch(err){
            alert("failed to fetch students data")

        }
    };
    fecthStudent();
    }, [id]);

    const handleChange =(e) =>
    {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        try
        {
            await StudentService.updateStudent(id,formData);
            alert('students got updates successfully!');
            navigate('/students');
        }
        catch(err)
        {
            alert('failed to update student');
        }
    };
    return(
        <div className="form-container">
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit} className="form-grid">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required></input>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required></input>
                <input type="date" name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} required></input>
                <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} ></input>
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} ></input>
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} ></input>
                <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} ></input>
                <input type="number" name="useId" placeholder="User Id" value={formData.userId} onChange={handleChange} ></input>
                <button type="submit">Update Student</button>
            </form>

        </div>
    );
};

export default EditStudent;