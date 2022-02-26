const { isAuth } = require('../auth/auth');
const { alluser, userCreate, userUpdate, userDelete, login, logout, profile, cart, addCart, removeCart } = require('../controller/UserController');
const Router=require('express').Router();
// user related router ------------------------------------------------------

Router.route('/alluser').get(isAuth,alluser)
Router.route('/userCreate').post(userCreate)
Router.route('/userUpdate').put(isAuth,userUpdate)
Router.route('/userDelete').delete(isAuth,userDelete)



Router.route('/me').get(isAuth, profile)
Router.route('/addCart').put(isAuth,addCart)
Router.route('/removeCart/:id').put(isAuth,removeCart)
Router.route('/cart').get(isAuth, cart)
Router.route('/login').post(login)
Router.route('/logout').get(isAuth,logout)

module.exports=Router;