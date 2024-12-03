import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPass from './Components/ResetPass';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </Router>
  );
}

export default App;
