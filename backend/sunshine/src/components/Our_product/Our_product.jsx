import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Our_product.css'
import Footer from "../Footer/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../action/productAction";
import Pagination from "react-js-pagination";
import { useParams } from 'react-router-dom';
import Select from 'react-select';


const options = [
  { value: '', label: 'choose..' },
  { value: 'vegetable', label: 'vegetable' },
  { value: 'fruit', label: 'fruit' }
  
];

export default function Our_product() {

  const dispatch=useDispatch();
  const {loading,product,resultPerPage,productCount}=useSelector(state=>state.product);
  const [currentPage,setCurrentPage]=useState(1)
  const [category,setCategory]=useState("")
  
   useEffect(() => {
       
       dispatch(getProduct(currentPage,category.value))
      
       
   },[currentPage,category])
   const setCurrentPageNo=(e)=>{
    setCurrentPage(e)
   }
  return <>
  {
      loading ? <div className="loading">
            <img src="/image/loading.gif" alt="" />
        </div> :<>
  <section className="space-center align-items-center">
    <h1 style={{marginTop: "80px"}}>All product</h1>
    <div className="apiFeature">
      <h3>Category</h3>
      <Select
        value={category}
        onChange={setCategory}
        options={options}
      />
  </div>
    <div className="productBox flex space-between align-items-center">
      {
        product.map(item=>(
          <div className="card" key={item._id}>
      <Link to={`/product/${item._id}`}>
        <div className="card-header">
          <img src={item.pic} alt="" />
        </div>
        <div className="card-body">
          <h3>{item.name}</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatum ipsa fugiat natus nobis explicabo minus 
            minima mollitia aspernatur blanditiis praesentium laborum illum illo dolorum, veritatis inventore nemo amet sit.</p>
        </div>
        <div className="card-footer ">
          <span>New</span>
        </div>
        </Link>
      </div>
        ))
      }
    </div>
  </section>
  <div className="paginationBox" >
 
  <Pagination 
  activePage={currentPage}
  itemsCountPerPage={resultPerPage}
  totalItemsCount={productCount&&productCount }
  onChange={setCurrentPageNo}
  nextPageText="Next"
  prevPageText="Prev"
  firstPageText="1st"
  lastPageText="Last"
  itemClass="page-item"
  activeClass="pageItemActive"
  activeLinkClass="pageLinkActive"
  />

  </div>
  
  <Footer/>
  </>
  }
  </>;
}
