import React, { useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

function Update() {
    const navigate = useNavigate();
  let { Id } = useParams();
  console.log(Id)
  const [table, setTables] = React.useState([]);
  useEffect(() => {
    async function update() {
      const response = await fetch("http://localhost:8080/users" + "/" + Id);
      console.log(response);
      const user = await response.json();
      setTables(user[0].Results);
      console.log(user[0].Results);
    }
    update();
  }, []);


  const formik = useFormik({
    onSubmit: update(),
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: update,
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

  async function update() {
    const name = formik.values.name;
    const email = formik.values.email;
    const password = formik.values.password;
    console.log(name)
    console.log(email)
    console.log(password)

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const dataNew = await fetch("http://localhost:8080/users/" + Id, {
      method: "PATCH",
      body: formData,
    });
    const response = await dataNew.json();
    if (response.succes) {
      window.alert("berhasil");
      navigate("/");
    } else {
      window.alert("gagal");
      console.log("gagal");
    }
  }

    return(
       <div>
        <div className='w-full bg-slate-200 text-center'>
            <form className='flex flex-col' onSubmit={formik.handleSubmit}>
                <label htmlFor="">Update Name here</label>
                <input type="text" name="name" id="" onChange={formik.handleChange}
            defaultValue={table.name}
            className={
              formik.errors.name && formik.touched.name
                ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }
            />{formik.errors.name && formik.touched.name && (
            <p className="text-red-500">{formik.errors.name}</p>
                )}

                <label htmlFor="">Update Email Here</label> 
                <input type="text" name="email" id=""onChange={formik.handleChange}
            defaultValue={table.email}
            className={
              formik.errors.email && formik.touched.email
                ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }/> {formik.errors.email && formik.touched.email && (
            <p className="text-red-500">{formik.errors.email}</p>
            )}

                <label htmlFor="">Update Password Here</label>
                <input type="password" name="password" id=""onChange={formik.handleChange}
              className="outline-none "/> {formik.errors.password && formik.touched.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
    
                <div>
                    <button className='h-16 rounded-r-3xl' type='submit'>Submit</button>
                </div>
            </form>
            <div className='w-full bg-slate-200'>
                <button className=''>Back To Table</button>
            </div>
        </div>
       </div>
    )
}  
export default Update