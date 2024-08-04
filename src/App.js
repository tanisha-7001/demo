import MainPage from './MainPage';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import StudentLogin from './StudentLogin.js';
import AdminLogin from './AdminLogin.js';
const App = () => {
  return (
    <>
    <h1 style={{color: '#111010',paddingLeft:370,paddingBottom:50}}>System</h1>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />}  />     
      </Routes>
    </Router></>
  );
};

export default App;