import React from "react" ;
import { Link } from "react-router-dom";



function Form(){
    function form(e){
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(name)
        console.log(email)
        console.log(password)
        const formdata = new URLSearchParams()
        formdata.append('Name', name)
        formdata.append('Email', email)
        formdata.append('Password', password)

        fetch('http://localhost:8080/users', {
            method: 'POST',
            body: formdata
        })
    }
       
    
    
    return(
       <div>
        <div className="bg-gray-500 text-white mr-40 ml-40 rounded-3xl">
            <form className="flex flex-col mr-52 ml-52 mt-52 bg-slate-500 gap-6" onSubmit={form}>
                <label htmlFor="name" className="text-2xl">Insert Name Here</label>
                <input type="text" name="name" id="name" className="text-black h-8 rounded-xl"/>
                <label htmlFor="email" className="text-2xl">Insert Email Here</label>
                <input type="Email" name="email" id="email" className="text-black h-8 rounded-xl"/>
                <label htmlFor="password" className="text-2xl">Insert Password Here</label>
                <input type="Password" name="password" id="password" className="text-black h-8 rounded-xl"/>
                <button type="submit" className="bg-white w-full h-10 text-black mb-3 rounded-2xl">Submit</button>
            </form>          
        </div>
        <div className="w-full items-center text-center"> 
            <Link to="/Table"><button className="mb-30 text w-60 h-20 bg-amber-400 rounded-2xl">Go To Table</button></Link>
        </div>
        
       </div>

    )
}
export default Form