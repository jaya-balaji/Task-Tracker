import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LoginSignup from './components/LoginSignup';
import TaskTracker from './components/TaskTrackerApp';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signuploginpage' element={<LoginSignup />} />
          <Route path='/tasktracker' element={<TaskTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
