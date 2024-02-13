import React from 'react'
import { useState } from 'react'
import '../Register/Register.css'
import axios from 'axios'
import validator from 'validator'
import univesalLink from '../../universalLink'

export const Register = () => {
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleRegister= async (e)=>{
        e.preventDefault()

        if(!username || !email || !password)
        {
            return alert("All field is required")
        }
        if(!(validator.isEmail(email)) || username.length<3 || password.length<5)
        {
            return alert("Email is not valid \n write full name \n password is less than 5 character")
        }
        try {

            const register= await axios.post(`${univesalLink}/userCreate`,{
                username:username.trim().toLowerCase(),email:email.trim().toLowerCase(),password:password.trim()
            })
            alert("Registered........")
            register && window.location.replace('/')
        } catch (error) {
            console.log(error)
        }
        
    }
    
  return (
    <>
        <div className="container flex space-center align-items-center">
            <form className="form flex space-center align-items-center">
                

                <h2>Register Form</h2>
                <input type="text" placeholder='name' onChange={e=>setUserName(e.target.value)} />
                <input type="text" placeholder='email' onChange={e=>setEmail(e.target.value)}  />
                <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}  />
                <input type="submit" value="Register" className='btn' onClick={handleRegister}/>
<br />
                <a href="/login" className='float-right'>Login</a>
                
            </form>
        </div>
    </>
  )
}
