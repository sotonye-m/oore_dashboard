import './App.css';
import { Route, Routes} from 'react-router-dom'
import Dashboard from './pages';
import ProjectsPage from './pages/projects';
import Project from './pages/project';
import Login from './pages/login';
import Signup from './pages/signup';
import { ToastContainer } from 'react-toastify';
import RequireAuth from './context/RequireAuth';
import Otp from './pages/otp';

function App() {
  return (
    <div className="App">
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/otp' element={<Otp />} />
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/project/:projectID' element={<Project />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
