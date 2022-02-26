const { isAuth } = require('../auth/auth');
const { productCreate, productUpdate, productDelete, addReview, allProduct, ProductDetail } = require('../controller/ProductController');


const Router=require('express').Router();

// product related routes--------------------------------------------------
Router.route('/allProduct').get(allProduct)
Router.route('/productCreate').post(isAuth,productCreate)
Router.route('/productUpdate').put(productUpdate)
Router.route('/productDelete').delete(productDelete)
Router.route('/product/:id').get(ProductDetail)


// cart realated route -----------------------------------------------------

Router.route('/addReview/:id').put(addReview)



module.exports=Router;