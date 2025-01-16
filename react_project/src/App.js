import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import NavBar from './components/NavBar';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<NavBar />} />
      <Route path="/" element={<EventList />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
