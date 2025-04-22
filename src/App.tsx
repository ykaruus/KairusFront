import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>

        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}>
        </Route>
      </Routes>


    </Router>
  )
}

export default App
