import React from 'react'
import Form from "./Pages/Form"
import Table from './Pages/Table'
import Login from './Pages/Login'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/style.css'

function App() {
    const Router = createBrowserRouter([
        {
            path : "/", 
            element : <Form/>
        },
        {
            path : "/Table", 
            element : <Table/>
        },
        {
            path : "/Form", 
            element : <Form/>
        },
    ])
    return(
        <div>
       < RouterProvider router = {Router} />
       </div>  
    )
}  
export default App