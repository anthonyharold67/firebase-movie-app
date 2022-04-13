import {BrowserRouter as Router,Route,Routes }  from "react-router-dom"
import Main from "../pages/Main"
import Login from "../pages/Login"
import Register from "../pages/Register"
import React from 'react'
import Navbar from "../components/Navbar"
import MovieDetail from "../pages/MovieDetail"

const AppRouter = () => {
  return (
    <Router>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/details/:id" element={<MovieDetail/>}/>

        </Routes>
    </Router>
  )
}

export default AppRouter