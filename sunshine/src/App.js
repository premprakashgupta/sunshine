import logo from './logo.svg';

import Navbar from './components/Navbar/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Our_product from './components/Our_product/Our_product';
import Cart from './components/Cart/Cart';
import Preview_page from './components/Preview_page/Preview_page';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import store from './store'
import { UserLoad } from './action/userAction';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { cartItem } from './action/productAction';
import PageNotFound from './components/PageNotFound/PageNotFound';



function App() {
  const {loginDetail,loading,error}=useSelector(state=>state.loginDetail)
  const {cartItemNo}=useSelector(state=>state.userCart)
 
  useEffect(() => {
    store.dispatch(UserLoad());
    store.dispatch(cartItem());
    
  }, [])
  
  return (
    <div className="App">
      <Router>
      <Navbar error={error} loginDetail={loginDetail} cartItemNo={cartItemNo} />
        <Routes>
          <Route exact path='/' element={<Home loginDetail={loginDetail} />}/>
          <Route exact path='/our_product' element={<Our_product/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/product/:id' element={<Preview_page/>}/>
          <Route exact path='/register' element={loginDetail?._id ? <Home/> : <Register/>}/>
          <Route exact path='/login' element={loginDetail?._id ? <Home/> : <Login/>}/>
          <Route path='*' element={loginDetail?._id ? <PageNotFound /> : <Login/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
