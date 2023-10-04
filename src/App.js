import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskBoard from './pages/TaskBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoutes from './Services/ProtectedRoutes';
import Weather from './pages/Weather';
import Calculator from './pages/Calculator';

const App = () => {

  const apiKey=process.env.REACT_APP_API_KEY;

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Route */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<TaskBoard />} />
      </Route>

      <Route path="/weather" element={<Weather apiKey={apiKey}/>}/>
      <Route path="/calculator" element={<Calculator />}/> 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
