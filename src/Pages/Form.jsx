import React from "react" ;
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";



function Form(){
    const navigate = useNavigate()
    const formik = useFormik({
        onSubmit: form(),
        initialValues: {
          name: "",
          email: "",
          password: "",
        },
        onSubmit: form,
        validationSchema: Yup.object().shape({
          name: Yup.string()
            .min(2, "Mininum 2 characters")
            .max(50, "Must be 15 characters or less")
            .required("Required!"),
          email: Yup.string().email("Invalid email address").required("Required!"),
          password: Yup.string()
            .min(8, "Minimum 8 characters")
            .required("Required!"),
        }),
      });
    async function form(){
        const name = formik.values.name
        const email = formik.values.email
        const password = formik.values.password
        console.log(name)
        console.log(email)
        console.log(password)
        const formdata = new URLSearchParams()
        formdata.append('name', name)
        formdata.append('email', email)
        formdata.append('password', password)

        const form = fetch('http://localhost:8080/users', {
            method: 'POST',
            body: formdata
        })
        const response = await form.json();
        if (response.succes) {
        window.alert("berhasil");
        navigate("/");
        }   else {
        window.alert("gagal");
        console.log("gagal");
        }
    }
       
    
    
    return(
       <div>
        <div className="bg-gray-500 text-black mr-40 ml-40 rounded-3xl">
            <form className="flex flex-col mr-52 ml-52 mt-52 bg-slate-500 gap-6" onSubmit={formik.handleSubmit}     >
                <label htmlFor="name" className="text-2xl">Insert Name Here</label>
                <input type="text" name="name" id="name" onChange={formik.handleChange}
            className={
              formik.errors.name && formik.touched.name
                ? "border border-red-500 rounded-md p-[5px] block w-full  focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : " border border-black rounded-md p-[5px] block w-full   focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }/>{formik.errors.name && formik.touched.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
    
                <label htmlFor="email" className="text-2xl">Insert Email Here</label>
                <input type="Email" name="email" id="email" onChange={formik.handleChange}
            className={
              formik.errors.email && formik.touched.email
                ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }/>{formik.errors.email && formik.touched.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}

                <label htmlFor="password" className="text-2xl">Insert Password Here</label>
                <input type="Password" name="password" id="password" onChange={formik.handleChange}
              className="outline-none"
/> {formik.errors.password && formik.touched.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}

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