import React, { useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Table() {
    const [tables, setTables] = React.useState([])
    async function tablee(){
        const dataTable = await fetch('http://localhost:8080/users', {})
        const listTable = await dataTable.json()
        const list = listTable
        console.log(list[0].Results)  
        setTables(list[0].Results) 
    }
    useEffect(() =>{
        tablee()
    }, [])
    
    async function remove(Id){
        const fetchremove = await fetch('http://localhost:8080/users'+ "/" + Id, {
            method:'DELETE'
        })
        const response = await fetchremove.json()
        window.alert("hapus")
        tablee()
    }


    return(
        <div>
            <div className='w-full mt-9 gap-20 flex flex-col justify-center'>
                <table className='ml-52 mr-52 bg-slate-600 text-white'>
                    <thead className='border-2 border-black'>
                        <tr className='border-2 border-black'>
                            <td className='border-2 border-black'>No</td>
                            <td className='border-2 border-black'>Name</td>
                            <td className='border-2 border-black'>Email</td>
                            <td className='border-2 border-black'>Edit</td>
                            <td className='border-2 border-black'>Delete</td>
                        </tr>
                    </thead>
                    
                   {tables.map((item) =>{
                    return(      
                        <tbody>
                            <tr>
                                <td>{item.Id}</td>
                                <td>{item.name}</td>
                                <td>{item.Email}</td>
                                <td><Link to={`/Update/${item.Id}`}><button><FaRegEdit /></button></Link></td>
                                <td><button onClick={() => remove(item.Id)}><MdDeleteForever /></button></td>
                            </tr>
                        </tbody>
                            )
                        })}   
                        
                </table>
                <Link to="/Form"><div className='w-full text-center'>
                    <button className='w-20 h-14 bg-gray-500 rounded-2xl'>Back To Form</button>
                </div></Link>
                <Link to="/Update"><div className='w-full text-center'>
                    <button className='w-20 h-20 bg-gray-400 rounded-3xl'>Update</button>
                </div></Link>
            </div>
        </div>
    )
}  
export default Table