import React from 'react'
import { useState } from 'react'
import '../Login/Login.css'
import {useDispatch,useSelector} from 'react-redux'
import { UserLogin } from '../../action/userAction'
export const Login = () => {
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    
    
   
    const handleLogin= (e)=>{
        e.preventDefault();
        if(!email && !password)
        {
            return alert("All field is required")
        }
        try {

           const res=dispatch(UserLogin(email,password))
            
        } catch (error) {
            console.log(error)
        }
        
    }
    
  return (
    <>
        <div className="container flex space-center align-items-center">
            <form className="form flex space-center align-items-center">
                

                <h2>Login Form</h2>
                <input type="text" placeholder='email' onChange={e=>setEmail(e.target.value)}  />
                <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}  />
                <input type="submit" value="Logi In" className='btn' onClick={handleLogin}  />
<br />
                <a href="/register" className='float-right'>Register</a>
                
            </form>
        </div>
    </>
  )
}
