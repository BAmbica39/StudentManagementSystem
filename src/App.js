import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";

//Auth Pages
import Login from './pages/Login';
import  Register from './pages/Register';

//DashBoard
import Dashboard from './pages/DashboardPage';

//Students Pages
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';

//Courses Pages
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';

//Grade Pages
import Grades from './pages/Grades';
import AddGrade from './pages/AddGrade';
import EditGrade from './pages/EditGrade';

//Enrollment Pages
import Enrollments from './pages/Enrollments';
import AddEnrollment from './pages/AddEnrollment';
import EditEnrollment from './pages/EditEnrollment';

//Attendance Pages
import Attendances from './pages/Attendances';
import AddAttendance from './pages/AddAttendance';
import EditAttendance from './pages/EditAttendance';

//Utility Pages
import NotFound from './pages/NotFound';
import ProtectedRoute from './utils/ProtectedRoute';


const App =() =>
{
  return(
    <Router>
      <Routes>
        {/Public Routes/}
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        {/Protected Routes/}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>

        {/Students Routes/}
        <Route path="/students" element={<ProtectedRoute><Students/></ProtectedRoute>}/>
                <Route path="/students/add" element={<ProtectedRoute><AddStudent/></ProtectedRoute>}/>
                        <Route path="/students/edit:id" element={<ProtectedRoute><EditStudent/></ProtectedRoute>}/>

             {/Courses Routes/}
                          <Route path="/courses" element={<ProtectedRoute><Courses/></ProtectedRoute>}/>
                                  <Route path="/courses/add" element={<ProtectedRoute><AddCourse/></ProtectedRoute>}/>

        <Route path="/courses/edit:id" element={<ProtectedRoute><EditCourse/></ProtectedRoute>}/>

              {/Grade Routes/}
                      <Route path="/grades" element={<ProtectedRoute><Grades/></ProtectedRoute>}/>
        <Route path="/grades/add" element={<ProtectedRoute><AddGrade/></ProtectedRoute>}/>
        <Route path="/grades/edit:id" element={<ProtectedRoute><EditGrade/></ProtectedRoute>}/>

      {/Enrollments Routes/}
              <Route path="/enrollments" element={<ProtectedRoute><Enrollments/></ProtectedRoute>}/>
        <Route path="/enrollments/add" element={<ProtectedRoute><AddEnrollment/></ProtectedRoute>}/>
        <Route path="/enrollments/edit:id" element={<ProtectedRoute><EditEnrollment/></ProtectedRoute>}/>

              {/Attendances Routes/}

                <Route path="/attendance" element={<ProtectedRoute><Attendances/></ProtectedRoute>}/>
        <Route path="/attendance/add" element={<ProtectedRoute><AddAttendance/></ProtectedRoute>}/>
        <Route path="/attendance/edit:id" element={<ProtectedRoute><EditAttendance/></ProtectedRoute>}/>


            {/NotFound Routes/}
            <Route path="*" element={<NotFound></NotFound>}/>


      </Routes>
    </Router>
  )

}

export default App;