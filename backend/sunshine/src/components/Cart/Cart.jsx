import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import './Cart.css'

import Footer from "../Footer/Footer";
import {useDispatch,useSelector} from 'react-redux'
import { cartItem, removeCart } from "../../action/productAction";
export default function Cart() {
  const dispatch=useDispatch()
  const {userCart,loading}=useSelector(state=>state.userCart)
  let total=0;
  let payableAmount=0;
  let shipping;

useEffect(() => {
  dispatch(cartItem())
}, [])

const deletehandle =(id)=>{
  dispatch(removeCart(id))
 
}





userCart.username && userCart.cart.map(item=>(
    total +=item.price*item.quantity
    
  ))
  if(total<500 && total!=0)
    {
      shipping=`₹ 40 x ${userCart.cart.length}= ₹ ${40*userCart.cart.length}`;
      payableAmount=total+ userCart.cart.length*40;
      payableAmount=payableAmount+(payableAmount*.02)
    }
    else{
      shipping='Free'
      if(total==0)
      shipping='₹ 0'
      payableAmount=total+(total*.02)
    }
  return <>
      <div className="cart flex">
        <div className="product">
            <table>
              <thead>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
              </thead>
              <tbody>
                {
                  
                  (userCart.username) && (userCart?.cart.length)  ? userCart.cart.reverse().map(item=>(
                    <tr key={item._id}>
                    <td className="flex align-items-center space-center "><img src={item.pic} alt="" /> <h2>{item.name}</h2></td>
                    <td>{item.price} ₹/Kg</td>
                    <td>{item.quantity}</td>
                    <td><button className="btn" onClick={()=>deletehandle(item._id)}>Remove</button></td>
                  </tr>
                  )) : <div className="Noitem">
                    <h3>No item</h3>
                    <button className="btn"><Link to='/our_product'>Go to product</Link></button>
                  </div>
                }
                
               
              </tbody>
            </table>
        </div>
        <div className="summery flex space-center align-items-start">
          <div className="content">
            <div className="total flex space-between align-items-center"><span>Total</span><span>₹ {total}</span></div>
            <div className="shipping flex space-between align-items-center"><span>Shipping</span><span>{shipping}</span></div>
            <div className="gst flex space-between align-items-center"><span>GST</span><span>2%</span></div>
            <div className="payable flex space-between align-items-center"><span>payable Amount</span><span>₹ {payableAmount}</span></div>
            <hr />
            <button className="btn">Checkout</button>
          </div>
        </div>
      </div>
      <Footer/>
  </>;
}
