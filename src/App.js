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
import DonateResult from './pages/donate';
import AccountPage from './pages/account';

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
          <Route path='/donate' element={<DonateResult />} />
          <Route path='/account' element={<AccountPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
