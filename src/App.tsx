import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Scheduled from "./pages/Scheduled"
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Home from "./pages/Home"
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>

        <Route path='/scheduled' element={<PrivateRoute><Scheduled /></PrivateRoute>}>
        </Route>

        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}>
        </Route>

        <Route path='/admin' element={<PrivateRoute><Home /></PrivateRoute>}>
        </Route>
      </Routes>


    </Router>
  )
}

export default App
