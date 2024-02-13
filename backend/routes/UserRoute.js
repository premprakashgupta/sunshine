const { isAuth, isAuthAdmin } = require("../auth/auth");
const {
  alluser,
  userCreate,
  userUpdate,
  userDelete,
  login,
  logout,
  profile,
  cart,
  addCart,
  removeCart,
  UserMsg,
} = require("../controller/UserController");
const Router = require("express").Router();
// user related router ------------------------------------------------------

Router.route("/alluser").get(isAuthAdmin, alluser);
Router.route("/userCreate").post(userCreate);
Router.route("/userUpdate").put(isAuthAdmin, userUpdate);
Router.route("/userDelete").delete(isAuthAdmin, userDelete);

Router.route("/me").get(isAuth, profile);
Router.route("/addCart").put(isAuth, addCart);
Router.route("/msg").put(isAuth, UserMsg);
Router.route("/removeCart/:id").put(isAuth, removeCart);
Router.route("/cart").get(isAuth, cart);
Router.route("/login").post(login);
Router.route("/logout").get(isAuth, logout);

module.exports = Router;
