import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Link,NavLink} from 'react-router-dom';
import user from '../../user';
import './Navbar.css';
import { useDispatch,useSelector } from 'react-redux';
import {  UserLogOut } from '../../action/userAction';

export default function Navbar({loginDetail,cartItemNo,error}) {
    
    const dispatch=useDispatch()
    const [Error,setError]=useState("")
    const [menu,setMenu]=useState(false);
    useEffect(() => {
        setError(error)
    }, [error])
    
    
    if(Error==='No user found')
    {
        
        alert(Error)
        setError("")
    }
    const Menuhandle =()=>{
        setMenu(menu ? false : true);
    }   
    const handleLogout=()=>{
        dispatch(UserLogOut())
    }
    return(
        <>
        <div className="navbar flex space-between align-items-center container-fluid">
           
            <div className="row navbar-inner space-between align-items-center">
                <div className='first'>
                    <Link to='/'>
                        <span className="logo">
                            <img src="/image/lo_be.png" alt="" />
                        </span>
                    <span>
                        <img src="/image/logo.png" alt="" />
                    </span>
                    </Link>
                </div>
                <div className='second'>
                    <ul className='flex' style={{height: menu && "100%"}}>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/our_product">our product</Link></li>
                        <li><Link to="/cart">Cart</Link> {cartItemNo>0 && <span className='cartItemNumber'>{cartItemNo}</span>}</li>
                        {
                            loginDetail?.email ? (

                                <li><Link to="#">{loginDetail?.email}</Link>
                            <div className="profileBox flex space-around align-items-center">
                                <div className="profilePic">
                                    <img src={loginDetail?.pic} alt="" />
                                </div>
                                <hr />
                                <Link to="/profile">Profile</Link> 
                                <button className='btn' onClick={handleLogout}>Log out</button>
                            </div>
                        </li>
                            ):
                            (
                                <li><Link to="/login">Log in</Link></li>  
                            )
                        }
                        
                     </ul>
                </div>
                <div className="menubar flex space-around align-items-center" onClick={Menuhandle}>
                    {
                        menu ? <img src="/image/cross.png" alt="" /> : <img src="/image/menu.png" alt="" />
                    }
                    
                    
                </div>
            </div>
        </div>
        </>
    )
}

 