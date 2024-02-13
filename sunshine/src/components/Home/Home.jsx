import React, { useEffect, useState } from "react";
import axios from 'axios'
import './Home.css'
import user from "../../user";
import Footer from "../Footer/Footer";
import {useSelector,useDispatch} from 'react-redux'
import { getProduct } from "../../action/productAction";
import univesalLink from "../../universalLink";


export default function Home({loginDetail}){    
    const [msg,setMsg]=useState("")
    const dispatch=useDispatch();
   const {loading,product}=useSelector(state=>state.product);
  


    useEffect(() => {
        
        dispatch(getProduct())
        
        
    },[])



    const handleMsg= async (e)=>{
        e.preventDefault()

        if(!msg)
        {
            return alert("write your thought...")
        }
        if(msg.length>70)
        {
            return alert("Msg character exceed...")
        }
        try {

            const data= await axios.put(`${univesalLink}/msg`,{
                comment:msg.trim()
            })
            data && alert("msg added........")
            setMsg("")
        } catch (error) {
            console.log(error)
        }
        
    }


    return <>

    {
        loading ? <div className="loading">
            <img src="/image/loading.gif" alt="" />
        </div> : <>
    
        <main className="flex align-items-center justify-flex-start">
            <div className="content">
                <p>Now Started</p>
                <h1>Fruit And <br /> Vegetables</h1>
                
            </div>
        </main>
        <section className="space-center align-items-center">
            <h1>About us</h1>
            <div className="desc" style={{textAlign: "center"}}>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus veniam laudantium delectus consectetur 
                quibusdam sed, labore incidunt aut vitae culpa vel nemo neque fugiat quas accusantium commodi sunt ipsa? Sint.</p>
            </div>
                <div className="pic">
                    <img src="/image/about.png" alt="" />
                </div>
                <button className="btn">Read More</button>
        </section>
        <section className="our_product align-items-start gryclr">
            <h1>Our product</h1>
            <div className="desc">
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus veniam laudantium delectus consectetur 
                quibusdam sed, labore incidunt aut vitae culpa vel nemo neque fugiat quas accusantium commodi sunt ipsa? Sint.</p>
            </div>
               <div className="cardBox flex space-around align-items-center">
                   <div className="card">
                       <div className="card-header">
                           <img src="/image/pro1.png" alt="" />
                       </div>
                       <div className="card-body">
                           <h3>Mangoes for juice</h3>
                       </div>
                       <div className="card-footer">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quam laudantium eum culpa placeat labore, dolores
                            at numquam reiciendis obcaecati sed delectus aperiam facilis necessitatibus dicta. Aut numquam exercitationem nobis?
                       </div>
                   </div>
                   <div className="card">
                       <div className="card-header">
                           <img src="/image/pro2.png" alt="" />
                       </div>
                       <div className="card-body">
                           <h3>Mangoes for juice</h3>
                       </div>
                       <div className="card-footer">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quam laudantium eum culpa placeat labore, dolores
                            at numquam reiciendis obcaecati sed delectus aperiam facilis necessitatibus dicta. Aut numquam exercitationem nobis?
                       </div>
                   </div>
                   <div className="card">
                       <div className="card-header">
                           <img src="/image/pro3.png" alt="" />
                       </div>
                       <div className="card-body">
                           <h3>Mangoes for juice</h3>
                       </div>
                       <div className="card-footer">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quam laudantium eum culpa placeat labore, dolores
                            at numquam reiciendis obcaecati sed delectus aperiam facilis necessitatibus dicta. Aut numquam exercitationem nobis?
                       </div>
                   </div>
                   <div className="card">
                       <div className="card-header">
                           <img src="/image/pro4.png" alt="" />
                       </div>
                       <div className="card-body">
                           <h3>Mangoes for juice</h3>
                       </div>
                       <div className="card-footer">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quam laudantium eum culpa placeat labore, dolores
                            at numquam reiciendis obcaecati sed delectus aperiam facilis necessitatibus dicta. Aut numquam exercitationem nobis?
                       </div>
                   </div>
                   </div> 
        </section>
        <div className="frout flex space-between align-items-center">
            <div className="content flex space-center align-items-center">
                <div className="innerContent">
                    <h1>Lorem Ipsum using</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At explicabo ipsa, expedita in delectus totam distinctio consequuntur 
                        sed maiores sunt maxime? Reprehenderit voluptas at inventore eveniet doloribus repellendus dolorum sed.</p>
                        <hr />
                        <button className="btn">Read More</button>
                </div>
            </div>
            <div className="pic">
                <img src="/image/frout.png" alt="" />
            </div>
        </div>
        <section className="gallery space-center align-items-center">
            <h1>Gallery</h1>
            <div className="desc" style={{textAlign: "center"}}>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus veniam laudantium delectus consectetur 
                quibusdam sed, labore incidunt aut vitae culpa vel nemo neque fugiat quas accusantium commodi sunt ipsa? Sint.</p>
            </div>
            <div className="cardBox flex space-around align-items-center">
                {
                    product.map(item=>(
                        <div className="card" key={item._id}>
                            <span className={`priceTag ${item.stock ? 'Instock' : 'Outstock'}`}> <span className="rate">  ₹ {item.rate}/Kg</span>
                            <span className="stock_status">{item.stock ? 'In of stock' : 'out of stock'}</span>
                            </span>
                       <div className="card-header">
                           <img src={item.pic} alt="" />
                       </div>
                   </div>
                    ))
                }
                   
                   
                   </div>
        </section>
        <section className="contactUs align-items-start">
        <h1>Contact Us</h1>
        <div className="mapAndContactForm flex">
            <div className="map flex space-around align-items-start" style={{flex: "1"}}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28855.842242343748!2d85.43512179999999!3d25.3048666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1644396728320!5m2!1sen!2sin" width="100%" height="100%" style={{border:"0"}} allowFullScreen="" loading="lazy"></iframe>
            </div>
            <div className="form flex space-around align-items-start" style={{flex: "1"}}>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Your Name" id="name" value={loginDetail?.username} />
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email" value={loginDetail?.email} />
                <label htmlFor="msg">messge</label>
                <textarea name="" placeholder="Whats Your Thought ?" id="msg" cols="30" rows="10" onChange={e=>setMsg(e.target.value)} ></textarea>
                {loginDetail?.username && (
    
                <button className="btn" onClick={handleMsg} >Send</button>
                )}
    
            </div>
        </div>
        </section>
        <Footer/>
        </>
    }
    
    </>
}