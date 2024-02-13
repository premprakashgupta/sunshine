const { isAuth, isAuthAdmin } = require('../auth/auth');
const { productCreate, productUpdate, productDelete, addReview, allProduct, ProductDetail } = require('../controller/ProductController');


const Router=require('express').Router();

// product related routes--------------------------------------------------
Router.route('/allProduct').get(allProduct)
Router.route('/productCreate').post(isAuthAdmin,productCreate)
Router.route('/productUpdate').put(isAuthAdmin,productUpdate)
Router.route('/productDelete').delete(isAuthAdmin,productDelete)
Router.route('/product/:id').get(ProductDetail)


// cart realated route -----------------------------------------------------

Router.route('/addReview/:id').put(isAuth, addReview)



module.exports=Router;