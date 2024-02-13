import React, { useEffect, useState } from 'react'
import './Preview_page.css';

import { Link, useLocation,useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useSelector,useDispatch } from 'react-redux';
import { cartItem, getProductDetail } from '../../action/productAction';
import { useRef } from 'react';
import axios from 'axios';
import store from '../../store'
import univesalLink from '../../universalLink';
import ReactStars from "react-rating-stars-component";


  



function Preview_page() {
    const {id}=useParams()

const dispatch=useDispatch()
const {loading,productDetail}=useSelector(state=>state.productDetail)
const {loginDetail}=useSelector(state=>state.loginDetail)
useEffect(() => {
  
    dispatch(getProductDetail(id))
    // setReview(productDetail.review)
   
  
}, [dispatch,id])

if(productDetail==null || productDetail?.error)
{

   window.location.replace("/")
}


    const [quantity,setQuantity]=useState(1);
    const [transform,setTransform]=useState(0);
    
    
    const handleQuantity =(operation)=>{
        if(operation==='plus')
        {
            setQuantity(quantity<productDetail.stock ? quantity+1 : quantity)
        }
        if(operation==='minus'){
            setQuantity(quantity>1 ? quantity-1 : 1)
            
        }
    }
    const handleTransform =(operation)=>{
        let l=productDetail.reviews.length;
        if(operation==='right')
        {
            setTransform(transform<l-1 ? transform+1 : l-1)
        }
        if(operation==='left'){
            setTransform(transform>0 ? transform-1 : 0)
        }
    }
    // console.log(productDetail.reviews)
const nameRef=useRef();
const rateRef=useRef()
const qRef=useRef()



const handleaddCart=async()=>{
    
    const config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
          },
          withCredentials: true
        }
        
        try {

            const addCart= await axios.put(`${univesalLink}/addCart`,{
                productId:productDetail._id,pic:productDetail.pic,name:nameRef.current.innerHTML,price: Number(rateRef.current.innerHTML),quantity: Number(qRef.current.value)
            },config)
            addCart&& alert("add to cart........")
            store.dispatch(cartItem())
        } catch (error) {
            console.log(error)
        }
}

const reviewForm=useRef()
const [review,setReview]=useState("")

const handleReviewOpen =(e)=>{
    reviewForm.current.style.display="flex";
}
const handleReviewCancel =()=>{
    reviewForm.current.style.display="none";
}
const ratingChanged = async (newRating) => {
    
    if(review.length>100){
        return alert("Only 99 character allow...")
    }
    if(typeof(loginDetail?.username)==='undefined')
    {
        return alert("Login Again...")
    }
    if(!newRating || review==="")
    {
        return alert("All field required..")
    }
    const config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
          },
          withCredentials: true
        }
        
        try {

            const addReview= await axios.put(`${univesalLink}/addReview/${productDetail._id}`,{
                userId:loginDetail._id,user:loginDetail.username,comment:review,star:newRating
            },config)
            addReview && alert("Review added........")
            dispatch(getProductDetail(id))
            reviewForm.current.style.display="none";
        } catch (error) {
            error && alert("Error occurs.. it seems you are not login :)")
        }

  };

  
  return (
      <>
    <div className='preview_page flex space-around align-items-center'>
       <div className="firstCol">
           <div className="carosel">
                <img  src={productDetail?.pic} alt="" />
           </div>
           <div className="reviews">
            <h3>Reviews</h3>
            <div className="reviewBox">
                <div className="content flex justify-flex-start" style={{transform: `translateX(-${(550)*transform}px)`}}>
                {
                   productDetail.reviews?.map((item)=>(
                        <div className="cardCover" key={item._id}>
                        <div className="card">
                            <div className="username">
                                <h3>{item.user}</h3>
                            </div>
                            <div className="comment">
                                <p>{item.comment}</p>  </div>
                            <div className="review flex space-center align-items-center">
                            <ReactStars
                                count={5}
                                size={15}
                                value={item?.star}
                                activeColor="#ffd700"
                                edit={false}
                            />
                            </div>
                        </div>
                </div>
                    ))
                }
                </div>
               


            </div>
                <button className='btn rightBtn' onClick={()=>handleTransform('right')}>R</button>
                <button className='btn leftBtn'onClick={()=>handleTransform('left')}>L</button>
           </div>
        </div> 
       <div className="secondCol flex space-center align-items-center">
           <div className="secondContent">

           
           <div className="title">
              <h2 ref={nameRef}>{productDetail.name}</h2>  
           </div>
           <div className="desc">
            <p>{productDetail.desc}</p>
           </div>
           <div className="rateAndstars flex space-between align-items-center">
                <span className="rate" ><strong ref={rateRef}>{productDetail.rate}</strong> ₹/kg</span><span className="stars"><ReactStars
                                count={5}
                                size={35}
                                value={productDetail?.star}
                                activeColor="#ffd700"
                                edit={false}
                            /></span>
           </div>
           <div className="stockInfo" style={{color: `${productDetail.stock>0 ? 'green':'red'}`}}>
               {productDetail.stock>0 ? 'In stock':'Out stock'}
           </div>
           <div className="quantityAndBtn flex space-between align-items-center">
               <div className="quantity flex space-between align-items-center">
                <span className="minus" onClick={()=>handleQuantity("minus")}>-</span>
                <input type="number" value={quantity} ref={qRef} disabled/>
                <span className="plus" onClick={()=>handleQuantity("plus")} >+</span>
               </div>
               <div className="addToCart">
                   {
                       productDetail.stock && loginDetail?.username ? <button className='btn' onClick={handleaddCart}>Add Cart</button> : <button className='btn' ><Link to='/login'>Log in For Shopping</Link></button>
                   }
                   
               </div>
           </div>
           <div className="writeReview" onClick={handleReviewOpen}>
               <img src="/image/review.png" alt="" />
           </div>
           <div ref={reviewForm} className="reviewForm  space-center align-items-center">
               <textarea name="" id="" cols="30" rows="5" placeholder='Write your Review here..' onChange={e=>setReview(e.target.value)}></textarea>
               <ReactStars
                    count={5}
                    size={30}
                    onChange={ratingChanged}
                    activeColor="#ffd700"
                />
               <div className="reviewBtn">
               <button className='btn' onClick={handleReviewCancel}>cancel</button>
               </div>
           </div>
           </div>
        </div> 
    </div>
    <Footer/>
    </>
  )
}

export default Preview_page